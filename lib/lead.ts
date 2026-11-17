import * as z from "zod/mini";
import { site } from "@/content/site";

const errors = site.form.errors;

export const WEEKLY_BATHS = site.form.weeklyBathsOptions.map((o) => o.value) as [string, ...string[]];

/** Nome do campo-armadilha (honeypot). Pessoas não veem; robôs costumam preencher. */
export const HONEYPOT_FIELD = "empresa_site";

export const LEAD_FIELDS = ["petShop", "name", "whatsapp", "city", "weeklyBaths"] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];
export type LeadValues = Record<LeadField, string>;
export type LeadErrors = Partial<Record<LeadField, string>>;

/** Só os dígitos do telefone. */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Máscara (41) 99999-9999 (celular) ou (41) 3333-3333 (fixo). */
export function formatPhone(value: string): string {
  const d = phoneDigits(value);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  if (d.length <= 10) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

/** Validação compartilhada entre o navegador e a Server Action (zod/mini: mesma API base, bundle pequeno). */
const text = (message: string) =>
  z.string().check(z.trim(), z.minLength(2, { error: message }), z.maxLength(120, { error: message }));

export const leadSchema = z.object({
  petShop: text(errors.petShop),
  name: text(errors.name),
  // DDD válido (11 a 99) + 8 ou 9 dígitos. A máscara é ignorada.
  whatsapp: z.string().check(z.refine((v) => /^[1-9][1-9]\d{8,9}$/.test(phoneDigits(v)), { error: errors.whatsapp })),
  city: text(errors.city),
  weeklyBaths: z.enum(WEEKLY_BATHS, { error: errors.weeklyBaths }),
});

export type Lead = z.infer<typeof leadSchema>;

/** Valida e devolve os dados limpos ou a primeira mensagem de erro de cada campo. */
export function validateLead(values: LeadValues):
  | { ok: true; data: Lead }
  | { ok: false; errors: LeadErrors } {
  const result = leadSchema.safeParse(values);
  if (result.success) return { ok: true, data: { ...result.data, whatsapp: phoneDigits(result.data.whatsapp) } };
  const out: LeadErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as LeadField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return { ok: false, errors: out };
}

export function emptyLead(): LeadValues {
  return { petShop: "", name: "", whatsapp: "", city: "", weeklyBaths: "" };
}

export type LeadState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: LeadErrors };
