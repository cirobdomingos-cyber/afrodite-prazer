import Link from "next/link";
import banner from "@/data/banner.json";
import styles from "./Banner.module.css";

type BannerData = {
  active: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta_label?: string;
  cta_href?: string;
};

export default function Banner() {
  const b = banner as BannerData;
  if (!b.active) return null;
  return (
    <aside className={styles.banner} role="region" aria-label="Promoção">
      <div className={styles.inner}>
        <div className={styles.text}>
          {b.eyebrow && <span className={styles.eyebrow}>{b.eyebrow}</span>}
          {b.title && <p className={styles.title}>{b.title}</p>}
          {b.subtitle && <p className={styles.subtitle}>{b.subtitle}</p>}
        </div>
        {b.cta_href && b.cta_label && (
          <Link href={b.cta_href} className={styles.cta}>
            {b.cta_label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
