import catalog from "@/data/catalog.json";

export type Product = {
  section: string;
  handle: string;
  name: string;
  brand: string;
  price_brl: number;
  image: string;
};

export type Section = {
  id: string;
  title: string;
  script: string;
  color: string;
  subtitle: string;
};

// Link de afiliada A Sós: página do produto na loja + código da afiliada.
// É o mesmo destino para onde os links curtos do painel (meuhotlink) redirecionam.
const STORE_URL = "https://asosloja.com.br/products/";
const AFFILIATE_PARAMS = "utm_source=Affiliates&utm_campaign=AffWLD_6Y";

export const sections: Section[] = catalog.sections;
const products: Product[] = catalog.products;

export function productsForSection(sectionId: string): Product[] {
  return products.filter((p) => p.section === sectionId);
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
