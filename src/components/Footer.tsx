import Link from "next/link";
import ShellIcon from "./ShellIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.foot}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          <ShellIcon size={36} />
          <p className={styles.name}>
            Afrodite, <em>prazer.</em>
          </p>
          <p className={styles.tag}>Onde o prazer é liberdade.</p>
        </div>

        <nav className={styles.cols} aria-label="Rodapé">
          <div>
            <p className={styles.eyebrow}>Navegar</p>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/#sobre">Sobre</Link></li>
              <li><Link href="/#por-onde-comecar">Curadoria</Link></li>
              <li><Link href="/guia">Guia gratuito</Link></li>
            </ul>
          </div>
          <div>
            <p className={styles.eyebrow}>Encontrar</p>
            <ul>
              <li>
                <a href="https://instagram.com/afrodite.prazer" target="_blank" rel="noreferrer noopener">
                  Instagram · @afrodite.prazer
                </a>
              </li>
              <li><a href="mailto:contato@afroditeprazer.com.br">contato@afroditeprazer.com.br</a></li>
              <li>Curitiba, PR · Brasil</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {year} Afrodite, prazer.</span>
        <span>Conteúdo adulto · destinado a maiores de 18 anos.</span>
      </div>
    </footer>
  );
}
