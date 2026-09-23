import Image from "next/image";
import { affiliateUrl, formatBRL, type Product } from "@/lib/catalog";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
  /** "light" em fundos claros, "dark" em fundos escuros (ex.: Premium). */
  tone?: "light" | "dark";
  showNote?: boolean;
  /** "compact" = foto à esquerda e texto à direita (vitrines da página inicial). */
  variant?: "full" | "compact";
};

export default function ProductCard({ product: p, tone = "light", showNote = true, variant = "full" }: Props) {
  const href = affiliateUrl(p);
  // data-* alimentam o evento product_click (ProductClickTracker).
  const track = { "data-handle": p.handle, "data-name": p.name, "data-section": p.section };
  return (
    <article
      className={`${styles.card} ${tone === "dark" ? styles.dark : ""} ${variant === "compact" ? styles.compact : ""}`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={styles.imgLink} tabIndex={-1} aria-hidden="true" {...track}>
        <Image src={p.image} alt="" width={440} height={440} sizes="(max-width: 600px) 45vw, 240px" />
        {p.badge && <span className={styles.badge}>{p.badge}</span>}
      </a>
      <div className={styles.body}>
        <p className={styles.brand}>{p.brand}</p>
        <h3 className={styles.name}>{p.name}</h3>
        {showNote && <p className={styles.note}>{p.note}</p>}
        <div className={styles.footer}>
          <span className={styles.price}>{formatBRL(p.price_brl)}</span>
          <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={styles.cta} {...track}>
            Quero este<span className={styles.srOnly}>: {p.name} (abre a loja A Sós)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
