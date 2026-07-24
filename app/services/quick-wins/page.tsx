import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Quick Wins & Site Triage",
  description:
    "Stop leaking leads from broken elements you don't know are failing. Simpl fixes core web vitals, mobile issues, crawler errors, and more.",
  openGraph: {
    title: "Quick Wins & Site Triage | Simpl",
    description: "Stop leaking leads from broken elements you don't know are failing. Simpl fixes core web vitals, mobile issues, crawler errors, and more.",
    url: "https://simpl.pro/services/quick-wins",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/quick-wins" },
};

const DATA: ServiceData = {
  code: "01 / Quick Wins & Site Triage",
  title: "Quick Wins & Site Triage",
  titleTail: "Stop the leaks before you spend another dollar on traffic.",
  heroSub:
    "Every second your site takes to load costs you visitors. Every broken form costs you leads. Every missing SSL warning costs you trust. Right now.",
  includesHeading: "The foundation everything else gets built on.",
  includes: [
    "Core Web Vitals audit and fixes",
    "Mobile responsiveness repair",
    "Crawler error identification and resolution",
    "Indexing regression detection",
    "Broken form and tracking code repair",
    "SSL certificate verification",
    "Page speed optimization",
    "Security header implementation",
  ],
  compoundingHeading: "Every dollar you spend on marketing after this actually converts.",
  compoundingBody:
    "Most businesses pour money into ads and SEO while their site silently leaks leads through broken forms, slow pages, and mobile failures. Triage stops the bleeding first. Once the foundation is solid, every channel you invest in performs better because visitors can actually convert when they arrive.",
  next: {
    eyebrow: "What comes next",
    heading: "Your site works now. But can anyone find it?",
    body:
      "A working site that nobody discovers is just an expensive business card. The next layer puts you in front of the people already searching for what you sell.",
    link: { href: "/services/local-seo", label: "Local SEO & AI Search Visibility" },
  },
  faqHeading: "Questions we hear before every triage.",
  faqs: [
    {
      q: "How long does a site triage take?",
      a: "Most site triages are completed within the first week. Simpl runs a full diagnostic scan, prioritizes the critical issues, and starts fixing them immediately. You will see measurable improvements in speed and functionality within days, not months.",
    },
    {
      q: "Will fixing these issues actually increase leads?",
      a: "Yes. Broken forms, slow load times, and mobile failures are the top reasons visitors leave without converting. Fixing them lets visitors complete the actions they came to take, which is the fastest path to more leads from the traffic you already have.",
    },
    {
      q: "Do I need to give you access to my website?",
      a: "For most quick wins, yes. We will need access to your CMS or hosting environment to implement fixes directly. We use secure, role-limited access and never store credentials beyond the active engagement.",
    },
  ],
  ctaHeading: "Find out what's leaking.",
  ctaSub: "Run the free scan and see which quick wins are waiting.",
  ctaScanPrompt: "Is your site silently failing visitors right now? Type your domain and find out in about 60 seconds.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Quick Wins & Site Triage",
  description: "Fix broken site elements, speed issues, and technical problems that silently leak leads. Core web vitals, mobile repair, crawler errors, and more.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/quick-wins",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Quick Wins & Site Triage", item: "https://simpl.pro/services/quick-wins" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function QuickWins() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
