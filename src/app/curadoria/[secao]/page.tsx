import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBrowser from "@/components/ProductBrowser";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getSection, productsForSection, ritualSteps, sectionHref, sections } from "@/lib/catalog";
import styles from "./page.module.css";

type Params = { params: { secao: string } };

const THEME: Record<string, string> = {
  cuidar: styles.teal,
  sentidos: styles.blush,
  explorar: styles.peach,
  premium: styles.wine,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((s) => ({ secao: s.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const section = getSection(params.secao);
  if (!section) return {};
  return {
    title: section.title,
    description: section.subtitle,
    alternates: { canonical: sectionHref(section.id) },
  };
}

export default function SectionPage({ params }: Params) {
  const section = getSection(params.secao);
  if (!section) notFound();

  const products = productsForSection(section.id);
  const position = sections.findIndex((s) => s.id === section.id);
  const next = sections[(position + 1) % sections.length];
  const steps = section.id === "cuidar" ? ritualSteps() : [];

  return (
    <div className={`${styles.page} ${THEME[section.id] ?? ""}`}>
      <SiteNav />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav aria-label="Você está em" className={styles.crumbs}>
              <Link href="/">Início</Link>
              <span aria-hidden="true">/</span>
              <span>Curadoria</span>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{section.title}</span>
            </nav>
            <p className={styles.kicker}>
              Curadoria 0{position + 1} · {products.length} produtos
            </p>
            <h1>
              {section.title}
              <span className={styles.script}>{section.script}</span>
            </h1>
            <p className={styles.lede}>{section.subtitle}</p>
          </div>
          <div className={styles.heroPhoto}>
            <Image src={section.photo} alt={section.photoAlt} fill priority sizes="(max-width: 760px) 60vw, 320px" />
          </div>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Seções da curadoria">
        <div className={styles.tabsInner}>
          {sections.map((s) => (
            <Link
              key={s.id}
              href={sectionHref(s.id)}
              className={s.id === section.id ? styles.tabActive : undefined}
              aria-current={s.id === section.id ? "page" : undefined}
            >
              {s.title}
            </Link>
          ))}
        </div>
      </nav>

      {steps.length > 0 && (
        <section className={styles.ritual} aria-label="Ritual em quatro passos">
          <p className={styles.ritualTitle}>Seu ritual em 4 passos</p>
          <ol>
            {steps.map((s) => (
              <li key={s.step}>
                <span>{s.step}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <main className={styles.main}>
        <ProductBrowser products={products} tone="light" />
      </main>

      <section className={styles.next}>
        <Link href={sectionHref(next.id)} className={styles.nextCard}>
          <span className={styles.nextKicker}>Continue a jornada</span>
          <span className={styles.nextTitle}>
            {next.title} <span aria-hidden="true">→</span>
          </span>
          <span className={styles.nextText}>{next.subtitle}</span>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
