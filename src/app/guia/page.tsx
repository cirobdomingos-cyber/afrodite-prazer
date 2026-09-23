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
  title: "Guia gratuito de pompoar",
  description:
    "Pompoar, prazer.: 7 etapas pra conhecer, sentir e fortalecer o seu assoalho pélvico — no seu ritmo, pra você.",
};

const MOVEMENTS = [
  { word: "Cuidado", text: "Conhecer o assoalho pélvico e encontrar o músculo." },
  { word: "Desejo", text: "Decidir por que pompoar — pra você, não pra ninguém." },
  { word: "Sentir", text: "Os primeiros exercícios e, se quiser, os acessórios." },
  { word: "Independência", text: "Uma rotina sua e a hora certa de pedir ajuda." },
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
            <span className={styles.ac}>Pompoar</span>, prazer.
          </h1>
          <p className={styles.lede}>
            7 etapas pra conhecer, sentir e fortalecer o seu assoalho pélvico — no seu ritmo,
            pra você. Não pra agradar ninguém.
          </p>

          <ul className={styles.bullets}>
            <li>Onde fica o assoalho pélvico e como encontrar o músculo, sem constrangimento.</li>
            <li>Os primeiros exercícios, sem acessório — cinco minutos por dia.</li>
            <li>Um plano de quatro semanas e o que fazer quando algo não vai bem.</li>
            <li>Bônus: gestação, pós-parto e menopausa.</li>
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
