"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Banner } from "@/lib/catalog";
import { Star4 } from "./BrandIcons";
import styles from "./HeroBanner.module.css";

const INTERVAL_MS = 6500;

export default function HeroBanner({ banners }: { banners: Banner[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const count = banners.length;

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, [count]);

  // Acompanha o banner visível (também quando a pessoa arrasta com o dedo).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Troca sozinho, exceto com o mouse em cima, pausado ou com "reduzir movimento".
  useEffect(() => {
    if (count < 2 || paused || hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => goTo(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, hovering, count, goTo]);

  if (count === 0) return null;

  return (
    <section
      className={styles.hero}
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className={styles.track} ref={track}>
        {banners.map((b, i) => {
          const Title = i === 0 ? "h1" : "h2";
          const internal = b.link.startsWith("/") || b.link.startsWith("#");
          return (
            <div
              key={b.id}
              className={`${styles.slide} ${styles[b.tema]}`}
              role="group"
              aria-roledescription="banner"
              aria-label={`${i + 1} de ${count}`}
              aria-hidden={i !== index}
            >
              <div className={styles.slideInner}>
                <div className={styles.copy}>
                  <p className={styles.kicker}>
                    <Star4 size={12} /> {b.kicker}
                  </p>
                  <Title className={styles.title}>{b.titulo}</Title>
                  <p className={styles.text}>{b.texto}</p>
                  {internal ? (
                    <Link href={b.link} className={styles.cta} tabIndex={i === index ? 0 : -1}>
                      {b.botao} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <a href={b.link} className={styles.cta} target="_blank" rel="noopener noreferrer" tabIndex={i === index ? 0 : -1}>
                      {b.botao} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
                <div className={styles.visual}>
                  <Star4 size={34} className={styles.sparkA} />
                  <Star4 size={18} className={styles.sparkB} />
                  <div className={styles.arch}>
                    <Image
                      src={b.imagem}
                      alt={b.imagemAlt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 760px) 70vw, 420px"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} aria-label="Banner anterior" onClick={() => goTo(index - 1)}>
            ←
          </button>
          <div className={styles.dots}>
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                aria-label={`Ir para o banner ${i + 1}: ${b.titulo}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.arrow} aria-label="Próximo banner" onClick={() => goTo(index + 1)}>
            →
          </button>
          <button
            type="button"
            className={styles.pause}
            aria-label={paused ? "Retomar troca automática" : "Pausar troca automática"}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "▶" : "❚❚"}
          </button>
        </div>
      )}
    </section>
  );
}
