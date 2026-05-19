/**
 * Minimal Brevo (formerly Sendinblue) client.
 *
 * Two operations:
 *   1. addContact(email, name, listId) — drops the lead into the configured list.
 *   2. sendEbookEmail(email, name, downloadUrl) — fires the confirmation email.
 *
 * Both operations return { ok: true } on success or throw on hard failure.
 * Idempotent: re-subscribing the same email is treated as success.
 */

const API = "https://api.brevo.com/v3";

function authHeaders(apiKey: string) {
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  } as const;
}

export type LeadInput = { email: string; name: string; source: string };

export async function addContact(input: LeadInput) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey || !listId) throw new Error("brevo_not_configured");

  const res = await fetch(`${API}/contacts`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      email: input.email,
      attributes: { FIRSTNAME: input.name, SOURCE: input.source },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (res.status === 201 || res.status === 204) return { ok: true as const };
  // 400 with "Contact already exist" is fine because updateEnabled=true would have updated it.
  const body = await res.text();
  if (res.status === 400 && body.includes("already")) return { ok: true as const };
  throw new Error(`brevo_contact_failed:${res.status}:${body.slice(0, 200)}`);
}

export async function sendEbookEmail(input: LeadInput & { downloadUrl: string }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("brevo_not_configured");

  const subject = "Seu guia — As 7 Etapas do Autoconhecimento Íntimo";
  const html = `
    <div style="font-family: Georgia, 'Cormorant Garamond', serif; max-width: 540px; margin: 0 auto; padding: 32px; background:#F2EAD5; color:#1A1410;">
      <p style="font-style: italic; font-size: 26px; color:#B8862E; margin:0 0 18px;">
        Afrodite, <em style="color:#B8862E;">prazer.</em>
      </p>
      <h1 style="font-weight: 300; font-size: 28px; line-height:1.2; margin:0 0 24px;">Obrigada, ${input.name}.</h1>
      <p style="font-size: 16px; line-height: 1.7;">Seu guia está pronto. Baixe quando quiser — ele é seu, no seu tempo.</p>
      <p style="margin: 32px 0;">
        <a href="${input.downloadUrl}" style="display:inline-block; padding:14px 28px; background:#14271C; color:#E8DEC4; font-family: Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; text-decoration:none;">
          Baixar o guia
        </a>
      </p>
      <p style="font-size: 13px; line-height: 1.7; color:#1A1410; opacity:.7;">
        Se o botão não funcionar, copie este endereço no navegador:<br/>
        <span style="word-break:break-all;">${input.downloadUrl}</span>
      </p>
      <hr style="border:0; border-top:0.5px solid rgba(26,20,16,.25); margin: 32px 0;"/>
      <p style="font-size: 12px; line-height: 1.7; opacity:.65;">
        Você está recebendo este e-mail porque pediu o guia em afroditeprazer.com.br.
      </p>
    </div>`;

  const res = await fetch(`${API}/smtp/email`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      sender: { name: "Afrodite, prazer.", email: "contato@afroditeprazer.com.br" },
      to: [{ email: input.email, name: input.name }],
      subject,
      htmlContent: html,
    }),
  });

  if (res.status === 201 || res.status === 202) return { ok: true as const };
  const body = await res.text();
  throw new Error(`brevo_send_failed:${res.status}:${body.slice(0, 200)}`);
}
