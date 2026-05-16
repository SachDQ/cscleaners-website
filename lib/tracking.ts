/**
 * Client-side ad conversion tracking.
 *
 * Loads when the matching public env var is present, no-ops otherwise:
 *   - NEXT_PUBLIC_META_PIXEL_ID         → Meta (Facebook/Instagram) Pixel
 *   - NEXT_PUBLIC_GOOGLE_ADS_ID         → Google Ads Conversion ID (AW-XXXXXXX)
 *   - NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL → Google Ads conversion label for "lead" event
 *   - NEXT_PUBLIC_LINKEDIN_PARTNER_ID   → LinkedIn Insight Tag partner ID
 *   - NEXT_PUBLIC_TIKTOK_PIXEL_ID       → TikTok Pixel (optional)
 *
 * Call trackLeadConversion() after a successful form submit.
 */

type LeadType = "business_lead" | "contractor_application" | "residential_quote";

interface MetaFbq {
  (action: "track" | "trackCustom", event: string, params?: Record<string, unknown>): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
  disablePushState?: boolean;
}
interface Gtag {
  (...args: unknown[]): void;
}
interface Lintrk {
  (action: string, params: Record<string, unknown>): void;
}
interface Ttq {
  track(event: string, params?: Record<string, unknown>): void;
  page(): void;
}

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
    gtag?: Gtag;
    dataLayer?: unknown[];
    lintrk?: Lintrk;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    ttq?: Ttq;
  }
}

export function trackLeadConversion(
  type: LeadType,
  extra: Record<string, string | undefined> = {}
): void {
  if (typeof window === "undefined") return;

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_category: type,
      ...extra,
    });
  }

  // Google Ads conversion
  const gAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (window.gtag && gAdsId && gAdsLabel) {
    window.gtag("event", "conversion", {
      send_to: `${gAdsId}/${gAdsLabel}`,
      event_callback: undefined,
      conversion_type: type,
    });
  }

  // GA4 (uses the same gtag if NEXT_PUBLIC_GA_ID is set)
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      lead_type: type,
      ...extra,
    });
  }

  // LinkedIn Insight Tag
  if (window.lintrk) {
    // 0 is the standard "Lead" conversion ID — replace with your LinkedIn conversion ID via env if you set one up
    const conversionId = process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID;
    if (conversionId) {
      window.lintrk("track", { conversion_id: conversionId });
    }
  }

  // TikTok Pixel
  if (window.ttq) {
    window.ttq.track("SubmitForm", { content_type: type });
  }
}
