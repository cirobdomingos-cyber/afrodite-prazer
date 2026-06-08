/* ============================================================
 * Afrodite, prazer. — Renderização + UX
 * Depende de data.js (window.AFRODITE)
 * ============================================================ */
(function () {
  "use strict";
  var D = window.AFRODITE || { banner: { active: false, slides: [] }, sections: [], products: {}, darkMedia: [] };
  var darkSet = {};
  (D.darkMedia || []).forEach(function (s) { darkSet[s] = true; });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function price(n) {
    return "R$ " + Number(n).toFixed(2).replace(".", ",");
  }
  function get(sku) { return D.products[sku]; }

  /* ---------- product card ---------- */
  function cardHTML(p) {
    if (!p) return "";
    var dark = darkSet[p.sku] ? " dark" : "";
    return (
      '<article class="pcard reveal" data-sku="' + esc(p.sku) + '" data-brand="' + esc(p.brand) + '">' +
        '<div class="media' + dark + '">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
        "</div>" +
        '<div class="body">' +
          '<p class="brand">' + esc(p.brand) + "</p>" +
          '<h3 class="name">' + esc(p.name) + "</h3>" +
          '<p class="editorial">' + esc(p.editorial) + "</p>" +
          '<div class="foot">' +
            '<span class="price">' + price(p.price) + "</span>" +
            '<a href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer sponsored" class="cta">' +
              'Comprar <span aria-hidden="true">&rarr;</span>' +
            "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- promo banner (abaixo do cabeçalho, imagem + carrossel) ---------- */
  function renderBanner() {
    var mount = document.getElementById("promo");
    if (!mount) return;
    var b = D.banner || {};
    var slides = (b.slides || []).filter(Boolean);
    if (!b.active || !slides.length) { mount.hidden = true; return; }

    var html = '<div class="banner-inner"><div class="banner-track">';
    slides.forEach(function (s, i) {
      var hasImg = s.img && String(s.img).trim();
      var media = hasImg
        ? '<div class="banner-media" style="background-image:url(\'' + esc(s.img) + '\')"></div>'
        : '<div class="banner-media banner-brand"></div>';
      html +=
        '<' + (s.cta_href ? 'a href="' + esc(s.cta_href) + '"' : "div") + ' class="banner-slide' + (i === 0 ? " active" : "") + (s.theme ? " banner-" + esc(s.theme) : "") + '" data-i="' + i + '">' +
          media +
          '<div class="banner-content">' +
            (s.eyebrow ? '<span class="banner-eyebrow">' + esc(s.eyebrow) + "</span>" : "") +
            '<span class="banner-title">' + esc(s.title || "") + "</span>" +
            (s.subtitle ? '<span class="banner-sub">' + esc(s.subtitle) + "</span>" : "") +
            (s.cta_label ? '<span class="banner-cta">' + esc(s.cta_label) + ' <span aria-hidden="true">&rarr;</span></span>' : "") +
          "</div>" +
        "</" + (s.cta_href ? "a" : "div") + ">";
    });
    html += "</div>"; // .banner-track

    if (slides.length > 1) {
      html +=
        '<button class="banner-arrow prev" aria-label="Anterior"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<button class="banner-arrow next" aria-label="Próximo"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>' +
        '<div class="banner-dots">';
      slides.forEach(function (_, i) { html += '<button class="banner-dot' + (i === 0 ? " active" : "") + '" data-i="' + i + '" aria-label="Quadro ' + (i + 1) + '"></button>'; });
      html += "</div>";
    }
    html += "</div>"; // .banner-inner
    mount.innerHTML = html;
    mount.hidden = false;

    var slideEls = mount.querySelectorAll(".banner-slide");
    var dotEls = mount.querySelectorAll(".banner-dot");
    var cur = 0, timer = null;
    function go(n) {
      slideEls[cur].classList.remove("active");
      if (dotEls[cur]) dotEls[cur].classList.remove("active");
      cur = (n + slideEls.length) % slideEls.length;
      slideEls[cur].classList.add("active");
      if (dotEls[cur]) dotEls[cur].classList.add("active");
    }
    function start() { if (slideEls.length > 1) { stop(); timer = setInterval(function () { go(cur + 1); }, b.autoplay_ms || 5000); } }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dotEls.forEach(function (d) { d.addEventListener("click", function (e) { e.preventDefault(); go(+d.getAttribute("data-i")); start(); }); });
    var prev = mount.querySelector(".banner-arrow.prev");
    var next = mount.querySelector(".banner-arrow.next");
    if (prev) prev.addEventListener("click", function (e) { e.preventDefault(); go(cur - 1); start(); });
    if (next) next.addEventListener("click", function (e) { e.preventDefault(); go(cur + 1); start(); });
    mount.addEventListener("mouseenter", stop);
    mount.addEventListener("mouseleave", start);
    start();
  }

  /* ---------- home: 4 sections, 4 cards each + veja mais ---------- */
  var HOME_THEMES = ["theme-luz", "theme-roxo", "theme-verde", "theme-vinho"];
  var PREVIEW_COUNT = 4;
  function renderHome() {
    var mount = document.getElementById("curated-sections");
    if (!mount) return;
    var html = "";
    D.sections.forEach(function (sec, idx) {
      var theme = sec.homeTheme || HOME_THEMES[idx % HOME_THEMES.length];
      var num = String(idx + 1).padStart(2, "0");
      var preview = sec.skus.slice(0, PREVIEW_COUNT).map(function (sku) { return cardHTML(get(sku)); }).join("");
      var total = sec.skus.length;
      html +=
        '<section id="' + esc(sec.id) + '" class="curated ' + theme + '" data-screen-label="' + num + " " + esc(sec.title) + '">' +
          '<div class="wrap">' +
            '<header class="head reveal">' +
              '<span class="num">' + num + "</span>" +
              "<div>" +
                '<h2 class="title">' + esc(sec.title) + "</h2>" +
                '<p class="subtitle">' + esc(sec.subtitle) + "</p>" +
              "</div>" +
            "</header>" +
            '<div class="grid">' + preview + "</div>" +
            (total > PREVIEW_COUNT
              ? '<div class="seemore reveal"><a class="btn" href="colecao.html?s=' + encodeURIComponent(sec.id) + '">Veja mais &middot; ' + total + " produtos</a></div>"
              : "") +
          "</div>" +
        "</section>";
    });
    mount.innerHTML = html;
  }

  /* ---------- collection page ---------- */
  function renderCollection() {
    var mount = document.getElementById("collection");
    if (!mount) return;
    var params = new URLSearchParams(location.search);
    var id = params.get("s") || (D.sections[0] && D.sections[0].id);
    var idx = D.sections.findIndex(function (s) { return s.id === id; });
    var sec = D.sections[idx];
    if (!sec) { mount.innerHTML = '<div class="wrap"><p>Seção não encontrada.</p></div>'; return; }

    document.title = sec.title + " — Afrodite, prazer.";
    var num = String(idx + 1).padStart(2, "0");
    var themeClass = { luz: "theme-luz", roxo: "theme-roxo", verde: "theme-verde", vinho: "theme-vinho" }[sec.theme] || "theme-luz";
    document.body.classList.add(themeClass);

    var products = sec.skus.map(get).filter(Boolean);
    var brands = []; products.forEach(function (p) { if (brands.indexOf(p.brand) < 0) brands.push(p.brand); });

    var head =
      '<section class="col-hero ' + themeClass + '"><div class="wrap">' +
        '<a class="col-back" href="index.html#' + esc(sec.id) + '"><span aria-hidden="true">&larr;</span> Voltar</a>' +
        '<p class="eyebrow col-eyebrow">' + num + " &middot; " + esc(sec.label || "Curadoria") + "</p>" +
        '<h1 class="col-title">' + esc(sec.title) + "</h1>" +
        '<p class="col-sub">' + esc(sec.subtitle) + "</p>" +
        '<div class="col-tools">' +
          '<div class="col-filters">' +
            '<button class="chip active" data-brand="*">Todos</button>' +
            brands.map(function (b) { return '<button class="chip" data-brand="' + esc(b) + '">' + esc(b) + "</button>"; }).join("") +
          "</div>" +
          '<span class="col-count" id="col-count"></span>' +
        "</div>" +
      "</div></section>";

    var grid = '<section class="' + themeClass + '" style="padding-top:0"><div class="wrap"><div class="col-grid" id="col-grid">' +
      products.map(cardHTML).join("") + "</div></div></section>";

    mount.innerHTML = head + grid;

    var gridEl = document.getElementById("col-grid");
    var countEl = document.getElementById("col-count");
    var chips = mount.querySelectorAll(".chip");
    function update(filter) {
      var shown = 0;
      gridEl.querySelectorAll(".pcard").forEach(function (c) {
        var ok = filter === "*" || c.getAttribute("data-brand") === filter;
        c.style.display = ok ? "" : "none";
        if (ok) shown++;
      });
      countEl.textContent = shown + (shown === 1 ? " produto" : " produtos");
    }
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        ch.classList.add("active");
        update(ch.getAttribute("data-brand"));
      });
    });
    update("*");
    observeReveal();
  }

  /* ---------- UX: scroll reveal ---------- */
  var io;
  function observeReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- UX: scroll spy ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-header .menu a[href^="#"]'));
    if (!links.length) return;
    var map = links.map(function (a) {
      var t = document.getElementById(a.getAttribute("href").slice(1));
      return t ? { a: a, t: t } : null;
    }).filter(Boolean);
    function onScroll() {
      var y = window.scrollY + 140, best = null;
      map.forEach(function (m) { if (m.t.offsetTop <= y) best = m; });
      links.forEach(function (a) { a.classList.remove("active"); });
      if (best) best.a.classList.add("active");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- UX: back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("to-top");
    if (!btn) return;
    function onScroll() { btn.classList.toggle("show", window.scrollY > 700); }
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    onScroll();
  }

  /* ---------- year ---------- */
  function setYear() { var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear(); }

  /* ---------- boot ---------- */
  function boot() {
    renderBanner();
    renderHome();
    renderCollection();
    observeReveal();
    initScrollSpy();
    initBackToTop();
    setYear();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
