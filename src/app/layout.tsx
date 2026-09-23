import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import Analytics from "@/components/Analytics";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://afroditeprazer.com.br"),
  title: {
    default: "Afrodite, prazer.",
    template: "%s · Afrodite, prazer.",
  },
  description:
    "Curadoria de prazer, intimidade e autocuidado para mulheres — sem pressa, sem julgamento, sem vulgaridade.",
  openGraph: {
    title: "Afrodite, prazer.",
    description: "Curadoria de prazer, intimidade e autocuidado para mulheres.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
