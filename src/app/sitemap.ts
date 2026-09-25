import type { MetadataRoute } from "next";
import { sectionHref, sections } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

// Mapa do site para o Google: home, guia e as quatro curadorias.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/guia`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...sections.map((s) => ({
      url: `${SITE_URL}${sectionHref(s.id)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
