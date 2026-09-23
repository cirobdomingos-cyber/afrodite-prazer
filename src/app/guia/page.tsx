import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/ebookAccess";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guia gratuito",
  description:
    "As 7 etapas do autoconhecimento íntimo. Um guia honesto pra mulher que quer se redescobrir — em qualquer idade, em qualquer fase.",
};

const MOVEMENTS = [
  { word: "Cuidado", text: "Reconhecer o silêncio e reaprender o próprio corpo." },
  { word: "Desejo", text: "Descobrir o que dá prazer de verdade." },
  { word: "Sentir", text: "Conhecer a própria resposta, sem se cobrar." },
  { word: "Independência", text: "Falar, mudar e viver como mulher que se conhece." },
];

export default function GuiaPage() {
  // Quem já tem o link pessoal (cookie no aparelho) volta direto pra leitura.
  const returning = Boolean(verifyAccessToken(cookies().get(ACCESS_COOKIE)?.value));

  return (
    <div className={styles.page}>
      <SiteNav />

      <section className={styles.hero}>
        <div className={styles.cover}>
          <div className={styles.arch}>
            <Image
              src="/ebook/img/venus-capa.jpg"
              alt=""
              width={520}
              height={640}
              priority
              sizes="(max-width: 860px) 60vw, 260px"
            />
          </div>
          <p className={styles.coverCaption}>
            Leitura online · no celular ou no computador · no seu tempo
          </p>
        </div>

        <div className={styles.formCol}>
          <div className={styles.kicker}>Guia gratuito</div>
          <h1>
            As <span className={styles.ac}>7 etapas</span> do autoconhecimento{" "}
            <span className={styles.ac}>íntimo</span>
          </h1>
          <p className={styles.lede}>
            Um guia honesto pra mulher que quer se redescobrir — em qualquer idade, em qualquer
            fase.
          </p>

          <ul className={styles.bullets}>
            <li>Como criar tempo (de verdade) pra você no meio da rotina.</li>
            <li>O que mudou no seu corpo — e como reconectar sem julgamento.</li>
            <li>Pequenos rituais semanais que não dependem de ninguém.</li>
          </ul>

          {returning ? (
            <div className={styles.returning}>
              <p>Você já tem o seu guia neste aparelho.</p>
              <Link href="/guia/ler" className={styles.readBtn}>
                Continuar lendo
              </Link>
            </div>
          ) : (
            <LeadForm source="guia" />
          )}
        </div>
      </section>

      <section className={styles.movements}>
        <div className={styles.kickerLight}>O caminho</div>
        <h2>Sete etapas, quatro movimentos.</h2>
        <div className={styles.flow}>
          {MOVEMENTS.map((m) => (
            <div key={m.word} className={styles.move}>
              <span className={styles.script}>{m.word}</span>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
