import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Paid Performance Marketing",
  description:
    "Scale traffic instantly with campaigns that actually convert. Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking.",
  openGraph: {
    title: "Paid Performance Marketing | Simpl",
    description: "Scale traffic instantly with campaigns that actually convert. Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking.",
    url: "https://simpl.pro/services/paid-ads",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/paid-ads" },
};

const DATA: ServiceData = {
  code: "03 / Paid Performance Marketing",
  title: "Paid Performance Marketing",
  titleTail: "Turn ad spend into booked jobs, not just clicks.",
  heroSub:
    "Your competitors are bidding on your brand name right now. Every click they steal is a customer you already earned, paying someone else.",
  includesHeading: "Paid channels that pay for themselves.",
  includes: [
    "Google Search Ads setup and management",
    "Local Services Ads (LSA) optimization",
    "Meta retargeting campaigns",
    "Branded search defense",
    "Landing page optimization for ad traffic",
    "Full conversion tracking implementation",
    "Keyword-level ROI reporting",
    "A/B testing for ad creative and landing pages",
  ],
  compoundingHeading: "Clean data on what converts, feeding your long-term organic strategy.",
  compoundingBody:
    "Paid campaigns do more than generate leads today. Every click, conversion, and bounce tells you exactly which keywords and pages your audience cares about. That data directly informs your content strategy, page builds, and SEO priorities. The result: your organic growth gets smarter every month because paid already proved what works.",
  next: {
    eyebrow: "What comes next",
    heading: "Ads are driving leads. Now build the assets that make ads optional.",
    body:
      "Paid traffic is fast but it stops the moment you stop spending. Organic growth builds compounding assets that reduce your cost-per-acquisition every month.",
    link: { href: "/services/organic-growth", label: "Long-Term Organic Growth" },
  },
  faqHeading: "Questions we hear before every campaign.",
  faqs: [
    {
      q: "How much should I budget for Google Ads?",
      a: "It depends on your industry and market, and we'll give you a straight number for yours on a free call before anything launches. Simpl helps you avoid wasted spend from day one by building campaigns around the keywords that actually convert, not just the ones with the most volume. You own the ad account either way, and every dollar of spend goes to the platform, not to us.",
    },
    {
      q: "How quickly will I see results from paid ads?",
      a: "Paid ads can generate leads within the first week of launch. Unlike SEO, you do not have to wait for Google to crawl and rank your pages. Most campaigns produce their first qualified leads within 7-14 days of launch, with optimization improving results every week after that.",
    },
    {
      q: "Can competitors really bid on my brand name?",
      a: "Yes, and many do. It is completely legal for a competitor to bid on your business name as a keyword in Google Ads. That means when someone searches for you specifically, a competitor's ad can appear above your organic listing. Simpl includes branded search defense to protect the traffic you have already earned.",
    },
  ],
  ctaHeading: "Find out if your site is ready for paid traffic.",
  ctaSub: "Run the free scan before spending a dollar on ads.",
  ctaScanPrompt: "Are competitors bidding on your brand name? Start with a scan to see what you're up against.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Paid Performance Marketing",
  description: "Scale traffic instantly with Google Ads, LSAs, Meta retargeting, landing page optimization, and full conversion tracking that proves ROI.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/paid-ads",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Paid Performance Marketing", item: "https://simpl.pro/services/paid-ads" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function PaidAds() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
