import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afroditeprazer.com.br"),
  title: {
    default: "Afrodite, prazer.",
    template: "%s · Afrodite, prazer.",
  },
  description:
    "Onde o prazer é liberdade. Curadoria editorial em saúde íntima, prazer feminino e autoconhecimento — no seu ritmo, no seu silêncio.",
  openGraph: {
    title: "Afrodite, prazer.",
    description: "Onde o prazer é liberdade.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${poppins.variable}`}>
      <body>
        <Analytics />
        <BrandHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
