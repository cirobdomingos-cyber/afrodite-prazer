/**
 * Cliente mínimo do Brevo (antigo Sendinblue).
 *
 *   1. addContact — coloca a leitora na lista BREVO_LIST_ID, com os atributos
 *      FIRSTNAME, SOURCE e EBOOK_URL (o link pessoal de leitura, usado pela
 *      sequência de e-mails). FIRSTNAME, SOURCE e EBOOK_URL precisam existir no
 *      Brevo: Contatos → Configurações → Atributos → criar como "Texto".
 *   2. sendEbookEmail — e-mail de boas-vindas com o link de leitura.
 *
 * Os dois lançam erro em falha; reinscrever o mesmo e-mail conta como sucesso.
 */

const API = "https://api.brevo.com/v3";

const SENDER = {
  name: "Afrodite, prazer.",
  email: process.env.BREVO_SENDER_EMAIL ?? "contato@afroditeprazer.com.br",
};

// O remetente não tem caixa de entrada: respostas vão para BREVO_REPLY_TO (se definido).
const REPLY_TO = process.env.BREVO_REPLY_TO
  ? { email: process.env.BREVO_REPLY_TO, name: SENDER.name }
  : undefined;

function authHeaders(apiKey: string) {
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  } as const;
}

export type LeadInput = { email: string; name: string; source: string; readUrl: string };

export async function addContact(input: LeadInput) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey || !listId) throw new Error("brevo_not_configured");

  const res = await fetch(`${API}/contacts`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      email: input.email,
      attributes: { FIRSTNAME: input.name, SOURCE: input.source, EBOOK_URL: input.readUrl },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (res.status === 201 || res.status === 204) return { ok: true as const };
  // 400 "Contact already exist" é ok: updateEnabled=true já atualizou o contato.
  const body = await res.text();
  if (res.status === 400 && body.includes("already")) return { ok: true as const };
  throw new Error(`brevo_contact_failed:${res.status}:${body.slice(0, 200)}`);
}

export async function sendEbookEmail(input: LeadInput) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("brevo_not_configured");

  const name = escapeHtml(input.name);
  const url = escapeHtml(input.readUrl);
  // Assunto discreto: aparece na caixa de entrada e na notificação do celular.
  const subject = "Seu guia da Afrodite chegou";
  const html = `
  <div style="background:#F3E2C7; padding:32px 16px;">
    <div style="max-width:540px; margin:0 auto; background:#FBF3E4; border-top:4px solid #581931; padding:36px 32px; font-family:Georgia,'Cormorant Garamond',serif; color:#3D2317;">
      <p style="font-size:24px; font-weight:600; color:#581931; margin:0 0 28px;">
        Afrodite<span style="color:#1A7562;">,</span> prazer.
      </p>
      <h1 style="font-weight:500; font-style:italic; font-size:28px; line-height:1.2; color:#581931; margin:0 0 18px;">
        Bem-vinda, ${name}.
      </h1>
      <p style="font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7; margin:0 0 12px;">
        Seu guia <em>Pompoar, prazer.</em> está pronto pra você — do primeiro “onde fica?”
        ao seu primeiro treino de 7 dias, no seu tempo.
      </p>
      <p style="font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7; margin:0;">
        Guarde este e-mail: o link abaixo é só seu e funciona em qualquer aparelho.
      </p>
      <p style="margin:30px 0;">
        <a href="${url}" style="display:inline-block; padding:14px 30px; border-radius:100px; background:#581931; color:#FBF3E4; font-family:Helvetica,Arial,sans-serif; font-size:12px; font-weight:bold; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none;">
          Começar a ler
        </a>
      </p>
      <p style="font-family:Helvetica,Arial,sans-serif; font-size:12px; line-height:1.7; color:#3D2317; opacity:.7; margin:0;">
        Se o botão não funcionar, copie este endereço no navegador:<br/>
        <span style="word-break:break-all;">${url}</span>
      </p>
      <hr style="border:0; border-top:1px solid rgba(88,25,49,.15); margin:28px 0;"/>
      <p style="font-family:Helvetica,Arial,sans-serif; font-size:11px; line-height:1.7; opacity:.6; margin:0;">
        Você recebeu este e-mail porque pediu o guia no site da Afrodite, prazer.
        Conteúdo adulto, destinado a maiores de 18 anos.
      </p>
    </div>
  </div>`;

  const res = await fetch(`${API}/smtp/email`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({
      sender: SENDER,
      ...(REPLY_TO && { replyTo: REPLY_TO }),
      to: [{ email: input.email, name: input.name }],
      subject,
      htmlContent: html,
    }),
  });

  if (res.status === 201 || res.status === 202) return { ok: true as const };
  const body = await res.text();
  throw new Error(`brevo_send_failed:${res.status}:${body.slice(0, 200)}`);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
