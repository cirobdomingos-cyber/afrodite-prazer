/* ============================================================
 * Afrodite, prazer. — Tweaks (controle do banner)
 * Depende de React + tweaks-panel.jsx
 * ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bannerMax": 380,
  "bannerMobileMax": 300
}/*EDITMODE-END*/;

function AfroditeTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--banner-max", t.bannerMax + "px");
    root.style.setProperty("--banner-mobile-max", t.bannerMobileMax + "px");
  }, [t.bannerMax, t.bannerMobileMax]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Banner" />
      <TweakSlider
        label="Altura no desktop"
        value={t.bannerMax}
        min={280}
        max={680}
        step={10}
        unit="px"
        onChange={(v) => setTweak("bannerMax", v)}
      />
      <TweakSlider
        label="Altura máx. no celular"
        value={t.bannerMobileMax}
        min={180}
        max={460}
        step={10}
        unit="px"
        onChange={(v) => setTweak("bannerMobileMax", v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.getElementById("tweaks-root");
  if (!el) return;
  ReactDOM.createRoot(el).render(<AfroditeTweaks />);
})();
