/**
 * Thin, safe analytics event helper. Fires to GA4 (gtag) and GTM (dataLayer)
 * when present, and no-ops otherwise, so it is safe to call before any ID is
 * configured (see components/GoogleTags.tsx and NEXT_PUBLIC_GA_ID/GTM_ID). One
 * place for event names so the funnel is measurable the moment a GA4/GTM ID is
 * added in Vercel. Analytics must never throw into the UI.
 */
type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };
  try {
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
  } catch {
    /* never break the UI over an analytics call */
  }
}
