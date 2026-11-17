import { site } from "@/content/site";

/** Link wa.me do pet shop. Enquanto o número for placeholder, abre o WhatsApp sem destinatário. */
export function whatsappHref(): string {
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(site.contact.whatsappMessage);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** true quando o número ainda é o placeholder [NÚMERO DO WHATSAPP]. */
export const whatsappIsPlaceholder = !/\d/.test(site.contact.whatsapp);
