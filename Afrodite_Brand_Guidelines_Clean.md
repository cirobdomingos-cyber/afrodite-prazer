# Afrodite, prazer — Brand Guidelines for Website

> **Purpose of this document:** Provide all brand identity details needed to design and build a website skeleton. Products will be added later.

---

## 1. Brand Overview

- **Name:** Afrodite, prazer.
- **Tagline:** "Onde o prazer é liberdade."
- **Subtitle:** Um espaço para conversa, descoberta e autocuidado íntimo feminino — no seu ritmo, no seu silêncio.
- **Category:** Intimate self-care for women (curated products + content)
- **Location:** Curitiba, PR — Brazil
- **Language:** Portuguese (BR)
- **Instagram:** @afrodite.prazer

---

## 2. Manifesto

> Afrodite nasceu do mar. Da espuma. Do silêncio. Daquilo que floresce sem pedir permissão.
>
> E talvez o prazer feminino seja assim também — coisa que floresce no tempo dela, não na pressa de ninguém.
>
> Prazer também é saúde. É presença. É intimidade consigo mesma. Não existe certo ou errado no tempo do desejo — existe escuta, descoberta, confiança.
>
> **O essencial não precisa gritar.**

---

## 3. Essence

| Element | Description |
|---------|-------------|
| **Propósito** | Criar um espaço seguro, leve e acolhedor onde mulheres possam conversar sobre prazer, intimidade e autocuidado de forma honesta e sem vergonha. |
| **Missão** | Inspirar mulheres a se conectarem com o próprio corpo — pelo autocuidado, pela descoberta, pela conversa natural sobre prazer feminino. |
| **Visão** | Ser referência em autocuidado íntimo feminino no Brasil — transformando como mulheres se relacionam com prazer, corpo e bem-estar. |
| **Posicionamento** | A curadoria de produtos existe como extensão da experiência, nunca como o centro dela. Afrodite transforma conversa íntima em descoberta. |

### Values
1. **Força** — Na mulher e no autoconhecimento.
2. **Respeito** — Cada uma tem seu tempo e seus limites.
3. **Intimidade** — Consigo mesma — caminho do autoconhecimento.
4. **Conhecimento** — Conhecer o próprio corpo é liberdade.
5. **Solitude** — Pausa, silêncio, presença consigo.
6. **Feminilidade** — A beleza de ser quem somos.

---

## 4. Personality & Archetypes

### Archetypes
- **Primary — A Amante:** Sensorial, divertida em registro sutil, conectada ao prazer e à beleza. Convida sem performar — propõe sem prometer.
- **Secondary — A Cuidadora:** Acolhedora, delicada, segura. Escuta antes de falar — sustenta a mulher no tempo dela, sem julgamento, sem pressa.

### Brand IS:
elegante · sensorial · inteligente · leve · divertida · próxima · cultural · acolhedora · feminina · íntima · sofisticada · calma

### Brand IS NOT:
vulgar · agressiva · explícita · apelativa · performática · exagerada

---

## 5. Color Palette

### CSS Custom Properties

```css
:root {
  --verde:      #14271C;   /* verde mata — PRIMARY (50% usage, hero, cover, institutional bg) */
  --botanico:   #1F3A2A;   /* verde botânico — secondary */
  --sage:       #7E8B6F;   /* sage — neutral/vegetal */
  --ouro:       #B8862E;   /* ouro velho — highlight/accent */
  --terracota:  #B86A4E;   /* terracota suave — warm accent */
  --vinho:      #5C1E27;   /* vinho — accent */
  --roxo:       #3A1E3A;   /* roxo escuro — intimate/discovery content */
  --creme:      #F2EAD5;   /* papel creme — reading background */
  --creme-2:    #F8F1DD;   /* creme 2 */
  --tinta:      #1A1410;   /* tinta — text on light bg */
  --osso:       #E8DEC4;   /* off-white */
}
```

### Color Hierarchy Rules
- **Verde mata** dominates: hero, cover, institutional backgrounds
- **Creme/papel** sustains long reading
- **Warm accents (ouro, terracota, vinho)** appear at specific points: eyebrows, keywords, details
- **Roxo** is reserved for intimate content: discovery, rituals, secondary manifesto
- Page body background: `#0A0F0B` (very dark green-black)

### DON'Ts
- No saturated gradients
- No pink, no pure black, no cold blue
- Verde is never an accent — always base/protagonist
- Don't mix two warm accents in the same piece — pick one and let it breathe

---

## 6. Typography

