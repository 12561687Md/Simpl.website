import Script from "next/script";

/**
 * Google Analytics 4 + Google Tag Manager, env-gated. Set the IDs in Vercel
 * (Project → Settings → Environment Variables) and redeploy; nothing renders
 * until they're present, so this is safe to ship now:
 *   NEXT_PUBLIC_GA_ID   = G-XXXXXXXXXX   (GA4 Measurement ID)
 *   NEXT_PUBLIC_GTM_ID  = GTM-XXXXXXX    (optional, Tag Manager container)
 * Use GA4 alone, or route everything through GTM, your call.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTags() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
    </>
  );
}
