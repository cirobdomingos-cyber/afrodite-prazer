import Image from "next/image";
import Link from "next/link";
import { sectionHref, sections } from "@/lib/catalog";
import { InstagramIcon } from "./BrandIcons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./links";
import styles from "./SiteFooter.module.css";

export { INSTAGRAM_URL };

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.arches} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Image
            src="/brand/oi-prazer-cream.png"
            alt="Oi, prazer"
            width={1247}
            height={449}
            className={styles.oi}
          />
          <p className={styles.phrase}>
            &ldquo;Dizer sim para mim, independente da opinião alheia.&rdquo;
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ig}
          >
            <span className={styles.igIcon}>
              <InstagramIcon size={22} />
            </span>
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Curadoria</p>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={sectionHref(s.id)}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Conteúdo</p>
          <ul>
            <li>
              <Link href="/guia">Guia gratuito: Pompoar, prazer.</Link>
            </li>
            <li>
              <Link href="/#no-cuidado">Os quatro conceitos</Link>
            </li>
            <li>
              <Link href="/#cuidar">Ritual de cuidado íntimo</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.note}>
        Os links de compra levam à loja parceira A Sós. A Afrodite, prazer. atua como curadoria de
        conteúdo e produtos — a compra e a entrega são feitas diretamente pela loja, e os preços
        podem mudar por lá. Conteúdo adulto, para maiores de 18 anos.
      </p>
    </footer>
  );
}
