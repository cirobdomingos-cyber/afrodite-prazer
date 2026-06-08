"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import styles from "./LeadForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({ source = "guia" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      source,
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Não foi possível concluir o envio.");
      }
      track("ebook_lead_submit", { source });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <p className={styles.successTitle}>Pronto. Seu guia está a caminho.</p>
        <p className={styles.successBody}>
          Em alguns instantes você recebe um e-mail com o link para download. Se demorar mais
          do que o esperado, confira sua caixa de promoções.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="lead-name">Seu primeiro nome</label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="given-name"
          required
          minLength={2}
          placeholder="como você gosta de ser chamada"
        />
      </div>
      <div className="form-field">
        <label htmlFor="lead-email">Seu e-mail</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="você@exemplo.com.br"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Enviando…" : "Quero meu guia"}
      </button>

      {status === "error" && errorMsg && (
        <p className={styles.error} role="alert">{errorMsg}</p>
      )}

      <p className={styles.fine}>
        Cuidamos do seu e-mail com discrição. Sem spam, sem repasse — você pode cancelar
        quando quiser.
      </p>
    </form>
  );
}
