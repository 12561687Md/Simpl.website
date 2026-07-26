import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "CRM & AI Automation",
  description:
    "Capture every lead in one system, answer instantly, and follow up automatically. Missed-call text-back, instant quotes, 24/7 response, pipeline tracking, and review requests for local service businesses.",
  openGraph: {
    title: "CRM & AI Automation | Simpl",
    description: "Every lead captured, answered, and followed up. Missed-call text-back, instant quotes, pipeline tracking, and follow-up that keeps every lead warm.",
    url: "https://simpl.pro/services/ai-quoting-agent",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/ai-quoting-agent" },
};

const DATA: ServiceData = {
  code: "07 / CRM & AI Automation",
  title: "The power of automation built into your business,",
  titleTail: "so smarter decisions happen faster.",
  // To add the hero photo once supplied: drop the file at
  // /public/services/crm-automation.jpg (see public/services/README.md for the
  // spec) and uncomment the line below.
  // heroImage: { src: "/services/crm-automation.jpg", alt: "A contractor answering a customer on the job" },
  heroSub:
    "Leads come in from calls, forms, and messages at every hour, and the ones that slip through are jobs you never even hear about. This captures every one in a single system, answers in seconds, and keeps following up until they book.",
  includesHeading: "Your whole lead engine, in one place.",
  includes: [
    "Missed-call text-back in seconds, so no caller hits a dead end",
    "Every call, form, and message in one shared inbox",
    "Contacts and pipeline tracked from first touch to booked job",
    "Instant quotes for your common jobs",
    "24/7 response to calls, forms, and messages",
    "Appointment booking straight onto your calendar",
    "Automatic follow-up sequences for leads that go quiet",
    "Review requests sent the moment a job closes",
    "Every conversation logged, so nothing slips",
  ],
  compoundingHeading: "Speed and follow-up win the jobs your competitors let slip.",
  compoundingBody:
    "Research on lead response is blunt: reply within minutes and a lead is dramatically more likely to become a job; wait an hour and it's probably gone. Most competitors answer slowly, forget to follow up, or lose the lead in a notebook. When every inquiry is answered instantly and chased automatically until it books, you win the work their voicemail and their memory are losing, every single week.",
  next: {
    eyebrow: "What comes next",
    heading: "This seals the bottom of the funnel. Visibility fills the top.",
    body:
      "Once no lead leaks and every one gets followed up, every visibility dollar works harder. Local SEO and your Google listing send the calls; this makes sure every one becomes a booked job.",
    link: { href: "/services/local-seo", label: "Local SEO & AI Search Visibility" },
  },
  faqHeading: "Questions we hear before every setup.",
  faqs: [
    {
      q: "What is missed-call text-back?",
      a: "When a call goes unanswered, the caller instantly gets a text: sorry we missed you, we're on a job, what do you need? The customer feels handled instead of ignored, and you reply when your hands are free. For field trades it's usually the single highest-return automation there is.",
    },
    {
      q: "Do I need a CRM if I already have a phone and a notebook?",
      a: "A CRM is just one place where every lead, conversation, and job lives instead of scattered across your phone, your inbox, and a notepad. The leads that fall through the cracks are almost always the ones nobody wrote down or followed up on. This closes those cracks without changing how you work.",
    },
    {
      q: "Will the automation feel impersonal to my customers?",
      a: "The opposite. It's tuned to your services and your voice, and its job is buying you time by responding instantly, then you take over personally. A voicemail and a callback four hours later feels far worse to someone who needs help now.",
    },
    {
      q: "How are the instant quotes accurate?",
      a: "On setup we load your services and real price ranges, and it only quotes ballparks you've approved, with anything unusual handed straight to you. Customers get a fast honest range, you get a warm lead instead of a missed call.",
    },
  ],
  ctaHeading: "Find out how many leads you're missing.",
  ctaSub: "The free scan shows where your leads come from, and where they leak.",
  ctaScanPrompt: "Winning the search but losing the follow-up? Type your domain and see the whole picture.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CRM & AI Automation",
  description: "CRM, missed-call text-back, instant quotes, 24/7 response, pipeline tracking, booking, and follow-up sequences for local service businesses.",
  provider: { "@type": "Organization", name: "Simpl", url: "https://simpl.pro" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://simpl.pro/services/ai-quoting-agent",
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://simpl.pro" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://simpl.pro/services" },
    { "@type": "ListItem", position: 3, name: "CRM & AI Automation", item: "https://simpl.pro/services/ai-quoting-agent" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function CrmAiAutomation() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
