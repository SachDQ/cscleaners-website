import Script from "next/script";

/**
 * Loads ad-platform tracking scripts based on which env vars are set.
 * Place once near the end of <body> in app/layout.tsx.
 *
 * Set in Cloudflare Pages → Settings → Environment variables (Production + Preview):
 *   NEXT_PUBLIC_META_PIXEL_ID         e.g. 1234567890123456
 *   NEXT_PUBLIC_GOOGLE_ADS_ID         e.g. AW-1234567890
 *   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL e.g. AbC-D_eFGhIj1Kl2MnOp3
 *   NEXT_PUBLIC_LINKEDIN_PARTNER_ID   e.g. 1234567
 *   NEXT_PUBLIC_TIKTOK_PIXEL_ID       e.g. CXXXXXXX...
 */
export default function AdPixels() {
  const metaPixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleAds = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <>
      {/* Meta Pixel */}
      {metaPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixel}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixel}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Ads */}
      {googleAds && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAds}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAds}');
            `}
          </Script>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedIn && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedIn}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}

      {/* TikTok Pixel */}
      {tiktok && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tiktok}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
