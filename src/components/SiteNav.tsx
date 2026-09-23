"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sectionHref, sections } from "@/lib/catalog";
import { Crescent, InstagramIcon, Star4 } from "./BrandIcons";
import { INSTAGRAM_URL } from "./links";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Fecha ao trocar de página.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const menuButton = menuBtn.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      menuButton?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.inner}>
          <button
            ref={menuBtn}
            type="button"
            className={styles.burger}
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
            <em>Menu</em>
          </button>

          <Link href="/" className={styles.logo} aria-label="Afrodite, prazer. — página inicial">
            <Image src="/brand/logo.png" alt="" width={900} height={489} priority />
          </Link>

          <div className={styles.right}>
            <Link href="/guia" className={styles.guideBtn} aria-label="Guia grátis de pompoar">
              <Star4 size={12} />
              <span>Guia grátis</span>
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igBtn}
              aria-label="Instagram @afrodite.prazer"
            >
              <InstagramIcon size={22} />
            </a>
          </div>
        </div>
      </header>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <nav
        id="menu-principal"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Menu principal"
        aria-hidden={!open}
      >
        <div className={styles.drawerHead}>
          <Image src="/brand/oi-prazer-cream.png" alt="Oi, prazer" width={1247} height={449} className={styles.drawerOi} />
          <button ref={closeBtn} type="button" className={styles.close} aria-label="Fechar menu" onClick={close}>
            &times;
          </button>
        </div>

        <p className={styles.drawerLabel}>A curadoria</p>
        <ul className={styles.drawerList}>
          <li>
            <Link href="/" onClick={close}>
              <span className={styles.dot} style={{ background: "#F3E2C7" }} />
              Início
            </Link>
          </li>
          {sections.map((s) => (
            <li key={s.id}>
              <Link href={sectionHref(s.id)} onClick={close} aria-current={pathname === sectionHref(s.id) ? "page" : undefined}>
                <Crescent size={22} color={s.id === "premium" ? "#F2A6CE" : s.color} accent="#F3E2C7" />
                <span>
                  {s.title}
                  <small>{s.script}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/guia" className={styles.drawerGuide} onClick={close}>
          <span className={styles.drawerGuideKicker}>Guia gratuito</span>
          <strong>Pompoar, prazer.</strong>
          <span>Guia da iniciante + treino de 7 dias. Receba no e-mail →</span>
        </Link>

        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.drawerIg}>
          <InstagramIcon size={20} /> @afrodite.prazer
        </a>
      </nav>
    </>
  );
}
