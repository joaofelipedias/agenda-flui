import type { LeadValues } from "@/lib/lead";
import { formatPhone } from "@/lib/lead";
import { site } from "@/content/site";

/** Link wa.me do pet shop. Enquanto o número for placeholder, abre o WhatsApp sem destinatário. */
export function whatsappHref(): string {
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(site.contact.whatsappMessage);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** true quando o número ainda é o placeholder [NÚMERO DO WHATSAPP]. */
export const whatsappIsPlaceholder = !/\d/.test(site.contact.whatsapp);

/** Link wa.me com os dados do formulário já escritos na mensagem. */
export function leadWhatsappHref(lead: LeadValues): string {
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  const baths = site.form.weeklyBathsOptions.find((o) => o.value === lead.weeklyBaths)?.label ?? lead.weeklyBaths;
  const message = [
    "Oi! Quero conhecer a Agenda Flui.",
    "",
    `Pet shop: ${lead.petShop}`,
    `Nome: ${lead.name}`,
    `WhatsApp: ${formatPhone(lead.whatsapp)}`,
    `Cidade: ${lead.city}`,
    `Banhos por semana: ${baths}`,
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
