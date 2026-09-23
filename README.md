# Afrodite, prazer.

Curadoria de prazer, intimidade e autocuidado para mulheres. Este repositório tem o site (página de vendas + curadoria), o guia gratuito com captura de e-mail e o ebook "Pompoar, prazer." (7 etapas de pompoarismo).

Stack: Next.js 14 (App Router) · TypeScript · Brevo (e-mail) · Railway (hospedagem).

## Páginas

| Endereço | O que é |
|---|---|
| `/` | Página de vendas: hero, manifesto e curadoria em 4 seções (30 produtos) |
| `/guia` | Guia gratuito: formulário de nome + e-mail |
| `/guia/ler` | O ebook. Só abre com o link pessoal (`?t=`) ou com o cookie de quem já se cadastrou |
| `POST /api/subscribe` | Cadastra a leitora (Brevo), manda o e-mail de boas-vindas e devolve o link pessoal |

`/as-7-etapas`, `/as-7-etapas.html` e `/produtos` são endereços antigos que redirecionam.

## Onde editar

| O quê | Arquivo |
|---|---|
| Catálogo (produtos, preços, fotos, seções) | `data/catalog.json` |
| Link de afiliada (loja + código) | `src/lib/catalog.ts` |
| Página inicial | `src/app/page.tsx` + `src/app/home.module.css` |
| Guia gratuito | `src/app/guia/page.tsx` + `src/components/LeadForm.tsx` |
| Ebook | `content/ebook/pompoar.html` (fotos em `public/ebook/img/`) |
| E-mail de boas-vindas | `src/lib/brevo.ts` |
| Sequência de e-mails + como ativar o Brevo | `docs/funil/sequencia-de-emails.md` |
| Cores e fontes (brand book) | `src/app/globals.css` |
| Menu e rodapé | `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx` |

## Rodar no computador

Duplo clique em `TESTAR-SITE.cmd`, na pasta de cima. Ou, pelo terminal:

```powershell
npm install
npm run dev   # http://localhost:3000
```

No modo de desenvolvimento, `/guia/ler` abre o ebook sem cadastro. Os cadastros de teste aparecem no terminal como `[lead]`.

Antes de publicar, rode `npm run build`. Ele precisa terminar sem erros.

## Variáveis de ambiente (Railway)

| Variável | Para quê |
|---|---|
| `EBOOK_TOKEN_SECRET` | Assina os links pessoais do ebook. Já configurada; **não trocar**, senão os links antigos param de abrir |
| `BREVO_API_KEY`, `BREVO_LIST_ID` | Cadastro na lista e envio do e-mail de boas-vindas |
| `BREVO_SENDER_EMAIL` | Remetente validado no Brevo (padrão: `contato@afroditeprazer.com.br`) |
| `SITE_URL` | Endereço público usado nos links dos e-mails |
| `EMAIL_SEQUENCE_ACTIVE` | `1` quando a automação do Brevo estiver ativa; o final do ebook passa a anunciar os e-mails |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional) |

Sem o Brevo, o site continua funcionando: a leitora recebe o link na tela e o cadastro fica nos logs do Railway (busque `[lead]`).

## Publicar

O Railway publica automaticamente cada mudança na branch `main`. O fluxo é:

1. criar uma branch;
2. rodar `npm run build`;
3. abrir um pull request;
4. fazer o merge.

## Outras pastas

- `docs/`: configuração de DNS e o funil de e-mails.
- `_arquivo/`: material do protótipo anterior (site antigo, scripts de extração do catálogo, marca antiga). Não é usado pelo site; fica guardado para consulta.