### Font Families (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
```

| Role | Font | Weight/Style | Size Range | Usage |
|------|------|-------------|------------|-------|
| **Display/Brand** | Cormorant Garamond | 300 italic, 400 | 48–170px | Brand name, titles, highlights |
| **Subtitle** | Cormorant Garamond | 400, italic 400 | 22–48px | Support phrases, quotes |
| **Body/UI** | Poppins | 300, 400, 500, 600 | 12–18px | Text, labels, UI, captions |

### Typographic Rules
- Cormorant Garamond italic for keywords/emotional words
- Poppins for everything functional
- No third font ever
- Labels/eyebrows: Poppins 10.5px, weight 500, letter-spacing 0.28em, uppercase

---

## 7. Voice & Language

### How the brand speaks:
- "Onde o desejo encontra o cuidado."
- "Prazer também é presença."
- "Descubra no seu ritmo."
- "O essencial não precisa gritar."
- "Intimidade também é autocuidado."

### How the brand NEVER speaks:
- "Liberte a deusa interior."
- "Apimente a relação."
- "Promoção quente, imperdível."
- "Sexo selvagem."
- "Surpreenda seu parceiro."

### Tone Rules
- Speaks like a friend who understands the subject — intimate, sensorial, poetic
- Addresses the reader as "você" (informal)
- Short sentences
- Never vulgar, never explicit, never overly promotional

### Lexicon (USE):
descoberta · cuidado · intimidade · desejo · toque · pele · presença · liberdade · feminino · ritual · calma · experiência

### Lexicon (AVOID):
potente · explosivo · sexo selvagem · imperdível · promoção quente · apimentar

---

## 8. Logo / Symbol

- **Icon:** A scallop shell (concha) — SVG line art, minimalist
- **Signature format:** Shell icon + "Afrodite," (Cormorant Garamond 300) + "prazer." (Cormorant Garamond italic 400, gold color)
- **Minimum size:** 28mm
- **Clear space:** Equal to the shell's height
- The shell is always discreet, symmetrical, accompanied by the italic name

---

## 9. Design Principles for the Website

Based on the brand book's layout style:

- **Layout:** Clean, generous whitespace, max-width ~1080px
- **Backgrounds:** Alternate between dark (verde) and light (creme) sections
- **Borders:** Subtle 0.5px borders, low opacity, as dividers
- **Opacity patterns:** Use `color-mix()` or opacity for muted secondary text
- **Imagery mood:** Warm, intimate, soft lighting, botanical references, feminine without being cliché
- **Grid:** 2–3 columns on desktop, single column on mobile
- **Responsive:** Graceful collapse to single column below 760px
- **Animation:** Minimal — elegance, not flashiness

---

## 10. Website Sections (Suggested Skeleton)

1. **Hero/Cover** — Brand name + tagline + shell icon, dark verde bg
2. **About/Manifesto** — The brand story, dark bg with serif text
3. **Values/Essence** — Purpose, mission, vision, values grid, cream bg
4. **Products** (placeholder) — Will be added later as a curated catalog
5. **Ritual/Blog** — Content section for intimate self-care tips (roxo bg option)
6. **Contact/Footer** — Instagram, location, minimal info

---

## 11. Social Media Bio (Reference)

```
Onde o prazer é liberdade.
Autocuidado íntimo feminino,
no seu ritmo, no seu silêncio.
◐ Loja on-line · em breve
◑ Representante @a_sos_oficial
```

---

## 12. Shell SVG (Inline Symbol)

```svg
<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <!-- shell body -->
  <path d="M 20 5.5 Q 13.5 5.5, 9.5 8.5 Q 5 13, 4.5 21 Q 4.3 26.5, 6 30.5 Q 7 30, 7.6 31 Q 8.6 30, 9.4 31 Q 10.4 30, 11.2 31 Q 12.2 30, 13 31 Q 14 30, 14.8 31.2 Q 15.8 30, 16.6 31.4 Q 17.6 30, 18.4 31.5 Q 19.4 30, 20 31.6 Q 20.6 30, 21.6 31.5 Q 22.4 30, 23.4 31.4 Q 24.2 30, 25.2 31.2 Q 26 30, 27 31 Q 27.8 30, 28.8 31 Q 29.6 30, 30.6 31 Q 31.4 30, 32.4 31 Q 33 30, 34 30.5 Q 35.7 26.5, 35.5 21 Q 35 13, 30.5 8.5 Q 26.5 5.5, 20 5.5 Z" />
  <!-- ribs radiating from hinge -->
  <path d="M 20 6.2 L 7.4 29.5" />
  <path d="M 20 6.2 L 10.5 30.4" />
  <path d="M 20 6.2 L 13.5 30.9" />
  <path d="M 20 6.2 L 16.6 31.3" />
  <path d="M 20 6.2 L 20 31.5" stroke-width="1.1" />
  <path d="M 20 6.2 L 23.4 31.3" />
  <path d="M 20 6.2 L 26.5 30.9" />
  <path d="M 20 6.2 L 29.5 30.4" />
  <path d="M 20 6.2 L 32.6 29.5" />
  <!-- lighter intermediate ribs -->
  <path d="M 20 6.5 L 9 27" opacity=".5" />
  <path d="M 20 6.5 L 12 29" opacity=".5" />
  <path d="M 20 6.5 L 15 30.5" opacity=".5" />
  <path d="M 20 6.5 L 18.3 31.2" opacity=".5" />
  <path d="M 20 6.5 L 21.7 31.2" opacity=".5" />
  <path d="M 20 6.5 L 25 30.5" opacity=".5" />
  <path d="M 20 6.5 L 28 29" opacity=".5" />
  <path d="M 20 6.5 L 31 27" opacity=".5" />
  <!-- hinge / ear -->
  <path d="M 16 7 Q 20 4, 24 7" />
  <path d="M 17.5 6.2 Q 20 5.4, 22.5 6.2" opacity=".6" />
</svg>
```

---

*End of brand guidelines. Products and catalog data to be added in a separate phase.*
