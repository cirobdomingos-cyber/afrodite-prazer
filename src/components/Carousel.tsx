"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const el = grid.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselWrap}>
      <button
        type="button"
        className={`${styles.carArrow} ${styles.carPrev}`}
        aria-label="Produtos anteriores"
        disabled={atStart}
        onClick={() => scroll(-1)}
      >
        &#8592;
      </button>
      <div className={styles.grid} ref={grid}>
        {children}
      </div>
      <button
        type="button"
        className={`${styles.carArrow} ${styles.carNext}`}
        aria-label="Próximos produtos"
        disabled={atEnd}
        onClick={() => scroll(1)}
      >
        &#8594;
      </button>
    </div>
  );
}
