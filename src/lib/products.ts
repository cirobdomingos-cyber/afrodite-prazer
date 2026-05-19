import curated from "@/data/curated.json";

export type Product = {
  sku: string;
  name: string;
  brand: string;
  price_brl: number;
  image: string;
  editorial: string;
  affiliate_url: string;
  featured?: boolean;
};

export type CuratedSection = {
  id: string;
  title: string;
  subtitle: string;
  skus: string[];
};

const all: Product[] = curated.products as Product[];
const byId = new Map(all.map((p) => [p.sku, p]));

export const sections: CuratedSection[] = curated.sections as CuratedSection[];

export function productsForSection(section: CuratedSection): Product[] {
  return section.skus
    .map((sku) => byId.get(sku))
    .filter((p): p is Product => p != null);
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}
