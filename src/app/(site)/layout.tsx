import BrandHeader from "@/components/BrandHeader";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrandHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
