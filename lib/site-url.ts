/** URL pública do site. Configure NEXT_PUBLIC_SITE_URL na Vercel (sem barra no final). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://agendaflui.com.br").replace(/\/+$/, "");
