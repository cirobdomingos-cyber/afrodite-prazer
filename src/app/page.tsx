import Image from "next/image";
import Carousel from "@/components/Carousel";
import SiteFooter, { INSTAGRAM_URL } from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { affiliateUrl, formatBRL, productsForSection, sections } from "@/lib/catalog";
import styles from "./home.module.css";

const CONCEPTS = [
  { word: "Cuidado", text: "Atenção dedicada a si mesma, sem pressa e sem julgamento." },
  { word: "Desejo", text: "Reconhecer uma vontade como legítima — sem culpa, sem esconder." },
  { word: "Sentir", text: "Estar presente no próprio corpo, sem se cobrar por isso." },
  { word: "Independência", text: "A autonomia que devolvemos a você para decidir por si mesma." },
];

function Wave({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <svg
      className={styles.wave}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M0,40 C 240,90 360,-10 600,35 C 840,80 1000,0 1200,30 C 1320,48 1380,45 1440,38 L1440,80 L0,80 Z"
        fill={color}
      />
      <path
        d="M0,45 C 220,10 420,75 660,40 C 900,5 1080,65 1440,32"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteNav />

      <header className={styles.hero}>
        <Image
          className={styles.heroLogo}
          src="/brand/logo.png"
          alt="Afrodite, prazer."
          width={900}
          height={489}
          priority
        />
        <div className={styles.kicker}>Curadoria de bem-estar íntimo</div>
        <h1>Prazer é como a maré: silenciosa em sua origem, certeira em sua chegada.</h1>
        <p className={styles.sub}>
          Uma seleção pensada para mulheres que já sabem o que querem — sem pressa, sem
          julgamento, sem vulgaridade. Cada produto aqui foi escolhido para devolver a você a
          autonomia sobre o próprio corpo.
        </p>
        <div className={styles.heroActions}>
          <a href={`#${sections[0].id}`} className={`${styles.btn} ${styles.btnPrimary}`}>
            Ver a curadoria
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnGhost}`}
          >
            Seguir no Instagram
          </a>
        </div>
      </header>

      <Wave color="#581931" />

      <section className={styles.manifesto} id="manifesto">
        <blockquote>
          &ldquo;No cuidado que desperta o desejo, no desejo que aprende a sentir, encontramos a
          independência de ser quem somos.&rdquo;
        </blockquote>
        <div className={styles.conceptFlow}>
          {CONCEPTS.map((c, i) => (
            <div key={c.word} className={styles.conceptItem}>
              {i > 0 && (
                <div className={styles.conceptArrow} aria-hidden="true">
                  &#8594;
                </div>
              )}
              <div className={styles.conceptWord}>
                <span className={styles.script}>{c.word}</span>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Wave color="#F3E2C7" flip />

      <section className={styles.catalogIntro}>
        <div className={styles.kicker}>A curadoria</div>
        <h2>Dizer sim para mim, independente da opinião alheia.</h2>
        <p>
          Produtos organizados do jeito que você chega até eles: começando pelo cuidado diário e
          avançando no seu próprio ritmo.
        </p>
      </section>

      {sections.map((section) => {
        const items = productsForSection(section.id);
        return (
          <section
            key={section.id}
            id={section.id}
            className={styles.category}
            style={{ "--cat-color": section.color } as React.CSSProperties}
          >
            <div className={styles.categoryHead}>
              <h2>
                {section.title} <span className={styles.script}>{section.script}</span>
              </h2>
              <p>{section.subtitle}</p>
              <div className={styles.categoryCount}>{items.length} produtos</div>
            </div>
            <Carousel>
              {items.map((p) => (
                <article key={p.handle} className={styles.card}>
                  <div className={styles.cardImg}>
                    <Image src={p.image} alt={p.name} width={440} height={440} sizes="220px" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardBrand}>{p.brand}</div>
                    <h3 className={styles.cardName}>{p.name}</h3>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardPrice}>{formatBRL(p.price_brl)}</div>
                      <a
                        className={styles.cardCta}
                        href={affiliateUrl(p)}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        data-handle={p.handle}
                        data-name={p.name}
                        data-section={section.id}
                      >
                        Quero este
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </Carousel>
          </section>
        );
      })}

      <SiteFooter />
    </div>
  );
}
