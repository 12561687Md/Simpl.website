import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Long-Term Organic Growth",
  description:
    "Build compounding search authority that outlasts any ad budget. Content architecture, essential page builds, domain authority, and backlink acquisition.",
  openGraph: {
    title: "Long-Term Organic Growth | Simpl",
    description: "Build compounding search authority that outlasts any ad budget. Content architecture, essential page builds, domain authority, and backlink acquisition.",
    url: "https://simpl.pro/services/organic-growth",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/organic-growth" },
};

const DATA: ServiceData = {
  code: "04 / Long-Term Organic Growth",
  title: "Long-Term Organic Growth",
  titleTail: "Build the authority competitors have to outspend to catch.",
  heroSub:
    "Every month without a content strategy is a month your competitors are building authority you'll have to outspend to catch.",
  includesHeading: "Assets that grow in value every month you own them.",
  includes: [
    "Content architecture and topic clustering",
    "Essential page builds (services, about, FAQ, location)",
    "Internal linking strategy and implementation",
    "Crawlability maintenance and monitoring",
    "Domain authority building",
    "Backlink acquisition through digital PR",
    "Competitor content gap analysis",
    "Monthly organic traffic reporting",
  ],
  compoundingHeading: "Every page you build today drives traffic for years.",
  compoundingBody:
    "Organic content is the only marketing channel where your cost-per-acquisition drops over time. A service page written today ranks higher next month, earns more backlinks next quarter, and drives more traffic next year. While paid ads stop the second you stop paying, organic assets compound. The longer you invest, the harder it becomes for competitors to catch up.",
  next: {
    eyebrow: "What comes next",
    heading: "The machine is running. Who makes sure it stays that way?",
    body:
      "Growth without direction eventually stalls. Continuous strategy keeps every channel aligned, catches regressions before they cost you, and finds the next opportunity before your competitors do.",
    link: { href: "/services/strategy", label: "Fractional CMO & Strategy" },
  },
  faqHeading: "Questions we hear from every business investing in SEO.",
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "Most businesses start seeing meaningful organic traffic growth within 3-6 months. The first improvements, like better indexing and fixing technical issues, show up within weeks. But the real compounding effect, where pages climb to page one and stay there, typically takes 4-6 months of consistent work.",
    },
    {
      q: "What kind of content do you create?",
      a: "We build the pages that drive revenue: service pages, location pages, FAQ content, and industry-specific articles that target the exact searches your customers are making. Every piece is written to rank and convert, not just to fill a blog. We focus on the content your competitors already have that you are missing.",
    },
    {
      q: "Will I own the content you produce?",
      a: "Yes, 100%. Every page, article, and asset we create belongs to you. If you ever stop working with Simpl, all the content stays on your site. That is the whole point of organic growth: you are building assets you own, not renting attention from an ad platform.",
    },
  ],
  ctaHeading: "See where your organic presence stands today.",
  ctaSub: "Run the free scan and find the gaps holding back your search authority.",
  ctaScanPrompt: "How thin is your content compared to competitors? Type your domain to see your content grade.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Long-Term Organic Growth",
  description: "Build compounding search authority with content architecture, essential page builds, domain authority growth, and backlink acquisition that outlasts any ad budget.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/organic-growth",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Long-Term Organic Growth", item: "https://simpl.pro/services/organic-growth" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function OrganicGrowth() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
