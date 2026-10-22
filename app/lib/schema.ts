/**
 * JSON-LD builders. Schema sync rule: every page's structured data is built
 * from the same data that renders the page, so a copy change can't leave the
 * schema behind.
 */
import { SITE } from "./site";

const ORG_ID = `${SITE.url}/#organization`;

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
      "Simpl builds custom growth portals for high-ticket B2B companies: the Account Engine finds the right buyers at the right time from the public record, with proof, plus CRM and follow-up and 24/7 AI receptionist and support lines. Websites, SEO, Google Business Profile and paid ads are available as add-ons.",
    address: { "@type": "PostalAddress", addressLocality: "Raleigh", addressRegion: "NC", addressCountry: "US" },
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: { "@type": "ContactPoint", email: SITE.email, telephone: "+1-919-428-9452", contactType: "sales" },
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

export function service(opts: { name: string; path: string; description: string; serviceType: string; audience?: string; offers?: object[] }) {
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
    ...(opts.offers ? { offers: opts.offers } : {}),
  };
}

export function engineOffers() {
  return [
    {
      "@type": "Offer",
      name: "Account Engine",
      price: "1000",
      priceCurrency: "USD",
      description: "$10,000 setup, then $1,000 per month",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "1000", priceCurrency: "USD", unitText: "MONTH" },
      url: `${SITE.url}/pricing`,
    },
    {
      "@type": "Offer",
      name: "Account Engine Pro",
      price: "2500",
      priceCurrency: "USD",
      description: "$15,000 setup, then $2,500 per month",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "2500", priceCurrency: "USD", unitText: "MONTH" },
      url: `${SITE.url}/pricing`,
    },
  ];
}

/** Render helper: one <script type="application/ld+json"> with an array. */
export function ldJson(...blocks: object[]) {
  return { __html: JSON.stringify(blocks.length === 1 ? blocks[0] : blocks) };
}
