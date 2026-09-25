// SEO: endereço oficial do site, títulos e descrições pensados para as buscas,
// e os dados estruturados (JSON-LD) que o Google lê.

export const SITE_URL = "https://afroditeprazer.com.br";
export const SITE_NAME = "Afrodite, prazer.";
export const INSTAGRAM_URL = "https://www.instagram.com/afrodite.prazer/";

// Imagem de compartilhamento (src/app/opengraph-image.png). Páginas que definem o próprio
// openGraph precisam repeti-la, senão o Next não a herda.
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Afrodite, prazer. Curadoria de bem-estar íntimo para mulheres.",
};

// Título e descrição de cada curadoria para o Google (o título da página na tela continua o do catálogo).
export const SECTION_SEO: Record<string, { title: string; description: string }> = {
  cuidar: {
    title: "Cuidado íntimo: sabonete íntimo, sérum e ritual em 4 passos",
    description:
      "Sabonete íntimo, esfoliante, hidratante e sérum para a vulva e a virilha, com o ritual de skincare íntimo em 4 passos. Curadoria da Afrodite.",
  },
  sentidos: {
    title: "Lubrificante íntimo, óleo de massagem e produtos para os sentidos",
    description:
      "Lubrificantes, óleos de massagem, velas e géis beijáveis para redescobrir o corpo, sozinha ou a dois. Curadoria da Afrodite, com entrega discreta.",
  },
  explorar: {
    title: "Vibradores para iniciantes e estimuladores: desejo sem culpa",
    description:
      "Cápsulas, dedeiras e estimuladores escolhidos para quem está começando, com informação e sem vergonha. Curadoria da Afrodite, com entrega discreta.",
  },
  premium: {
    title: "Vibradores e estimuladores premium",
    description:
      "Estimuladores de clitóris e vibradores recarregáveis com tecnologia e acabamento premium, para quem já sabe o que quer. Curadoria da Afrodite.",
  },
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#marca`,
        name: SITE_NAME,
        alternateName: "Afrodite Prazer",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.png`,
        description: "Curadoria de bem-estar íntimo para mulheres adultas.",
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#marca` },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
  };
}

// Serializa sem permitir que um "</script>" dentro do texto feche a tag.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
