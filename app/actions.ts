import { site } from "@/content/site";
import {
  HONEYPOT_FIELD,
  LEAD_FIELDS,
  formatPhone,
  validateLead,
  type LeadState,
  type LeadValues,
} from "@/lib/lead";

/**
 * Roda no navegador (o site é exportado como estático). O WhatsApp já foi aberto pelo
 * formulário; se NEXT_PUBLIC_LEAD_WEBHOOK_URL estiver definida no build, o contato também
 * vai para esse webhook (Make, Zapier, Google Apps Script/Sheets, n8n…). Veja o README.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Anti-spam: se o campo escondido veio preenchido, finge sucesso e descarta.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const values = Object.fromEntries(
    LEAD_FIELDS.map((field) => {
      const raw = formData.get(field);
      return [field, typeof raw === "string" ? raw : ""];
    }),
  ) as LeadValues;

  const result = validateLead(values);
  if (!result.ok) {
    return { status: "error", message: site.form.fixFields, fieldErrors: result.errors };
  }

  const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
  // Sem webhook, o contato segue só pelo WhatsApp (aberto pelo formulário).
  if (!webhookUrl) {
    return { status: "success" };
  }

  const weeklyBathsLabel =
    site.form.weeklyBathsOptions.find((o) => o.value === result.data.weeklyBaths)?.label ?? result.data.weeklyBaths;

  const payload = {
    petShop: result.data.petShop,
    name: result.data.name,
    whatsapp: formatPhone(result.data.whatsapp),
    whatsappDigits: `55${result.data.whatsapp}`,
    city: result.data.city,
    weeklyBaths: weeklyBathsLabel,
    source: "landing",
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`[lead] Webhook respondeu ${response.status}.`);
      return { status: "error", message: site.form.error };
    }
  } catch (error) {
    console.error("[lead] Falha ao chamar o webhook.", error);
    return { status: "error", message: site.form.error };
  }

  return { status: "success" };
}
