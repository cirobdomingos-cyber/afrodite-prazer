import { NextResponse } from "next/server";
import { addContact, sendEbookEmail } from "@/lib/brevo";
import { createAccessToken } from "@/lib/ebookAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = { name?: unknown; email?: unknown; source?: unknown };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "json_invalid" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 40) : "unknown";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Conta pra gente como você gosta de ser chamada." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Confere o e-mail? Parece que faltou alguma coisa." }, { status: 400 });
  }

  const readPath = `/guia/ler?t=${createAccessToken(email)}`;
  const readUrl = `${siteOrigin(req)}${readPath}`;

  const hasBrevo = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
  if (!hasBrevo) {
    // Sem Brevo o contato fica registrado nos logs do Railway (busque por "[lead]").
    console.log("[lead]", JSON.stringify({ name, email, source, at: new Date().toISOString() }));
    return NextResponse.json({ ok: true, provider: "log", readPath });
  }

  try {
    await addContact({ name, email, source, readUrl });
    await sendEbookEmail({ name, email, source, readUrl });
    return NextResponse.json({ ok: true, provider: "brevo", readPath });
  } catch (err) {
    // O e-mail falhou, mas a leitora não perde o acesso: o link aparece na tela.
    console.error("[lead] brevo falhou", JSON.stringify({ email, source }), err);
    console.log("[lead]", JSON.stringify({ name, email, source, at: new Date().toISOString() }));
    return NextResponse.json({ ok: true, provider: "log", readPath });
  }
}

function siteOrigin(req: Request): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const url = new URL(req.url);
  const host = req.headers.get("x-forwarded-host") ?? url.host;
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${host}`;
}
