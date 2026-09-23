import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guia gratuito",
  description:
    "As 7 Etapas do Autoconhecimento Íntimo. Um guia honesto pra mulher que quer se redescobrir — em qualquer idade, em qualquer fase.",
};

export default function GuiaPage() {
  return (
    <section className={`${styles.section} sec-verde`}>
      <div className={styles.layout}>
        <aside className={styles.mockupCol}>
          <div className={styles.mockup} aria-hidden="true">
            <div className={styles.mockupCover}>
              <span className={styles.mockupEyebrow}>Guia gratuito</span>
              <p className={styles.mockupTitle}>
                As 7 Etapas
                <br />
                do <em>Autoconhecimento</em>
                <br />
                Íntimo.
              </p>
              <span className={styles.mockupBrand}>
                Afrodite, <em>prazer.</em>
              </span>
            </div>
          </div>
          <p className={styles.mockupCaption}>56 páginas · PDF · leitura no celular ou impressão</p>
        </aside>

        <div className={styles.formCol}>
          <span className="eyebrow gold">Lead magnet</span>
          <h1 className={styles.headline}>
            As 7 Etapas do
            <br />
            <em>Autoconhecimento Íntimo.</em>
          </h1>
          <p className={styles.lead}>
            Um guia honesto pra mulher que quer se redescobrir — em qualquer idade, em qualquer
            fase.
          </p>

          <ul className={styles.bullets}>
            <li>Como criar tempo (de verdade) pra você no meio da rotina.</li>
            <li>O que mudou no seu corpo — e como reconectar sem julgamento.</li>
            <li>Pequenos rituais semanais que não dependem de ninguém.</li>
          </ul>

          <LeadForm source="guia" />
        </div>
      </div>
    </section>
  );
}
