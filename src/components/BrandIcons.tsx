/*
 * Ícones do brand book (página "Ícones"): lua crescente com estrela, estrela de 4 pontas,
 * estrela de 8 pontas e estrela no círculo. Redesenhados em SVG para trocar de cor à vontade.
 */

type IconProps = { size?: number; color?: string; accent?: string; className?: string };

const STAR4 = "M50 4 C53 33 67 47 96 50 C67 53 53 67 50 96 C47 67 33 53 4 50 C33 47 47 33 50 4Z";

function star8Points(): string {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? 46 : 27;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
const STAR8 = star8Points();
const CRESCENT = "M92.31 31.95 A46 46 0 1 1 68.05 7.69 A37 37 0 1 0 92.31 31.95Z";

export function Star4({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={STAR4} fill={color} />
    </svg>
  );
}

export function Star8({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points={STAR8} fill={color} />
    </svg>
  );
}

/** Lua crescente (abertura no alto, à direita) com a estrela no centro. */
export function Crescent({ size = 24, color = "currentColor", accent, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* círculo (50,50,r46) menos círculo (57,43,r37), sem <mask> para funcionar em qualquer contexto */}
      <path d={CRESCENT} fill={color} />
      <path d={STAR4} fill={accent ?? color} transform="translate(33 33) scale(0.34)" />
    </svg>
  );
}

/** Estrela de 4 pontas dentro de um círculo cheio. */
export function StarCircle({ size = 24, color = "currentColor", accent = "#F3E2C7", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill={color} />
      <path d={STAR4} fill={accent} transform="translate(22 22) scale(0.56)" />
    </svg>
  );
}

/** Estrela vazada (contorno duplo), como no brand book. */
export function StarOutline({ size = 24, color = "currentColor", accent = "#F3E2C7", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={STAR4} fill={accent} transform="rotate(45 50 50) scale(0.9) translate(5.5 5.5)" opacity="0.9" />
      <path d={STAR4} fill={color} />
      <path d={STAR4} fill={accent} transform="translate(30 30) scale(0.4)" />
    </svg>
  );
}

export function InstagramIcon({ size = 22, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}
