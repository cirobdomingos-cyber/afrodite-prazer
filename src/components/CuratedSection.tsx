import type { CuratedSection as Section } from "@/lib/products";
import { productsForSection } from "@/lib/products";
import ProductCard from "./ProductCard";
import styles from "./CuratedSection.module.css";

export default function CuratedSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const products = productsForSection(section);
  if (products.length === 0) return null;
  const numero = String(index + 1).padStart(2, "0");

  return (
    <section className={`sec-creme ${styles.section}`} aria-labelledby={`sec-${section.id}`}>
      <div className="wrap">
        <header className={styles.head}>
          <span className={styles.num}>{numero}</span>
          <div>
            <h2 id={`sec-${section.id}`} className={styles.title}>
              {section.title}
            </h2>
            <p className={styles.subtitle}>{section.subtitle}</p>
          </div>
        </header>

        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
