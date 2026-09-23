import Link from "next/link";
import { sections } from "@/lib/catalog";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return (
    <nav className={styles.nav} aria-label="Principal">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Afrodite<span>,</span> prazer.
        </Link>
        <div className={styles.links}>
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`}>
              {s.title}
            </a>
          ))}
          <Link href="/guia">Guia gratuito</Link>
        </div>
      </div>
    </nav>
  );
}
