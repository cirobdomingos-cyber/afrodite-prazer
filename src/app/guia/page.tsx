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
    "Pompoar, prazer.: o guia da iniciante. Do primeiro “onde fica?” ao seu primeiro treino de 7 dias — no seu ritmo, pra você.",
};

const MOVEMENTS = [
  { word: "Cuidado", text: "O que é pompoar, onde fica o músculo e como encontrá-lo." },
  { word: "Desejo", text: "Por que treinar — pra você, não pra ninguém." },
  { word: "Sentir", text: "Respiração, posições, movimentos e o que é normal sentir." },
  { word: "Independência", text: "O seu primeiro treino de 7 dias, com diário pra marcar." },
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
            15 páginas · leia no celular ou salve em PDF
          </p>
        </div>

        <div className={styles.formCol}>
          <div className={styles.kicker}>Guia gratuito</div>
          <h1>
            <span className={styles.ac}>Pompoar</span>, prazer.
          </h1>
          <p className={styles.lede}>
            O guia da iniciante: do primeiro “onde fica?” ao seu primeiro treino de 7 dias — no
            seu ritmo, pra você. Não pra agradar ninguém.
          </p>

          <ul className={styles.bullets}>
            <li>Onde fica o assoalho pélvico e quatro jeitos de encontrar o músculo, sem constrangimento.</li>
            <li>Respiração, posições e os movimentos básicos, sem acessório.</li>
            <li>Um treino de 7 dias, de 4 a 10 minutos por dia, com diário pra marcar.</li>
            <li>O que é normal sentir e quando vale procurar uma fisioterapeuta.</li>
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
        <h2>Quatro movimentos, sete dias.</h2>
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
