# Brief — Afrodite Prazer (catalog & advertising tool)

> Treat the visual hypothesis in §5 as a starting point, **not a constraint**.
> Push back with reasoning where you disagree.

---

## 1. Product context

**Afrodite Prazer** is a Brazilian-Portuguese affiliate storefront for adult intimate products.
The owner curates products from a single distributor (A Sós) — 17 sub-brands, ~190 SKUs ranging
from intimate skincare and lubricants through to vibrators and accessories — and re-publishes
them under one coherent brand to:

1. **Browse the catalog** by brand line, category, or use-occasion.
2. **Select a subset of products to advertise** in a given campaign (Instagram, WhatsApp Business,
   Pinterest, TikTok). Selection is a first-class action — every product card has a "select for
   ad" toggle, and the selection tray builds an exportable asset bundle.
3. **Generate ad-ready output** for selected products — image + name + price + tagline, in
   formats sized for IG square / IG story / WhatsApp catalog / portrait poster.

This is **not a print PDF replacement**. It is a web app the owner uses daily to curate ad
campaigns. End buyers eventually land on the storefront via the ads.

The product source data (`data/products.json`) contains: SKU, brand, name, size, price (BRL),
catalog page reference, and **a per-SKU image path** (`primary_image`). 190/190 SKUs have a
matched product photo in `images_by_sku/{SKU}_hero.png`.
Brand-line landing screenshots from the source PDF are in `page-renders/` for visual context
of the *source* aesthetic — which is **deliberately what we are NOT copying**.

## 2. Audience & cultural context

**Primary user (catalog admin, the owner):** a 30–50-year-old Brazilian woman running an
affiliate side-business. Browses on desktop in 30-minute curation sessions, selects 10–30
products per campaign, exports ad assets. Wants the tool to feel professional and stylish so
she enjoys spending time in it.

**Secondary user (end buyer who lands on a public product page from an ad):** Brazilian adults
25–55, mixed gender, browsing on mobile, often late evening. They arrive curious and
slightly cautious — the page must reassure (discreet packaging, secure checkout language)
without being apologetic.

**Locale:** PT-BR primary (all copy). BRL pricing. WhatsApp is a primary channel (so
"adicionar à conversa" / "compartilhar no WhatsApp" affordances matter).

## 3. Brand personality

