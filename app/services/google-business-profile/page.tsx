import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "Google Business Profile Optimization",
  description:
    "Your Google Business Profile is where most local calls start. Claiming, optimization, photo and post cadence, review velocity, and suspension protection, handled monthly.",
  openGraph: {
    title: "Google Business Profile Optimization | Simpl",
    description: "Your Google Business Profile is where most local calls start. Optimization, review velocity, and suspension protection, handled monthly.",
    url: "https://simpl.pro/services/google-business-profile",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/google-business-profile" },
};

const DATA: ServiceData = {
  code: "06 / Google Business Profile",
  title: "Google Business Profile Optimization",
  titleTail: "The listing most of your calls come from, actually managed.",
  heroSub:
    "When someone nearby searches for what you do, your Google Business Profile is what they see first. A complete, active profile wins those calls. A stale one hands them to the competitor above you.",
  includesHeading: "The listing, run like it matters.",
  includes: [
    "Claiming, verification, and cleanup",
    "Primary and secondary category strategy",
    "Services, service areas, and hours filled out completely",
    "Monthly photo and post cadence (Google favors active listings)",
    "Review velocity strategy and owner-response templates",
    "Q&A seeding with the questions customers actually ask",
    "Suspension protection and recovery",
    "Month-over-month calls, views, and direction-request reporting",
  ],
  compoundingHeading: "Profile activity compounds into map-pack rank.",
  compoundingBody:
    "Google's local ranking runs on relevance, distance, and prominence, and prominence is earned: steady reviews, fresh photos, complete information, owner replies. Every month of activity stacks on the last, which is why the businesses at the top of the map pack are the ones treating the profile like a channel, not a set-and-forget listing.",
  next: {
    eyebrow: "What comes next",
    heading: "The profile gets you seen. The rest of local SEO keeps you there.",
    body:
      "Citations, on-page schema, service pages, and AI-search visibility multiply what an optimized profile starts. That's the full local SEO engine.",
    link: { href: "/services/local-seo", label: "Local SEO & AI Search Visibility" },
  },
  faqHeading: "Questions we hear about Google Business Profiles.",
  faqs: [
    {
      q: "Do I need a Google Business Profile?",
      a: "If you serve customers in a specific area, yes. It's the single most important factor in local search rankings, and it's where the Google Maps 3-pack, the most valuable real estate in local search, pulls from. Without one you're invisible for the highest-intent searches.",
    },
    {
      q: "How long until profile work moves my ranking?",
      a: "Completing and correcting a profile can move visibility within weeks, especially where competitors are inactive. Review velocity and posting cadence compound over the following months. The businesses that stay active hold their spots; the ones that stop slide back.",
    },
    {
      q: "My profile got suspended. Can you fix it?",
      a: "Usually, yes. Suspensions typically come from name or address inconsistencies, category issues, or edits that tripped Google's filters. We handle the reinstatement process and, more importantly, set the profile up so it doesn't happen again.",
    },
  ],
  ctaHeading: "See what your profile is missing.",
  ctaSub: "The free scan grades your Google Business Profile alongside your whole presence.",
  ctaScanPrompt: "Is your listing complete, active, and winning calls? Type your domain and find out.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Google Business Profile Optimization",
  description: "Claiming, optimization, photo and post cadence, review velocity, Q&A, and suspension protection for Google Business Profiles, managed monthly.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/google-business-profile",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "Google Business Profile Optimization", item: "https://simpl.pro/services/google-business-profile" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function GoogleBusinessProfile() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
