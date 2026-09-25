import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// A leitura do guia (/guia/ler) é pessoal e a API não é página: ficam fora do Google.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/guia/ler"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
