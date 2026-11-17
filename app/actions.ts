"use server";

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
 * Recebe o contato do formulário e envia para o webhook configurado em LEAD_WEBHOOK_URL
 * (Make, Zapier, Google Apps Script/Sheets, n8n…). Veja o README.
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

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[lead] LEAD_WEBHOOK_URL não configurada. Veja o README para configurar o formulário.");
    return { status: "error", message: site.form.error };
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
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
