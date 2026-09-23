import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE, verifyAccessToken } from "@/lib/ebookAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// O ebook fica fora de /public: só é servido a quem tem o link pessoal.
const EBOOK_FILE = path.join(process.cwd(), "content", "ebook", "pompoar.html");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("t");
  const fromCookie = req.headers
    .get("cookie")
    ?.split(/;\s*/)
    .find((c) => c.startsWith(`${ACCESS_COOKIE}=`))
    ?.slice(ACCESS_COOKIE.length + 1);
  const token = fromQuery ?? (fromCookie ? decodeURIComponent(fromCookie) : null);

  // No computador (npm run dev) o ebook abre direto, pra revisar sem se cadastrar.
  const isLocalDev = process.env.NODE_ENV === "development";
  if (!isLocalDev && !verifyAccessToken(token)) {
    // Redirecionamento relativo: atrás do proxy do Railway, req.url traz o host interno (localhost:8080).
    return new NextResponse(null, { status: 307, headers: { Location: "/guia" } });
  }

  let html = await fs.readFile(EBOOK_FILE, "utf8");
  // Blocos que só aparecem quando a sequência de e-mails estiver ativa no Brevo.
  if (process.env.EMAIL_SEQUENCE_ACTIVE !== "1") {
    html = html.replace(/<!--\s*SE_SEQUENCIA_EMAIL\s*-->[\s\S]*?<!--\s*\/SE_SEQUENCIA_EMAIL\s*-->/g, "");
  }

  const res = new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
  // Lembra o acesso neste aparelho, para reabrir sem o link.
  if (token && verifyAccessToken(token)) {
    res.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      maxAge: 60 * 60 * 24 * 365,
      path: "/guia",
    });
  }
  return res;
}
