import Link from "next/link";
import ShellIcon from "./ShellIcon";
import styles from "./BrandHeader.module.css";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/guia", label: "Guia gratuito" },
  { href: "/produtos", label: "Curadoria" },
] as const;

export default function BrandHeader() {
  return (
    <header className={styles.site}>
      <div className={styles.nav}>
        <Link href="/" className={styles.brandMark} aria-label="Afrodite, prazer. — início">
          <ShellIcon size={28} className={styles.shell} />
          <span className={styles.name}>
            Afrodite,<em>prazer.</em>
          </span>
        </Link>
        <nav aria-label="Principal">
          <ul className={styles.menu}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
