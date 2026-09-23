import Link from "next/link";
import styles from "./SiteFooter.module.css";

export const INSTAGRAM_URL = "https://instagram.com/afrodite.prazer";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.script}>prazer.</span>
      <p className={styles.phrase}>
        &ldquo;Dizer sim para mim, independente da opinião alheia.&rdquo;
      </p>
      <div className={styles.links}>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          @afrodite.prazer no Instagram
        </a>
        <Link href="/guia">Guia gratuito</Link>
      </div>
      <p className={styles.note}>
        Os links de compra levam à loja parceira A Sós. A Afrodite, prazer. atua como curadoria
        de conteúdo e produtos — a compra e a entrega são realizadas diretamente pela loja. Os
        preços podem mudar na loja. Conteúdo adulto, destinado a maiores de 18 anos.
      </p>
    </footer>
  );
}
