import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatBRL } from "@/lib/products";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          sizes="(max-width: 760px) 50vw, (max-width: 1080px) 33vw, 320px"
          className={styles.img}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.editorial}>{product.editorial}</p>
        <div className={styles.foot}>
          <span className={styles.price}>{formatBRL(product.price_brl)}</span>
          <a
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={styles.cta}
            data-sku={product.sku}
          >
            Comprar
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
