import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Fractional CMO & Strategy",
  description:
    "Continuous data-driven direction to scale your entire digital presence. Monthly audits, competitor intelligence, and full attribution reporting.",
  openGraph: {
    title: "Fractional CMO & Strategy | Simpl",
    description: "Continuous data-driven direction to scale your entire digital presence. Monthly audits, competitor intelligence, and full attribution reporting.",
    url: "https://simpl.pro/services/strategy",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/strategy" },
};

const DATA: ServiceData = {
  code: "05 / Fractional CMO & Strategy",
  title: "Fractional CMO & Strategy",
  titleTail: "Senior marketing leadership, without the six-figure hire.",
  heroSub:
    "The growth you built last quarter is already decaying. Without someone watching the numbers, you won't know until revenue drops.",
  includesHeading: "The strategic layer that keeps everything aligned.",
  includes: [
    "Monthly health audits across all six scoring categories",
    "Risk mitigation and regression prevention",
    "Competitor intelligence and market monitoring",
    "Market expansion blueprints",
    "Full attribution reporting across all channels",
    "Quarterly strategy reviews with priority roadmaps",
    "Cross-channel budget allocation guidance",
    "Executive-level performance dashboards",
  ],
  compoundingHeading: "Growth without oversight quietly destroys itself.",
  compoundingBody:
    "Reputation drift, technical regressions, algorithm updates, competitor moves. Any one of these can undo months of progress overnight. A fractional CMO watches the full picture so nothing slips. Monthly audits catch problems early. Quarterly reviews keep your strategy ahead of the market. And continuous attribution ensures every dollar goes where it works hardest.",
  next: {
    eyebrow: "The full stack",
    heading: "Every layer builds on the one before it.",
    body:
      "Quick wins fix the foundation. Local SEO gets you found. Paid ads scale demand. Organic growth builds lasting assets. And strategy ties it all together. That is how you build a digital presence that compounds instead of one that constantly needs repair.",
    chips: [
      { label: "Quick Wins", href: "/services/quick-wins" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Paid Ads", href: "/services/paid-ads" },
      { label: "Organic Growth", href: "/services/organic-growth" },
    ],
  },
  faqHeading: "Questions we hear before every strategy engagement.",
  faqs: [
    {
      q: "What does a fractional CMO actually do?",
      a: "A fractional CMO gives you senior marketing leadership without the six-figure salary. At Simpl, that means monthly audits across your entire digital presence, quarterly strategy sessions, competitor monitoring, budget allocation guidance, and a clear roadmap that connects every marketing dollar to revenue. Think of it as having a marketing executive on your team part-time.",
    },
    {
      q: "How often do we meet?",
      a: "Most clients meet with their Simpl strategist monthly for a full review and quarterly for deep strategy sessions. Between meetings, you have direct access for questions and urgent decisions. We also send proactive alerts when we spot issues or opportunities you need to act on quickly.",
    },
    {
      q: "Can I see examples of past strategy work?",
      a: "We are happy to walk you through the depth of analysis on a first call. Every engagement starts with a free scan so you can see exactly how Simpl reads a business before you commit to anything.",
    },
  ],
  ctaHeading: "Start with the scan. We will show you the full picture.",
  ctaSub: "Every engagement starts with understanding where you stand today.",
  ctaScanPrompt: "When was the last time someone audited your entire digital presence? It takes about 60 seconds.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fractional CMO & Strategy",
  description: "Continuous data-driven strategic direction for your entire digital presence with monthly audits, competitor intelligence, and full attribution reporting.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/strategy",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Fractional CMO & Strategy", item: "https://simpl.pro/services/strategy" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Strategy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
