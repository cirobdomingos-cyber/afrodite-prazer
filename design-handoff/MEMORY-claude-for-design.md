# Claude for Design — Playbook

Reusable guide for shipping a brief to Claude for Design and integrating its
output back into a project. Distilled from the Aura full-design pass (2026-05-02)
and the auê visual refresh (2026-05-02, in flight).

---

## What it is

Claude (Anthropic) running inside **Flutterflow's AI design environment**.
Not a separate Anthropic product, not a third-party wrapper. Specialized for
visual/design work with access to a tool system that manipulates a project
filesystem and renders HTML in real time.

## What it produces well

- `design-tokens.css` — full CSS-variable system (colors, typography, spacing,
  motion, component tokens). **Must be asked for explicitly.**
- JSX components, self-contained, with inline styles
- HTML mockups (interactive, single-file, runnable in a browser)
- Markdown spec docs (motion principles, iconography style, component specs)
- **Sophisticated color systems** — uses `oklch()` for category accents (same
  chroma + lightness, varying hue → perceptually uniform contrast)
- Pushes back on hypothesis with reasoning when invited

## What it does NOT produce

- Figma files (does not natively output)
- PNG screenshots as primary deliverable (capable, but not the main format)
- Paid fonts (avoid suggesting Söhne or any commercial type — it'll skip them)
- Custom icon sets at first pass (uses emoji as placeholder, says "replace later")

## Integration quirks to know about

- Components arrive with **hardcoded hex** in inline styles → refactor to
  `var(--token)` on integration so the tokens file stays the single source
  of truth. Skip this and you have hex sprinkled across 5+ component files.
- Returns DiceBear API URLs as avatar source → keep as-is, it's free + free.
- 4-phase celebration animations come specced as separate keyframe phases
  with delays — implement faithfully (they tested the timing).

---

## How to brief it — template

Always include these 10 sections in the brief:

1. **Product context** (one paragraph) — or link to attached one-pager
2. **Audience & cultural context** — who, where, when in their day they use this
3. **Brand personality** — adjectives we want / don't want, one-line positioning
4. **Anti-patterns** — very specific visual tropes we explicitly avoid
5. **Visual direction starting hypothesis** — current palette/type as proposal,
   **explicitly invite push-back** ("treat as hypothesis, not constraint")
6. **Deliverables list** — be specific: tokens, components, screen mockups,
   spec doc. Name the components you need.
7. **Constraints** — mobile-first, accessibility, performance budgets, locale,
   target dimensions (375×812 or 390×844)
8. **Reference inspiration** — sites/apps to pull from + sites/apps to avoid
9. **Output format** — be explicit: "design-tokens.css + JSX + HTML mockups +
   markdown spec doc, in a zip"
10. **Out of scope** — what NOT to redesign. Critical for refreshes of mature
    products.

## What to attach with the brief

- **The brief itself** (paste full text into the conversation)
- **Product context doc** — one-pager or CLAUDE.md from the project
- **Screenshots of current state** — mandatory for refreshes of mature products,
  optional for greenfield
- **Reference to past work** if there is any — "same format as you did for
  project X" works because it shares Anthropic-side training context

## Strategic questions it tends to ask before producing — be ready

After receiving a full brief, Claude for Design typically does an alignment
turn. It will ask 5–8 of these:

- **Color direction** — saturation, hue, replace or keep brand color
- **Light vs dark mode** — primary mode, dual palette, or token-ready only
- **Typography pick** — display + body pairing (always asks about free options)
- **Category/accent treatment** — mono cards or louder per-category color
- **Brand specificity** — how local the visual should signal
- **Scope of THIS turn** — which deliverables to ship now vs defer
- **Variations** — one direction or side-by-side options for atomic choices
- **Anti-patterns specific to your product space** — confirms the carry-overs
  to drop (e.g., wellness coding, fintech sterility, etc.)

Answer each question opinionatedly (not "I don't know"). Better to lock and
adjust than to ask back.

## Default scope cuts (to manage one-turn output size)

When asked "what to prioritize this turn," **always do these:**

- Design tokens (full system, light + dark if doing dark)
- Typography decisions
- 3 key screen mockups
- The most-rendered component for the product (mission card, event card, etc.)
- Primary + secondary button
- Bottom nav (if relevant)
- The hero/conversion components (RSVP, "completei", "follow", etc.)

**Always defer to v2:**

- App icon variants (one logo for the mockup is enough)
- Sample illustrations (emoji or geometric placeholder works for v1)
- Custom iconography set (emoji as stub)
- Avatar treatment beyond DiceBear default

## Free typography it tends to suggest

| Font | Use | Tradeoff |
|---|---|---|
| Inter | Body, ubiquitous | Safe, neutral, "tech-default" |
| Manrope | Display, conservative | Clean but generic |
| Space Grotesk | Display, gamer-modern | Has personality without being fantasy |
| DM Sans | Body, neutral | Slightly warmer than Inter |
| Space Mono | Numeric / mono hero | Distinctive zero glyph (intentional) |
| Bricolage Grotesque | Display, editorial | Eccentric variable, "magazine 2025" |
| Geist | Display + body | Vercel, modern-tech, very 2024+ |

**Avoid suggesting**: Söhne (paid, ~$75 + commercial), Suisse, Graphik (paid),
GT America (paid).

---

## Integration playbook (after output arrives)

Same pattern that worked for Aura (PR #4) and what we're applying to auê:

1. **Branch**: `feat/design-system-integration` off main
2. **Tokens** → `src/styles/design-tokens.css` (the system) + import in `main.jsx`
3. **Fonts** → `index.html` with Google Fonts preconnect + link
4. **Components** → `src/components/` — refactor hardcoded hex to `var(--token)`
5. **Screens** → refactor existing screens to consume new components
6. **Spec doc** → `docs/02-design-handoff.md` — combine README + spec for one
   in-repo source of truth, with provenance line (designer + date + brief link)
7. **`.gitignore`** → add `*.zip` so the handoff archive doesn't leak into git
8. **Build verify** → `npm run build` must pass before commit
9. **PR + merge via gh CLI** (preserve PR shape with `--merge`)
10. **Delete extracted files** from temp location after integration confirmed

Estimated time: 30–90 min depending on surface area. Aura took ~30, auê will
take longer because it has 20+ screens (most won't get touched in this PR).

## "Structure-not-skin" pattern

The most powerful pattern this workflow enables. Scaffold the JSX, state, and
routing **before** the design system exists. When design lands, the only thing
that changes is the visual layer.

Concretely: build screens with placeholder visuals (gradient + system font is
fine) on day 1. When tokens arrive on day 2 or later, swap in components + new
fonts + new tokens. Structure and behavior are unchanged.

**Portfolio signal:** in interviews, this maps to the question "how do you
handle design changes mid-development?" Answer: "I separate structure from
skin from day 1. The screens exist before the design system. When design lands,
I swap the skin. The git history shows the separation explicitly — it's
how I scale frontend work without throwing JSX away."

---

## Track record so far

### Aura (greenfield) — 2026-05-02
- One-pass brief sent with product one-pager + scaffold screenshot
- Designer returned a comprehensive package: tokens + 5 components +
  handoff doc + 3 screen specs
- Used oklch for 8-category accent system (kept this — major upgrade)
- Made deliberate choice: aura counter in Space Mono (NOT Space Grotesk)
- Integration via single PR, ~30 minutes
- Quality verdict: **high**

### auê (visual refresh of mature product) — 2026-05-02 in flight
- Brief sent for visual refresh, NOT product redesign — explicit out-of-scope
  list
- Designer did sharp initial reading: weak hierarchy, "wellness brand" coral,
  chip-soup, dated detail screen
- Asked 7 alignment questions (coral direction, dark mode, typography,
  category color treatment, Curitiba-ness, scope, variations)
- Status: alignment locked, awaiting output

---

## When NOT to use Claude for Design

- **For pure typography or icon-set work** — use a specialized tool, this
  is overkill
- **When you have a working design system already and just need polish** —
  the questions/answer cycle is too heavy for small tweaks
- **If the brief can't be more than a paragraph** — it produces best with
  rich context, not vague directions
- **For print or marketing collateral** — its strength is product UI

---

## Quick checklist before sending

- [ ] Brief covers all 10 sections above
- [ ] Product context doc attached (one-pager or CLAUDE.md)
- [ ] Screenshots attached (mandatory for refreshes)
- [ ] Out-of-scope list is explicit (especially for refreshes)
- [ ] Deliverables list names specific components needed
- [ ] Output format spec asks for `design-tokens.css` by name
- [ ] Brief says "treat current visual as hypothesis, push back with reasoning"
- [ ] Reference inspiration includes both pull-from and avoid lists
