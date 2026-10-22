/**
 * JSON-LD builders. Schema sync rule: every page's structured data is built
 * from the same data that renders the page, so a copy change can't leave the
 * schema behind. No Offer/price blocks: prices are off the site (2026-10-22).
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
      "Simpl is a client acquisition partner for B2B companies. We build each client an Account Engine: a private, branded portal that reads the public record every night and tells their sales team which accounts to call, why now and who decides, with a source link on every fact. We also run local SEO and build websites for service businesses.",
    address: { "@type": "PostalAddress", addressLocality: "Raleigh", addressRegion: "NC", addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    founder: { "@id": AUTHOR_ID },
    knowsAbout: ["B2B lead generation", "Sales prospecting", "Buying signals", "Public records research", "Local SEO", "Website design"],
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
    knowsAbout: ["B2B lead generation", "Sales prospecting", "Public records research", "Local SEO"],
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
      images: opts.images || [{ url: "/brand/simpl-cover-1200x675.png", width: 1200, height: 675, alt: "Simpl, B2B lead generation from the public record" }],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
