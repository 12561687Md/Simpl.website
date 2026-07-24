import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Local SEO & AI Search Visibility",
  description:
    "Dominate the local 3-pack and show up when someone asks AI who to call. GBP optimization, citation building, review strategy, local keyword targeting, and AI-search visibility.",
  openGraph: {
    title: "Local SEO & AI Search Visibility | Simpl",
    description: "Dominate the local 3-pack and show up when someone asks AI who to call. GBP optimization, citation building, review strategy, and AI-search visibility.",
    url: "https://simpl.pro/services/local-seo",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/local-seo" },
};

const DATA: ServiceData = {
  code: "02 / Local SEO & AI Search Visibility",
  title: "Local SEO & AI Search Visibility",
  titleTail: "Be one of the three businesses your customers actually see.",
  heroSub:
    "Three businesses show up when someone searches for what you do. If you're not one of them, those leads are going to your competitors. Every single day.",
  includesHeading: "Show up where your customers are already looking.",
  includes: [
    "Google Business Profile optimization",
    "GBP suspension protection and recovery",
    "Citation building and NAP consistency",
    "Review velocity strategy and response templates",
    "On-page schema markup implementation",
    "Local keyword targeting and mapping",
    "Service area page creation",
    "Local pack ranking monitoring",
    "AI-search visibility (showing up when someone asks ChatGPT or Gemini who to call)",
  ],
  compoundingHeading: "Local visibility generates revenue without paying for every click.",
  compoundingBody:
    "When someone searches “plumber near me” or “best accountant in [city],” they are ready to buy. Showing up in the local 3-pack puts you in front of buyers at the exact moment they need you, and every review, citation, and optimized listing compounds over time. Unlike paid ads, this traffic keeps growing without increasing your spend.",
  next: {
    eyebrow: "What comes next",
    heading: "Organic is working. Ready to pour fuel on the fire?",
    body:
      "Local visibility brings in steady leads. Paid performance marketing lets you scale that demand instantly while feeding data back into your organic strategy.",
    link: { href: "/services/paid-ads", label: "Paid Performance Marketing" },
  },
  faqHeading: "Questions we hear from every local business.",
  faqs: [
    {
      q: "How long does it take to rank in the local 3-pack?",
      a: "Most businesses start seeing movement within 4-8 weeks, depending on competition in your area and how optimized your profile is today. Some businesses with a solid foundation but poor GBP hygiene see results in as little as two weeks after cleanup.",
    },
    {
      q: "Do I need a Google Business Profile?",
      a: "If you serve customers in a specific area, yes. A Google Business Profile is the single most important factor in local search rankings. Without one, you are invisible in Google Maps and the local 3-pack, which is where most high-intent local searches end up.",
    },
    {
      q: "What's a citation and why does it matter?",
      a: "A citation is any online mention of your business name, address, and phone number (NAP). Consistent citations across directories like Yelp, BBB, and industry-specific sites tell Google your business is real and trustworthy. Inconsistent citations confuse Google and hurt your rankings.",
    },
  ],
  ctaHeading: "See how visible you really are.",
  ctaSub: "Run the free scan and find out where you stand in local search.",
  ctaScanPrompt: "Can customers actually find you on Google Maps? Type your domain to check your local visibility.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Local SEO & AI Search Visibility",
  description: "Dominate the local 3-pack with GBP optimization, citation building, review strategy, and local keyword targeting for high-intent searchers.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/local-seo",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Local SEO & AI Search Visibility", item: "https://simpl.pro/services/local-seo" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function LocalSEO() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
