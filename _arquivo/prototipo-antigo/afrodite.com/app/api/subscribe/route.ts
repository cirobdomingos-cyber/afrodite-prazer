import { NextResponse } from "next/server";
import { addContact, sendEbookEmail } from "@/lib/brevo";
import { promises as fs } from "node:fs";
import path from "node:path";

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

  if (name.length < 2) return NextResponse.json({ ok: false, error: "name_required" }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "email_invalid" }, { status: 400 });

  const downloadUrl = absoluteUrl(req, process.env.EBOOK_DOWNLOAD_URL ?? "/ebook/afrodite-prazer-7-etapas.pdf");

  const hasBrevo = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
  if (!hasBrevo) {
    await appendLocalLead({ name, email, source, downloadUrl });
    return NextResponse.json({ ok: true, provider: "local" });
  }

  try {
    await addContact({ name, email, source });
    await sendEbookEmail({ name, email, source, downloadUrl });
    return NextResponse.json({ ok: true, provider: "brevo" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
}

function absoluteUrl(req: Request, pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const origin = new URL(req.url).origin;
  return `${origin}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

async function appendLocalLead(record: { name: string; email: string; source: string; downloadUrl: string }) {
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    const line = JSON.stringify({ ...record, at: new Date().toISOString() }) + "\n";
    await fs.appendFile(path.join(dir, "leads.local.jsonl"), line, "utf8");
  } catch {
    // best-effort dev log
  }
}
