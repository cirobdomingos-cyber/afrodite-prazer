"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import styles from "./LeadForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type Result = { readPath: string; emailed: boolean };

export default function LeadForm({ source = "guia" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

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
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        readPath?: string;
        provider?: string;
      };
      if (!res.ok || !json.ok || !json.readPath) {
        throw new Error(json.error || "Não foi possível concluir o envio. Tenta de novo?");
      }
      track("ebook_lead_submit", { source });
      setResult({ readPath: json.readPath, emailed: json.provider === "brevo" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado. Tenta de novo?");
    }
  }

  if (status === "success" && result) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <p className={styles.successTitle}>Pronto. Seu guia é seu.</p>
        <p className={styles.successBody}>
          {result.emailed
            ? "Também mandamos o link pro seu e-mail — guarde, ele é só seu e abre em qualquer aparelho."
            : "Guarde este aparelho por perto: o guia fica salvo aqui pra você voltar quando quiser."}
        </p>
        <a href={result.readPath} className={styles.submit}>
          Começar a ler
        </a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
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
      <div className={styles.field}>
        <label htmlFor="lead-email">Seu e-mail</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="voce@exemplo.com.br"
        />
      </div>

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando…" : "Quero meu guia"}
      </button>

      {status === "error" && errorMsg && (
        <p className={styles.error} role="alert">
          {errorMsg}
        </p>
      )}

      <p className={styles.fine}>
        Cuidamos do seu e-mail com discrição. Sem spam, sem repasse — você pode cancelar
        quando quiser.
      </p>
    </form>
  );
}
