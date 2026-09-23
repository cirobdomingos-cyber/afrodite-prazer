"use client";

import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.css";

const CONSENT_KEY = "afrodite-consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.gtag?.("consent", "update", { analytics_storage: value });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Aviso de cookies">
      <p>
        Usamos cookies só para entender, de forma anônima, como o site é usado. Nada de anúncios,
        nada de rastrear você por aí.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={() => choose("denied")}>
          Não, obrigada
        </button>
        <button type="button" className={styles.accept} onClick={() => choose("granted")}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
