import type { Metadata } from "next";
import CuratedSection from "@/components/CuratedSection";
import { sections } from "@/lib/products";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Curadoria",
  description:
    "Uma seleção pequena e honesta de produtos de saúde íntima e prazer feminino — organizados por necessidade, não por categoria.",
};

export default function ProdutosPage() {
  return (
    <>
      <section className={`${styles.intro} sec-verde`}>
        <div className="wrap">
          <span className="eyebrow gold">Curadoria editorial</span>
          <h1 className={styles.headline}>
            Não é vitrine.
            <br />
            <em>É escolha.</em>
          </h1>
          <p className={styles.lead}>
            São produtos da A Sós Sensual que eu mesma testei, escolhidos com critério — organizados
            por necessidade, não por categoria. A compra acontece no site oficial; a curadoria é
            minha.
          </p>
          <p className={styles.disclosure}>
            Algumas indicações usam links de afiliada. O preço para você é o mesmo — uma pequena
            comissão sustenta este espaço.
          </p>
        </div>
      </section>

      {sections.map((section, i) => (
        <CuratedSection key={section.id} section={section} index={i} />
      ))}
    </>
  );
}
