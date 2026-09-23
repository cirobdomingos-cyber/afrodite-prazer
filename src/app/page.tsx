import Image from "next/image";
import Link from "next/link";
import { Crescent, Star4, Star8, StarCircle, StarOutline } from "@/components/BrandIcons";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import {
  activeBanners,
  affiliateUrl,
  formatBRL,
  getSection,
  productsForSection,
  ritualSteps,
  sectionHref,
  type Section,
} from "@/lib/catalog";
import styles from "./home.module.css";

// Refaz a página a cada hora, para banners com data de validade ("ate") saírem sozinhos.
export const revalidate = 3600;

const CONCEPTS = [
  {
    word: "Cuidado",
    text: "A atenção que você dedica a si mesma, sem pressa e sem julgamento.",
    href: "#cuidar",
    icon: <Crescent size={64} color="#1A7562" />,
  },
  {
    word: "Desejo",
    text: "Reconhecer uma vontade como legítima — e explorar com informação, sem culpa.",
    href: "#explorar",
    icon: <Star8 size={64} color="#DA7811" />,
  },
  {
    word: "Sentir",
    text: "Estar presente no próprio corpo e perceber as sensações, sem se cobrar por elas.",
    href: "#sentidos",
    icon: <StarOutline size={64} color="#B8407F" accent="#F2A6CE" />,
  },
  {
    word: "Independência",
    text: "A autonomia de decidir por si mesma, sem depender da aprovação de ninguém.",
    href: "#premium",
    icon: <StarCircle size={64} color="#581931" accent="#F3E2C7" />,
  },
];

type FeatureProps = {
  section: Section;
  number: string;
  heading: string;
  theme: "blush" | "peach" | "wine";
  reverse?: boolean;
};

function FeatureSection({ section, number, heading, theme, reverse = false }: FeatureProps) {
  const all = productsForSection(section.id);
  const highlights = all.slice(0, 4);
  const dark = theme === "wine";
  return (
    <section
      id={section.id}
      className={`${styles.feature} ${styles[theme]} ${reverse ? styles.reverse : ""}`}
      aria-labelledby={`${section.id}-title`}
    >
      <div className={styles.featureInner}>
        <div className={styles.featureMedia}>
          <div className={styles.featurePhoto}>
            <Image src={section.photo} alt={section.photoAlt} fill sizes="(max-width: 900px) 90vw, 460px" />
          </div>
          <span className={styles.featureScript}>{section.script}</span>
        </div>

        <div className={styles.featureContent}>
          <p className={styles.kicker}>
            Curadoria {number} · {all.length} produtos
          </p>
          <h2 id={`${section.id}-title`}>{heading}</h2>
          <p className={styles.featureLede}>{section.subtitle}</p>

          <div className={styles.featureGrid}>
            {highlights.map((p) => (
              <ProductCard key={p.handle} product={p} tone={dark ? "dark" : "light"} showNote={false} variant="compact" />
            ))}
          </div>

          <Link href={sectionHref(section.id)} className={styles.seeAll}>
            Ver todos os produtos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const cuidar = getSection("cuidar")!;
  const sentidos = getSection("sentidos")!;
  const explorar = getSection("explorar")!;
  const premium = getSection("premium")!;
  const steps = ritualSteps();

  return (
    <div className={styles.page}>
      <SiteNav />
      <HeroBanner banners={activeBanners()} />

      {/* ---------- Os quatro conceitos ---------- */}
      <section id="no-cuidado" className={styles.concepts} aria-labelledby="conceito-title">
        <p className={styles.kicker}>O conceito</p>
        <h2 id="conceito-title" className={styles.quote}>
          No <em>cuidado</em> que desperta o <em>desejo</em>, no desejo que aprende a{" "}
          <em>sentir</em>, encontramos a <em>independência</em> de ser quem somos.
        </h2>
        <ol className={styles.conceptList}>
          {CONCEPTS.map((c, i) => (
            <li key={c.word}>
              <a href={c.href} className={styles.concept}>
                <span className={styles.conceptIcon}>{c.icon}</span>
                <span className={styles.conceptNum}>0{i + 1}</span>
                <span className={styles.conceptWord}>{c.word}</span>
                <span className={styles.conceptText}>{c.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.archBand} aria-hidden="true" />

      {/* ---------- Cuidar de mim: ritual passo a passo ---------- */}
      <section id="cuidar" className={styles.ritual} aria-labelledby="cuidar-title">
        <div className={styles.ritualHead}>
          <div>
            <p className={styles.kicker}>Curadoria 01 · {cuidar.title}</p>
            <h2 id="cuidar-title">
              Skincare também é pra lá<span className={styles.accentDot}>.</span>
            </h2>
          </div>
          <p>
            Seu ritual íntimo em quatro passos. A pele da vulva e da virilha é mais fina e sensível
            que a do resto do corpo — merece produto pensado pra ela, não o sabonete do chuveiro.
          </p>
        </div>

        <ol className={styles.steps}>
          {steps.map((s) => {
            const [main, ...alts] = s.products;
            return (
              <li key={s.step} className={styles.step}>
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{s.step}</span>
                  <h3>{s.title}</h3>
                </div>
                <p className={styles.stepText}>{s.text}</p>
                {main && (
                  <a
                    href={affiliateUrl(main)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={styles.stepProduct}
                    data-handle={main.handle}
                    data-name={main.name}
                    data-section={main.section}
                  >
                    <Image src={main.image} alt="" width={600} height={600} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 260px" />
                    <span>
                      <strong>{main.name}</strong>
                      <em>{formatBRL(main.price_brl)} · ver na loja →</em>
                    </span>
                  </a>
                )}
                {alts.length > 0 && (
                  <ul className={styles.stepAlts}>
                    <li className={styles.stepAltsLabel}>Ou então:</li>
                    {alts.map((p) => (
                      <li key={p.handle}>
                        <a
                          href={affiliateUrl(p)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          data-handle={p.handle}
                          data-name={p.name}
                          data-section={p.section}
                        >
                          <Image src={p.image} alt="" width={80} height={80} sizes="40px" />
                          <span>{p.name}</span>
                          <b>{formatBRL(p.price_brl)}</b>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>

        <div className={styles.ritualFoot}>
          <Link href={sectionHref("cuidar")} className={`${styles.seeAll} ${styles.seeAllLight}`}>
            Ver todos os produtos de cuidado <span aria-hidden="true">→</span>
          </Link>
          <p className={styles.ritualNote}>
            <Star4 size={12} /> Coceira, ardor ou mudança brusca de cheiro? Aí é hora de consulta,
            não de cosmético.
          </p>
        </div>
      </section>

      <FeatureSection section={sentidos} number="02" heading="Conforto e sentir." theme="blush" />
      <FeatureSection section={explorar} number="03" heading="Desejo, sem culpa." theme="peach" reverse />
      <FeatureSection section={premium} number="04" heading="Premium: você já sabe o que quer." theme="wine" />

      {/* ---------- Guia gratuito ---------- */}
      <section className={styles.guide} aria-labelledby="guia-title">
        <div className={styles.guideInner}>
          <div className={styles.guideImg}>
            <Image src="/ebook/img/venus-capa.jpg" alt="" fill sizes="220px" />
          </div>
          <div>
            <p className={styles.kicker}>Guia gratuito</p>
            <h2 id="guia-title">Pompoar, prazer.</h2>
            <p>
              7 etapas pra conhecer, sentir e fortalecer o seu assoalho pélvico — no seu ritmo, pra
              você. Não pra agradar ninguém.
            </p>
          </div>
          <Link href="/guia" className={styles.guideBtn}>
            Quero o guia grátis <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
