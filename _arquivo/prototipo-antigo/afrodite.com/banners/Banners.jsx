/* ============================================================
 * Afrodite, prazer. — Componentes dos banners (exploração)
 * 3 direções × 3 banners. Exporta para window.
 * ============================================================ */
const { createElement: h } = React;

/* ---- concha (selo da marca) ---- */
const SHELL_OUTLINE = "M 20 5.5 Q 13.5 5.5, 9.5 8.5 Q 5 13, 4.5 21 Q 4.3 26.5, 6 30.5 Q 7 30, 7.6 31 Q 8.6 30, 9.4 31 Q 10.4 30, 11.2 31 Q 12.2 30, 13 31 Q 14 30, 14.8 31.2 Q 15.8 30, 16.6 31.4 Q 17.6 30, 18.4 31.5 Q 19.4 30, 20 31.6 Q 20.6 30, 21.6 31.5 Q 22.4 30, 23.4 31.4 Q 24.2 30, 25.2 31.2 Q 26 30, 27 31 Q 27.8 30, 28.8 31 Q 29.6 30, 30.6 31 Q 31.4 30, 32.4 31 Q 33 30, 34 30.5 Q 35.7 26.5, 35.5 21 Q 35 13, 30.5 8.5 Q 26.5 5.5, 20 5.5 Z";
const SHELL_RIBS = ["M 20 6.2 L 7.4 29.5","M 20 6.2 L 10.5 30.4","M 20 6.2 L 13.5 30.9","M 20 6.2 L 16.6 31.3","M 20 6.2 L 20 31.5","M 20 6.2 L 23.4 31.3","M 20 6.2 L 26.5 30.9","M 20 6.2 L 29.5 30.4","M 20 6.2 L 32.6 29.5"];
function Shell({ size = 30, stroke = "currentColor", className }) {
  return h("svg", { className, width: size, height: size, viewBox: "0 0 40 40", fill: "none", stroke, strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
    h("path", { d: SHELL_OUTLINE }),
    SHELL_RIBS.map((d, i) => h("path", { key: i, d })),
    h("path", { d: "M 16 7 Q 20 4, 24 7" })
  );
}

/* ---- ícones de pagamento (genéricos, não-marca) ---- */
function PixIco() {
  return h("svg", { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round", "aria-hidden": true },
    h("path", { d: "M24 6 L42 24 L24 42 L6 24 Z" }),
    h("path", { d: "M24 16 L32 24 L24 32 L16 24 Z", fill: "currentColor", stroke: "none", opacity: 0.9 })
  );
}
function CardIco() {
  return h("svg", { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
    h("rect", { x: 5, y: 11, width: 38, height: 26, rx: 4 }),
    h("path", { d: "M5 19 H43" }),
    h("path", { d: "M11 30 H22" })
  );
}

/* ---- bloco de promo 20%/15% ---- */
function PromoBlock({ tone = "on-dark", compact }) {
  const row = (Ico, pct, tag) =>
    h("div", { className: "promo-row" },
      h("span", { className: "promo-ico" }, h(Ico)),
      h("div", { className: "promo-figure" },
        h("span", { className: "promo-pct" }, pct),
        h("span", { className: "promo-off" }, "OFF"),
        h("span", { className: "promo-tag" }, tag)
      )
    );
  return h("div", { className: "promo-block " + tone },
    row(PixIco, "20%", "no Pix"),
    h("div", { className: "promo-divider" }),
    row(CardIco, "15%", "no cartão")
  );
}

/* ---- mockup do ebook ---- */
function Ebook({ style }) {
  return h("div", { className: "ebook", style },
    h("span", { className: "moldura" }),
    h("span", { className: "eb-kicker" }, "Afrodite · Guia gratuito"),
    h("h4", { className: "eb-title" }, "As 7 etapas"),
    h("p", { className: "eb-foot" }, "do autoconhecimento")
  );
}

/* cluster de produtos */
function Cluster({ items }) {
  return h("div", { className: "prod-cluster", style: { display: "flex", alignItems: "flex-end", justifyContent: "center", height: "100%" } },
    items.map((it, i) => h("img", {
      key: i, src: it.src, alt: "",
      style: { height: it.h + "px", marginLeft: i === 0 ? 0 : (it.ml || -18) + "px", zIndex: it.z || 1, transform: it.t || "none" }
    }))
  );
}

const EYEBROW = (txt, light) => h("p", { className: "bn-eyebrow" + (light ? " on-light" : "") }, h("span", { className: "tick" }), txt);
const CTA = (label, cls) => h("span", { className: "bn-cta " + (cls || "") }, label, h("span", { className: "arw" }, "→"));

/* ============================================================
 *  BANNER 1 — GUIA "As 7 etapas"
 * ============================================================ */
function GuiaEditorial({ theme = "", hideFrame } = {}) {
  return h("div", { className: ("bn bn--editorial " + theme + (hideFrame ? " no-frame" : "")).trim() },
    h("div", { className: "frame" }),
    h("div", { className: "art" }, h("img", { src: "../images/sobre-afrodite.jpg", alt: "" })),
    h("div", { className: "copy" },
      EYEBROW("Guia gratuito"),
      h("h2", { className: "bn-title" }, "As 7 etapas do", h("br"), "autoconhecimento"),
      h("p", { className: "bn-sub" }, "Um mapa honesto para começar no seu ritmo."),
      h("div", { style: { display: "flex", alignItems: "center", gap: "18px", marginTop: "6px" } },
        CTA("Baixar agora"),
        h("span", { className: "bn-free" }, "Grátis")
      )
    ),
    h(Ebook, { style: { position: "absolute", right: "80px", bottom: "34px", zIndex: 4, transform: "rotate(-5deg)", width: "146px" } })
  );
}
function GuiaOuro() {
  return h("div", { className: "bn bn--ouro" },
    h("div", { className: "rule-frame" }),
    h("div", { className: "inner" },
      h("div", { className: "left" },
        EYEBROW("Guia gratuito · Grátis"),
        h("h2", { className: "bn-title" }, "As ", h("span", { className: "gold" }, "sete"), " etapas do autoconhecimento"),
        h("p", { className: "bn-sub" }, "Um mapa honesto para começar no seu ritmo."),
        h("div", { style: { marginTop: "8px" } }, CTA("Baixar agora"))
      ),
      h("div", { className: "right", style: { borderLeft: "none", paddingLeft: "0", alignItems: "center" } },
        h("div", { className: "bn-numeral" }, "7", h("small", null, "etapas"))
      )
    )
  );
}
function GuiaVitrine() {
  return h("div", { className: "bn bn--vitrine" },
    h("div", { className: "copy" },
      EYEBROW("Guia gratuito", true),
      h("h2", { className: "bn-title" }, "As 7 etapas do", h("br"), "autoconhecimento"),
      h("p", { className: "bn-sub" }, "Um mapa honesto para começar no seu ritmo."),
      h("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" } },
        CTA("Baixar agora"),
        h("span", { className: "bn-free" }, "Grátis")
      )
    ),
    h("div", { className: "stage" },
      h(Ebook, { style: { width: "210px", transform: "rotate(-6deg)" } })
    )
  );
}

/* ============================================================
 *  BANNER 2 — CURADORIA
 * ============================================================ */
function CuradoriaEditorial({ theme = "", hideFrame } = {}) {
  return h("div", { className: ("bn bn--editorial " + theme + (hideFrame ? " no-frame" : "")).trim() },
    h("div", { className: "frame" }),
    h("div", { className: "art" }, h("img", { src: "../ebook/img/v01.jpg", alt: "", style: { objectPosition: "50% 18%" } })),
    h("div", { className: "copy" },
      EYEBROW("A curadoria"),
      h("h2", { className: "bn-title" }, "Escolhido a dedo,", h("br"), "com critério"),
      h("p", { className: "bn-sub" }, "Saúde íntima, prazer e autoconhecimento — sem promessa exagerada."),
      h("div", { style: { marginTop: "6px" } }, CTA("Ver curadoria"))
    )
  );
}
function CuradoriaOuro() {
  const brands = ["Dermosex", "Olove", "Go Vibe", "Sweet Vibe", "Feminist"];
  return h("div", { className: "bn bn--ouro" },
    h("div", { className: "rule-frame" }),
    h("div", { className: "inner" },
      h("div", { className: "left" },
        EYEBROW("A curadoria"),
        h("h2", { className: "bn-title" }, "Curadoria, ", h("span", { className: "gold" }, "não vitrine")),
        h("p", { className: "bn-sub" }, "Cada produto escolhido pelo que entrega — e pelo que evita prometer."),
        h("div", { style: { marginTop: "8px" } }, CTA("Ver curadoria"))
      ),
      h("div", { className: "right" },
        h("p", { style: { fontFamily: "var(--sans)", fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ouro-soft)", margin: "0 0 4px" } }, "Marcas"),
        brands.map((b, i) => h("p", { key: i, style: { fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "20px", margin: "3px 0", color: "var(--osso)" } }, b))
      )
    )
  );
}
function CuradoriaVitrine() {
  return h("div", { className: "bn bn--vitrine" },
    h("div", { className: "copy" },
      EYEBROW("A curadoria", true),
      h("h2", { className: "bn-title" }, "Escolhido a dedo,", h("br"), "com critério"),
      h("p", { className: "bn-sub" }, "Saúde íntima, prazer e autoconhecimento."),
      h("div", { style: { marginTop: "4px" } }, CTA("Ver curadoria"))
    ),
    h("div", { className: "stage" },
      h(Cluster, { items: [
        { src: "../products/LV021_hero.png", h: 150, z: 1 },
        { src: "../products/IA362_hero.png", h: 210, z: 3, ml: -26 },
        { src: "../products/LV009_hero.png", h: 168, z: 2, ml: -22 },
        { src: "../products/DS009_hero.png", h: 120, z: 4, ml: -20 }
      ] })
    )
  );
}

/* ============================================================
 *  BANNER 3 — DIA DOS NAMORADOS (promo do site)
 * ============================================================ */
function NamoradosEditorial({ theme = "wine", hideFrame } = {}) {
  return h("div", { className: ("bn bn--editorial " + theme + (hideFrame ? " no-frame" : "")).trim() },
    h("div", { className: "frame" }),
    h("div", { className: "art" }, h("img", { src: "../images/namorados-casal.jpg", alt: "", style: { objectPosition: "50% 34%" } })),
    h("div", { className: "copy", style: { width: "64%" } },
      EYEBROW("Edição Dia dos Namorados"),
      h("h2", { className: "bn-title", style: { fontSize: "44px" } }, "Promoção em", h("br"), "todo o site"),
      h("div", { style: { display: "flex", alignItems: "center", gap: "30px", marginTop: "4px" } },
        h(PromoBlock, { tone: "on-dark" }),
        h("div", { style: { display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start", whiteSpace: "nowrap" } },
          h("span", { className: "bn-free" }, "até 12 jun"),
          CTA("Aproveitar agora")
        )
      )
    )
  );
}
function NamoradosOuro() {
  return h("div", { className: "bn bn--ouro", style: { background: "linear-gradient(150deg, #5A2030 0%, #2A1330 72%)" } },
    h("div", { className: "rule-frame" }),
    h("div", { className: "inner" },
      h("div", { className: "left" },
        EYEBROW("Edição Dia dos Namorados"),
        h("h2", { className: "bn-title" }, "Promoção em ", h("span", { className: "gold" }, "todo o site")),
        h("p", { className: "bn-sub" }, "Para presentear o desejo — válido até 12 de junho."),
        h("div", { style: { marginTop: "8px" } }, CTA("Aproveitar agora"))
      ),
      h("div", { className: "right" },
        h(PromoBlock, { tone: "on-dark" })
      )
    )
  );
}
function NamoradosVitrine() {
  return h("div", { className: "bn bn--vitrine" },
    h("div", { className: "copy", style: { width: "58%" } },
      EYEBROW("Edição Dia dos Namorados", true),
      h("h2", { className: "bn-title", style: { fontSize: "42px" } }, "Promoção em", h("br"), "todo o site"),
      h("div", { style: { display: "flex", alignItems: "center", gap: "26px", marginTop: "2px" } },
        h(PromoBlock, { tone: "on-light" }),
        h("div", { style: { display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" } },
          h("span", { className: "bn-free" }, "até 12 jun"),
          CTA("Aproveitar agora")
        )
      )
    ),
    h("div", { className: "stage", style: { width: "46%" } },
      h(Cluster, { items: [
        { src: "../products/LV021_hero.png", h: 148, z: 1 },
        { src: "../products/IA406_hero.png", h: 214, z: 3, ml: -28 },
        { src: "../products/LV009_hero.png", h: 166, z: 2, ml: -22 },
        { src: "../products/LV017_hero.png", h: 122, z: 4, ml: -18 }
      ] })
    )
  );
}

Object.assign(window, {
  GuiaEditorial, GuiaOuro, GuiaVitrine,
  CuradoriaEditorial, CuradoriaOuro, CuradoriaVitrine,
  NamoradosEditorial, NamoradosOuro, NamoradosVitrine
});
