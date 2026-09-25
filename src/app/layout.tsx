import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import Analytics from "@/components/Analytics";
import { SITE_NAME, SITE_URL, jsonLd, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
});

const DESCRIPTION =
  "Curadoria de bem-estar íntimo para mulheres: cuidado íntimo, lubrificantes, óleos e vibradores escolhidos com critério, guia gratuito de pompoar e entrega discreta.";

// Códigos de verificação do Google Search Console e do Pinterest vêm do Railway,
// para não precisar mexer no código quando forem gerados.
const verificationOther: Record<string, string> = {};
if (process.env.PINTEREST_DOMAIN_VERIFY) verificationOther["p:domain_verify"] = process.env.PINTEREST_DOMAIN_VERIFY;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Afrodite, prazer. · Curadoria de bem-estar íntimo para mulheres",
    template: "%s · Afrodite, prazer.",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Afrodite, prazer. · Curadoria de bem-estar íntimo para mulheres",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: verificationOther,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF3E4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${montserrat.variable} ${parisienne.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd()) }} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
