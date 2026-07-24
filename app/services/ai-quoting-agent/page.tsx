import type { Metadata } from "next";
import ServiceLayout, { type ServiceData } from "../../components/ServiceLayout";

export const metadata: Metadata = {
  title: "AI Response & Quoting Agent",
  description:
    "Never miss another lead. Missed-call text-back, instant quote estimates, 24/7 response, and follow-up sequences that keep every lead warm while you're on the job.",
  openGraph: {
    title: "AI Response & Quoting Agent | Simpl",
    description: "Never miss another lead. Missed-call text-back, instant quotes, 24/7 response, and follow-up that keeps every lead warm while you're on the job.",
    url: "https://simpl.pro/services/ai-quoting-agent",
    siteName: "Simpl",
    type: "website",
  },
  alternates: { canonical: "https://simpl.pro/services/ai-quoting-agent" },
};

const DATA: ServiceData = {
  code: "07 / AI Response & Quoting Agent",
  title: "AI Response & Quoting Agent",
  titleTail: "Every call answered. Every lead followed up. Even mid-job.",
  heroSub:
    "You can't answer the phone from a roof or a crawlspace, and a customer who hits voicemail is already dialing the next business. This answers for you in seconds, so the lead stays yours.",
  includesHeading: "The response layer that never clocks out.",
  includes: [
    "Missed-call text-back in seconds, not hours",
    "Instant ballpark quotes for your common jobs",
    "24/7 response to calls, forms, and messages",
    "Appointment booking straight onto your calendar",
    "Automatic follow-up sequences for leads that go quiet",
    "Review requests sent the moment a job closes",
    "Every conversation logged so nothing slips",
    "Tuned to your services, prices, and voice on setup",
  ],
  compoundingHeading: "Speed is the cheapest competitive advantage in local business.",
  compoundingBody:
    "Research on lead response is blunt: reply within minutes and a lead is dramatically more likely to become a job; wait an hour and it's probably gone. Most of your competitors respond slowly or not at all. Answering every inquiry instantly, around the clock, wins you the jobs their voicemail is losing, every single week.",
  next: {
    eyebrow: "What comes next",
    heading: "Response seals the bottom of the funnel. Visibility fills the top.",
    body:
      "Once no lead leaks, every visibility dollar works harder. Local SEO and your Google listing send the calls; the agent makes sure every one becomes a conversation.",
    link: { href: "/services/local-seo", label: "Local SEO & AI Search Visibility" },
  },
  faqHeading: "Questions we hear before every setup.",
  faqs: [
    {
      q: "What is missed-call text-back?",
      a: "When a call goes unanswered, the caller instantly gets a text: sorry we missed you, we're on a job, what do you need? The customer feels handled instead of ignored, and you reply when your hands are free. For field trades it's usually the single highest-return automation there is.",
    },
    {
      q: "Will it feel impersonal to my customers?",
      a: "The opposite. It's tuned to your services and your voice, and its job is buying you time by responding instantly, then you take over personally. A voicemail and a callback four hours later feels far worse to someone who needs help now.",
    },
    {
      q: "How are the instant quotes accurate?",
      a: "On setup we load your services and real price ranges, and the agent only quotes ballparks you've approved, with anything unusual handed straight to you. Customers get a fast honest range, you get a warm lead instead of a missed call.",
    },
  ],
  ctaHeading: "Find out how many leads you're missing.",
  ctaSub: "The free scan shows where your leads come from, and where they leak.",
  ctaScanPrompt: "Winning the search but losing the follow-up? Type your domain and see the whole picture.",
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Response & Quoting Agent",
  description: "Missed-call text-back, instant quote estimates, 24/7 response, booking, and follow-up sequences for local service businesses.",
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
    { "@type": "ListItem", position: 3, name: "AI Response & Quoting Agent", item: "https://simpl.pro/services/ai-quoting-agent" },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AiQuotingAgent() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([SERVICE_SCHEMA, BREADCRUMB_SCHEMA, FAQ_SCHEMA]) }} />
      <ServiceLayout data={DATA} />
    </>
  );
}
