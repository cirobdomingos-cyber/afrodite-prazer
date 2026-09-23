import Script from "next/script";
import CookieBanner from "./CookieBanner";
import ProductClickTracker from "./ProductClickTracker";

const CONSENT_KEY = "afrodite-consent"; // mesmo nome usado em CookieBanner.tsx

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      {/* Consent Mode v2: nada de cookies até a visitante aceitar (LGPD). */}
      <Script id="ga4-consent" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var granted = false;
try { granted = localStorage.getItem('${CONSENT_KEY}') === 'granted'; } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: granted ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true });`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <CookieBanner />
      <ProductClickTracker />
    </>
  );
}
