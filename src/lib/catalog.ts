import catalog from "@/data/catalog.json";
import bannerData from "@/data/banners.json";

export type Product = {
  section: string;
  handle: string;
  name: string;
  brand: string;
  price_brl: number;
  image: string;
  note: string;
  badge?: string;
};

export type Section = {
  id: string;
  title: string;
  script: string;
  color: string;
  subtitle: string;
  photo: string;
  photoAlt: string;
};

export type RitualStep = {
  step: number;
  title: string;
  text: string;
  products: Product[];
};

export type Banner = {
  id: string;
  ativo: boolean;
  tema: "wine" | "teal" | "blush" | "terracota";
  kicker: string;
  titulo: string;
  texto: string;
  botao: string;
  link: string;
  imagem: string;
  imagemAlt: string;
  ate?: string;
};

// Link de afiliada A Sós: página do produto na loja + código da afiliada.
// É o mesmo destino para onde os links curtos do painel (meuhotlink) redirecionam.
const STORE_URL = "https://asosloja.com.br/products/";
const AFFILIATE_PARAMS = "utm_source=Affiliates&utm_campaign=AffWLD_6Y";

export const sections: Section[] = catalog.sections;
const products: Product[] = catalog.products;

export function sectionHref(sectionId: string): string {
  return `/curadoria/${sectionId}`;
}

export function getSection(sectionId: string): Section | undefined {
  return sections.find((s) => s.id === sectionId);
}

export function productsForSection(sectionId: string): Product[] {
  return products.filter((p) => p.section === sectionId);
}

export function ritualSteps(): RitualStep[] {
  return catalog.ritual.map((r) => ({
    step: r.step,
    title: r.title,
    text: r.text,
    products: r.handles
      .map((h) => products.find((p) => p.handle === h))
      .filter((p): p is Product => Boolean(p)),
  }));
}

// Banners ativos e dentro da validade ("ate" inclusive, no fuso de Brasília).
export function activeBanners(now = new Date()): Banner[] {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(now);
  return (bannerData.banners as Banner[]).filter((b) => b.ativo && (!b.ate || b.ate >= today));
}

export function affiliateUrl(product: Product): string {
  return `${STORE_URL}${product.handle}?${AFFILIATE_PARAMS}`;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}