**Name:** Afrodite Prazer (Aphrodite Pleasure — classical, deliberately mythological).
**Positioning line:** *Prazer não pede licença* (Pleasure doesn't ask permission).

**We are:** confident, sensual, adult, classical, warm, direct, body-positive, unhurried.
**We are not:** clinical, coy, predatory, infantilizing, "naughty wink", apologetic, fitness-bro.

The brand should feel like an upscale apothecary that happens to sell pleasure — not like
a sex shop, not like a pharmacy, not like a fashion brand. Closer to **Aesop × Le Labo × Glossier**
in *posture* (calm, confident, copy-led), but warm and sensual rather than minimalist-cool.

## 4. Anti-patterns (specific tropes to avoid)

- **Pharmacy clinical** — white/blue/green palette, sans-serif on white, "100% safe!" badges.
- **Faux-luxe sex-shop black-and-gold** — Fifty-Shades cliché, predatory, dated.
- **Bubblegum pink everything** — infantilizing, also what the source Sweet Vibe / Olove pages do.
- **Stock-photo "happy couple in bed"** — the source PDF leans hard on this; we replace it
  with object-forward photography or abstract illustration.
- **Coy / nudge-wink copy** — "🌶️ tá quente!", "shh, segredo!". Be direct in adult tone.
- **Censoring the product** — no blurring, no euphemism in product names. Brazilian e-commerce
  rules apply (no explicit nudity), but the products themselves are shown clearly.
- **Wellness-brand coral + cream** — overdone in 2024–2026, also feels sexless here.
- **Influencer-feed grid** — this is a curation tool, not Instagram.

## 5. Visual direction — starting hypothesis (push back if better idea)

- **Palette:** warm earth — terracotta as primary accent (≈ oklch 60% 0.13 40), deep clay
  brown as ink, ivory/bone as surface, dusty rose as secondary, deep wine as "premium" accent.
  Avoid pure black and pure white. Light mode primary; dark mode is "candlelit" not "techy".
- **Type:** serif display + humanist sans body. Hypothesis: **Cormorant Garamond** for display
  (sensual, classical, free) paired with **DM Sans** for body (warm, neutral, free).
  Open to **Bricolage Grotesque** display if you want more 2026-editorial energy.
- **Layout:** generous whitespace, large-block typography for category headers, product
  cards have ivory surface with a single accent-colored thin border on hover. Grid is 2-up
  on mobile, 4-up on desktop, with zero visual noise so the product photo carries the page.
- **Photography treatment:** product photos arrive from many sources with inconsistent
  backgrounds — apply a uniform warm-ivory backdrop wash on every card so the catalog feels
  cohesive even when source photography isn't.
- **Motion:** slow, gravity-led. Card hover lifts ~4px over 240ms ease-out. No bounce, no
  spring overshoot. Selection toggle has a satisfying weighted feel.
- **Voice:** PT-BR. Sentences are short and adult. No exclamation points except in user
  feedback ("Adicionado!" is fine; "Compre agora!" is not).

## 6. Deliverables (this turn)

- `design-tokens.css` — full CSS variable system: colors (light + dark), type scale, spacing,
  radius, shadow, motion. **Required deliverable, called out by name.**
- Markdown `design-spec.md` — palette rationale, type pairing rationale, motion principles,
  voice & tone with PT-BR copy examples, photography treatment spec.
- JSX components (self-contained, accessible, semantic):
  - `BrandHeader` — logo lockup + nav (Catálogo / Curadoria / Exportar)
  - `ProductCard` — image, name, brand-line tag, price (BRL), "Selecionar para anúncio" toggle
  - `ProductGrid` — responsive 2-up mobile / 4-up desktop, with sticky filter bar
  - `FilterBar` — brand-line chips, price range, badges (Lançamento, Promoção, Favorito)
  - `SelectionTray` — bottom-anchored sticky drawer showing N selected items + "Gerar anúncios" CTA
  - `ProductDetail` — hero image, full description, related products, "Compartilhar via WhatsApp" CTA
  - `EmptyState` — for empty filter results and empty selection tray
  - `Button` (primary, secondary, ghost) + `Toggle` + `Chip`
- HTML mockups (single-file, runnable in browser), 390×844 mobile + 1440×900 desktop:
  1. **Brand landing** (`/`) — hero block + brand-line tiles + featured products
  2. **Catalog grid** (`/catalogo`) — full grid with filters and selection tray active
  3. **Product detail** (`/produto/IA465`) — pick one Sensevibe Multi as the hero example
  4. **Curation export** (`/curadoria`) — selected items, ad-format preview cards (IG square /
     IG story / WhatsApp), "Exportar pacote" action

## 7. Constraints

- **Mobile-first.** Every screen designed for 390×844 first, scaled up to 1440×900 desktop.
- **Accessibility:** WCAG AA contrast minimums on all text. Selection toggle reachable by
  keyboard, has visible focus ring. PT-BR `lang="pt-BR"` on root.
- **Performance budget:** no bundled JS framework heavier than React + Tailwind. CSS-only
  animations where possible. Image lazy-load.
- **Locale:** PT-BR copy throughout. BRL prices formatted `R$ 79,80` (comma decimal).
- **Free fonts only.** No paid type (no Söhne, Suisse, Graphik).
- **Adult-content sensitivity:** shop is legally adult-products; copy is adult-direct but
  not explicit/graphic. No nude human imagery in mockups; product photography only.

## 8. Reference inspiration

**Pull from (posture, not pixels):**
- **Aesop** — apothecary calm, copy-led, monochrome restraint with one accent.
- **Le Labo** — typographic confidence, ingredient-forward storytelling.
- **Maude (getmaude.com)** — closest competitor in tone, body-positive sex wellness.
- **Dame (dameproducts.com)** — confident product-forward storefront for the same product space.
- **Glossier** product cards — pink-adjacent but the *card discipline* is the lesson.

**Avoid (do not echo):**
- Romper / Cosmopolitan "spicy listicle" aesthetic.
- Brazilian sex-shop competitors (sexlandia.com, mimoshop.com.br) — generic Bootstrap layouts,
  red-and-black palette, censored thumbnails.
- 50-Shades-of-Grey marketing (black + chrome + chains).
- Wellness coral-and-cream (Recess, Olipop, Hims).

## 9. Output format

**Bundle as a zip** containing:
```
design-tokens.css
design-spec.md
components/
  BrandHeader.jsx
  ProductCard.jsx
  ProductGrid.jsx
  FilterBar.jsx
  SelectionTray.jsx
  ProductDetail.jsx
  EmptyState.jsx
  Button.jsx
  Toggle.jsx
  Chip.jsx
mockups/
  01-landing.html
  02-catalog.html
  03-product-detail.html
  04-curation-export.html
```

JSX components: self-contained, **inline styles using `var(--token)` references** (we will
refactor any hardcoded hex on integration — minimize them at source). HTML mockups: single
file, runnable in browser, can use real product photos by referencing
`https://placehold.co/600x600/EEE3D6/8B4513?text=PROD` placeholders or pulling from the
`images/` folder if convenient.

## 10. Out of scope (do NOT design this turn)

- Checkout flow / payment UI — affiliate model means buyer checks out on distributor's site.
- User accounts / login — admin uses a single passcode-gated route, not a full auth system.
- The ad-asset-export rendering engine itself — only the *preview cards* in the curation
  screen need to be designed, not the actual export pipeline.
- Brand logo final artwork — a wordmark in the chosen display font is enough for v1.
- App icon, favicon variants, marketing site, email templates.
- Admin product-CRUD screens — products are imported from JSON, not edited in-app.
- Dark-mode polish — token-ready dark palette is enough; full dark screens deferred to v2.

---

## Attached for context

- `data/products.json` — full 190-SKU catalog (sku, brand, name, price BRL, page).
- `data/products.csv` — same in spreadsheet form.
- `data/images_manifest.json` — index of 290 product photos by source page.
- `images_by_sku/` — **190 product photos, one per SKU**, named `{SKU}_hero.png`.
  Use `products[i].primary_image` to look up.
- `page-renders/` — selected source-PDF pages showing the brand-line aesthetics we are
  *replacing* (use as anti-reference, not reference).
- `MEMORY-claude-for-design.md` — playbook for how this designer typically works
  (so you can answer in the format the integrator expects).

## Strategic answers (pre-empting the alignment turn)

To save a round-trip, here are opinionated answers to the questions you usually ask:

1. **Color direction** — terracotta primary, full warm earth system. *Not* a single accent
   color — we want a 4-step warm palette that can carry mood across screens.
2. **Light vs dark mode** — light primary, dark token-ready (no full dark mockups this turn).
3. **Typography pick** — Cormorant Garamond display + DM Sans body, both free. Open to
   Bricolage Grotesque display swap if you make the case.
4. **Category accent treatment** — restrained: brand-line chip with hairline accent in one
   warm hue per line (oklch family with same chroma + lightness, varying hue — your usual move).
   Cards stay ivory; the chip is the only signal.
5. **Brand specificity** — Brazilian, but not coded with samba/tropicália visual clichés.
   The Portuguese language and BRL formatting carry the locale; the visual reads as
   "well-traveled Latin sensuality" not "Brazil postcard".
6. **Scope of this turn** — everything in §6, no further cuts. If something has to fall, drop
   the curation-export mockup last.
7. **Variations** — one direction, not side-by-side. We can iterate.
8. **Anti-patterns** — confirmed in §4. Most important to drop: clinical, faux-luxe black,
   bubblegum pink, stock couple photography.
