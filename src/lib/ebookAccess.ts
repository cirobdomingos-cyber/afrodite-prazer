import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Link pessoal de leitura do ebook.
 *
 * Quem deixa o e-mail em /guia recebe /guia/ler?t=<token>. O token é o e-mail
 * assinado com EBOOK_TOKEN_SECRET (HMAC-SHA256), então funciona em qualquer
 * aparelho e não expira, mas não pode ser inventado sem o segredo.
 */

export const ACCESS_COOKIE = "afrodite_ebook";

function secret(): string {
  const s = process.env.EBOOK_TOKEN_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") {
    console.warn("[ebook] EBOOK_TOKEN_SECRET não configurado — usando segredo provisório");
  }
  return "afrodite-dev-only-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createAccessToken(email: string): string {
  const payload = Buffer.from(email.trim().toLowerCase()).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Retorna o e-mail dono do token, ou null se o token for inválido. */
export function verifyAccessToken(token: string | null | undefined): string | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}
