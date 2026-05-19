# Afrodite, prazer.

Site institucional + catálogo curado — MVP (primeiro mês).
**Onde o prazer é liberdade.**

Stack: Next.js 14 (App Router) · TypeScript · Brevo · Google Analytics 4 · Vercel.

---

## Páginas

| Rota | Função |
|---|---|
| `/` | Home — manifesto + 2 CTAs ("Guia gratuito" / "Curadoria") |
| `/guia` | Landing do ebook *As 7 Etapas do Autoconhecimento Íntimo* + formulário de captura |
| `/produtos` | Catálogo curado — 15-20 SKUs A Sós organizados por necessidade |
| `POST /api/subscribe` | Adiciona contato à lista Brevo e dispara e-mail com link do ebook |

## Rodar localmente

```powershell
npm install
npm run dev
# abre em http://localhost:3000
```

Sem `BREVO_API_KEY`, o formulário registra leads em `data/leads.local.jsonl` (git-ignored) e retorna sucesso, para destravar o dev.

## Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha:

| Variável | Onde obter | Quando precisa |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 → Admin → Data streams | Produção |
| `BREVO_API_KEY` | brevo.com → SMTP & API → API keys | Produção |
| `BREVO_LIST_ID` | brevo.com → Contacts → Lists (numeric ID) | Produção |
| `EBOOK_DOWNLOAD_URL` | Caminho relativo (`/ebook/…pdf`) ou URL absoluta | Sempre |

## Deploy no Vercel

1. Push da branch para o GitHub.
2. Vercel → New Project → importar o repositório.
3. Em **Environment Variables**, adicionar as 4 acima.
4. **Deploy**. Vercel detecta Next.js automaticamente.
5. Em **Settings → Domains**, apontar `afroditeprazer.com.br` (Cecília configura DNS no Registro.br).

## Editar a curadoria sem mexer no código

Tudo vive em [`data/curated.json`](data/curated.json):

- **`sections`** — ordem e títulos das 5 categorias ("Pra começar do zero", etc.).
- **`products`** — cada SKU com `editorial` (Cecília's 2-3 linhas), `affiliate_url` (link de afiliada A Sós com UTMs), `image` (`/products/{SKU}_hero.png`).

Para trocar uma imagem, salve em `public/products/{SKU}_hero.png` e atualize o campo `image`.

Para adicionar um produto: novo objeto em `products[]` + adicione o SKU em `sections[i].skus`.

## Estrutura

```
src/
  app/
    layout.tsx           # fontes, header, footer, GA4
    page.tsx             # /
    guia/page.tsx        # /guia
    produtos/page.tsx    # /produtos
    api/subscribe/route.ts
    globals.css          # design tokens (paleta verde/ouro/creme)
  components/
    BrandHeader.tsx · Footer.tsx · ShellIcon.tsx
    LeadForm.tsx · ProductCard.tsx · CuratedSection.tsx
    Analytics.tsx
  lib/
    analytics.ts · brevo.ts · products.ts

data/
  curated.json           # ÚNICO arquivo que Cecília edita

public/
  products/{SKU}_hero.png   # 15 fotos da curadoria
  ebook/                    # PDF final do guia vai aqui

catalog-source/          # fonte upstream: PDF A Sós + 190 SKUs + scripts de extração
```

## Próximos passos antes do lançamento

- [ ] Cecília entrega o PDF do ebook → drop em `public/ebook/`
- [ ] Cecília substitui o campo `editorial` de cada produto em `data/curated.json`
- [ ] Cecília confirma a URL real de afiliada A Sós (formato e parâmetros) e substitui `affiliate_url`
- [ ] Comprar `afroditeprazer.com.br` no Registro.br
- [ ] Criar projeto Brevo, conta GA4, projeto Vercel
- [ ] Configurar env vars no Vercel
- [ ] Deploy → testar formulário ponta a ponta → testar todos os links de afiliada
- [ ] Verificar duração do cookie A Sós (7/15/30 dias) — anotar para planejamento de campanha
