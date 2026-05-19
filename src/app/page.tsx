import Link from "next/link";
import ShellIcon from "@/components/ShellIcon";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={`${styles.hero} sec-verde`}>
        <ShellIcon size={64} className={styles.shell} />
        <h1 className={styles.headline}>
          Afrodite,
          <em>prazer.</em>
        </h1>
        <p className={styles.tagline}>Onde o prazer é liberdade.</p>
        <p className={styles.sub}>
          Um espaço para conversa, descoberta e autocuidado íntimo feminino — no seu ritmo,
          no seu silêncio.
        </p>

        <div className={styles.ctas}>
          <Link href="/guia" className="btn btn-primary">
            Baixar guia gratuito
          </Link>
          <Link href="/produtos" className="btn">
            Ver a curadoria
          </Link>
        </div>

        <div className={styles.scroll}>
          <span>Role</span>
          <span className="rule" />
        </div>
      </section>

      <section className={`${styles.manifesto} sec-creme`}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Manifesto</span>
            <h2>
              <em>O essencial</em>
              <br />
              não precisa gritar.
            </h2>
          </div>

          <div className={styles.quote}>
            <p>
              Afrodite nasceu do mar. Da espuma. Do silêncio. Daquilo que floresce sem pedir
              permissão.
            </p>
            <p>
              E talvez o prazer feminino seja assim também — coisa que floresce no tempo dela,
              não na pressa de ninguém.
            </p>
            <p>
              Prazer também é saúde. É presença. É intimidade consigo mesma. Não existe certo
              ou errado no tempo do desejo — existe escuta, descoberta, confiança.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.curadoria} sec-verde`}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Sobre a curadoria</span>
            <h2>
              Uma seleção pequena, <em>honesta.</em>
            </h2>
          </div>

          <p className={styles.curadoriaIntro}>
            Não é uma vitrine. São produtos que eu mesma testei, escolhidos com critério —
            organizados por necessidade, não por categoria.
          </p>

          <div className={styles.curadoriaCtas}>
            <Link href="/produtos" className="btn">
              Conhecer os produtos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
