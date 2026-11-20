/**
 * JSON-LD builders. Schema sync rule: every page's structured data is built
 * from the same data that renders the page, so a copy change can't leave the
 * schema behind. No Offer/price blocks: prices are said on a call (OFFER_AND_PRICING tiers are Recommended, not Decided).
 */
import { SITE } from "./site";

const ORG_ID = `${SITE.url}/#organization`;
export const AUTHOR_ID = `${SITE.url}/about#matt-dubois`;

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/brand/simpl-logo-1024.png`,
    email: SITE.email,
    telephone: "+1-919-428-9452",
    description:
      "Simpl is the market intelligence partner for commercial building services. We read public records (inspections, violations, certificates, permits, deadlines), rank the buildings that need a client's trade and why, and hand their sales team who to call, with a link to the record behind every reason.",
    address: { "@type": "PostalAddress", addressLocality: "Raleigh", addressRegion: "NC", addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@id": AUTHOR_ID },
    slogan: "We find the buildings that need you, before your competitors know they exist.",
    knowsAbout: ["Market intelligence", "Public records research", "Building inspection records", "Commercial building services", "B2B sales prospecting"],
    contactPoint: { "@type": "ContactPoint", email: SITE.email, telephone: "+1-919-428-9452", contactType: "sales", areaServed: "US" },
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORG_ID },
  };
}

/** The author entity for blog posts and the About page. No image on purpose. */
export function person() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Matt DuBois",
    jobTitle: "Founder",
    worksFor: { "@id": ORG_ID },
    url: `${SITE.url}/about`,
    knowsAbout: ["Market intelligence", "Public records research", "B2B sales prospecting"],
  };
}

export function webPage(opts: { path: string; name: string; description: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type || "WebPage",
    "@id": `${SITE.url}${opts.path}#webpage`,
    url: opts.path === "/" ? SITE.url : `${SITE.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path === "/" ? SITE.url : `${SITE.url}${it.path}`,
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function service(opts: { name: string; path: string; description: string; serviceType: string; audience?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    url: `${SITE.url}${opts.path}`,
    description: opts.description,
    provider: { "@id": ORG_ID, "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: { "@type": "Country", name: "United States" },
    ...(opts.audience ? { audience: { "@type": "BusinessAudience", name: opts.audience } } : {}),
  };
}

export function itemList(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE.url}${it.path}` })),
  };
}

/** Render helper: one <script type="application/ld+json"> with an array. */
export function ldJson(...blocks: object[]) {
  return { __html: JSON.stringify(blocks.length === 1 ? blocks[0] : blocks).replace(/</g, "\\u003c") };
}

/** Standard page metadata: title (absolute), description, canonical, OG. */
export function pageMeta(opts: { path: string; title: string; description: string; noindex?: boolean; images?: { url: string; width: number; height: number; alt: string }[] }) {
  const url = opts.path === "/" ? SITE.url : `${SITE.url}${opts.path}`;
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: "Simpl",
      type: "website" as const,
      images: opts.images || [{ url: "/og", width: 1200, height: 630, alt: "Simpl, the market intelligence partner for commercial building services" }],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
