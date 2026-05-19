import Link from "next/link";
import Banner from "@/components/Banner";
import CuratedSection from "@/components/CuratedSection";
import ShellIcon from "@/components/ShellIcon";
import { sections } from "@/lib/products";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Banner />

      <section className={`${styles.hero} sec-verde`}>
        <ShellIcon size={56} className={styles.shell} />
        <h1 className={styles.headline}>
          Afrodite,
          <em>prazer.</em>
        </h1>
        <p className={styles.tagline}>Onde o prazer é liberdade.</p>

        <div className={styles.ctas}>
          <Link href="/guia" className="btn btn-primary">
            Baixar guia gratuito
          </Link>
          <Link href="#por-onde-comecar" className="btn">
            Ver a curadoria
          </Link>
        </div>
      </section>

      <section id="sobre" className={`${styles.about} sec-creme`}>
        <div className="wrap">
          <span className="eyebrow gold">Sobre</span>
          <p className={styles.aboutLead}>
            Afrodite nasceu do mar, da espuma, do silêncio — daquilo que floresce sem
            pedir permissão. <em>Aqui também:</em> prazer feminino é coisa que floresce
            no seu tempo, não na pressa de ninguém.
          </p>
          <p className={styles.aboutBody}>
            Esta é uma curadoria editorial honesta sobre saúde íntima, autoconhecimento
            e prazer. Cada produto foi escolhido com critério — pelo que entrega, pelo
            que evita prometer, pelo respeito ao seu ritmo.
          </p>
        </div>
      </section>

      {sections.map((section, i) => (
        <CuratedSection key={section.id} section={section} index={i} />
      ))}

      <section className={`${styles.cookie} sec-verde`}>
        <div className="wrap">
          <span className="eyebrow gold">Como funciona</span>
          <p className={styles.cookieLead}>
            Cada link aqui leva ao site da <em>A Sós Sensual</em>. Se você gostar de
            qualquer outra coisa por lá e comprar nos próximos <strong>30 dias</strong>,
            parte sustenta esta curadoria — sem custo extra pra você.
          </p>
          <p className={styles.cookieFine}>
            Clique, navegue, conheça. O preço para você é o mesmo. A comissão é o que
            permite que este espaço continue existindo.
          </p>
        </div>
      </section>
    </>
  );
}
