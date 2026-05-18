# Afrodite Prazer — Claude for Design handoff

This folder contains everything you need to send to Claude for Design (Anthropic's Claude
running inside Flutterflow's AI design environment) to get back a full design system + JSX
components + HTML mockups for the Afrodite Prazer affiliate storefront.

## What's in here

| File / folder | What it is | Where it goes |
|---|---|---|
| `00_brief.md` | Full 10-section brief — paste into chat **and** upload as file | Chat body |
| `MEMORY-claude-for-design.md` | The playbook (so the designer knows your delivery format) | Upload as file |
| `data/products.json` | 190 SKUs (sku, brand, name, BRL price, page) | Upload as file |
| `data/products.csv` | Same data, spreadsheet form | Upload (optional) |
| `data/images_manifest.json` | Index of 290 product photos by source page | Upload as file |
| `images_by_sku/` | **190 product photos, one per SKU**, named `{SKU}_hero.png` | Upload a representative subset if asked |
| `images/` | All 290 raw embedded photos by source page (superset, kept for completeness) | Local-only |
| `data/mapping_review.html` | Visual QA page — every SKU + its matched photo | Open in browser to verify |
| `page-renders/` | 14 curated source-PDF pages — **anti-references** (what we are NOT copying) | Upload all |
| `scripts/extract_catalog.py` | Re-runs the PDF→JSON pipeline if the source PDF changes | Local-only |

## How to send it (5-min flow)

1. Open Flutterflow → AI Designer → New chat.
2. **Paste the entire contents of `00_brief.md`** into the first message.
3. Attach (drag-and-drop):
   - `MEMORY-claude-for-design.md`
   - `data/products.json`
   - All files in `page-renders/`
4. Send.
5. The designer will probably ask 5–8 alignment questions (color direction, type pairing,
   etc.). Most are pre-answered at the bottom of `00_brief.md` under **Strategic answers** —
   point to those if it asks anyway.
6. Wait ~10–15 min for the first deliverable bundle.
7. When it returns the zip, follow the **Integration playbook** in
   `MEMORY-claude-for-design.md` to wire it into a Vite/React project.

## Why each file matters

- **`00_brief.md`** is the only file the designer *must* read. Everything else is supporting.
- **`MEMORY-claude-for-design.md`** primes the designer to deliver in the format you can integrate
  (design-tokens.css + JSX + HTML mockups + spec doc, in a zip). Without it you sometimes get
  loose components without a token system.
- **`page-renders/`** are anti-references — the source PDF's brand pages have wildly
  inconsistent visual codes (Olove bubblegum pink, Tantric sepia, Sensevibe sultry brown,
  Sweet Vibe candy pastel). Showing the designer *what we're replacing* is more useful
  than showing reference inspiration alone, because it pins down exactly what cohesion
  problem we're solving.
- **`data/products.json`** lets the designer use real product names and prices in mockups
  instead of Lorem Ipsum. Major polish boost.

## After integration

This catalog is a **living tool** — when A Sós issues a new edition of the source PDF, re-run:

```powershell
$env:PYTHONIOENCODING='utf-8'; py -3.12 scripts/extract_catalog.py
```

…and the products + images update in place. The design system stays untouched (structure-not-skin
pattern from the playbook).

## Open questions to decide on the way

These weren't worth blocking the brief on, but you'll need to answer them before launch:

- **Domain** — afroditeprazer.com.br vs afrodite.shop vs other?
- **Affiliate link mechanism** — does A Sós provide unique referral links per SKU, or are
  we deep-linking with a coupon code?
- **Ad-asset rendering** — server-side image composition (sharp + node-canvas) or client-side
  (html-to-image in the browser)? Affects whether the curation export is a backend job or
  pure-frontend.
- **Image rights** — are we legally clear to reuse A Sós's product photography in our ads,
  or do we need to re-shoot or re-license? (Worth checking the affiliate agreement before
  shipping the ad-export feature.)
