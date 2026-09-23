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
    <section id={section.id} className={`sec-creme ${styles.section}`} aria-labelledby={`sec-${section.id}-h`}>
      <div className="wrap">
        <header className={styles.head}>
          <span className={styles.num}>{numero}</span>
          <div>
            <h2 id={`sec-${section.id}-h`} className={styles.title}>
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

        {section.guide_pdf && (
          <div className={styles.guide}>
            <a
              href={section.guide_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.guideLink}
            >
              <span className={styles.guideEyebrow}>Material complementar</span>
              <span className={styles.guideTitle}>Como usar — passo a passo</span>
              <span className={styles.guideMeta}>PDF · download</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
