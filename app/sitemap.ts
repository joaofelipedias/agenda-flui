import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// /privacidade e /termos ficam fora enquanto o texto não for revisado (estão com noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

export const dynamic = "force-static";
