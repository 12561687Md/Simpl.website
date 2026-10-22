import type { Metadata } from "next";
import LocalServicePage, { type LocalServiceData } from "../../components/LocalServicePage";
import { pageMeta } from "../../lib/schema";

/* Primary keyword: "local SEO services" (6,600/mo, KD 34).
   Secondary: local SEO company, AI search visibility, Google Maps 3-pack. */
const D: LocalServiceData = {
  path: "/services/local-seo",
  crumb: "Local SEO",
  title: "Local SEO Services That Win the Google Maps 3-Pack | Simpl",
  description:
    "Local SEO services for service businesses: Google Business Profile, citations, reviews, service pages and AI search visibility, done for you.",
  serviceName: "Local SEO services",
  serviceType: "Local SEO and AI search visibility",
  eyebrow: "Local SEO",
  h1: <>Local SEO services that put you in the <em>Google Maps 3-pack.</em></>,
  sub: "Be one of the three businesses your customers actually see.",
  lead: "When someone nearby searches for what you do, three businesses show up on the map. Our local SEO services work on everything that decides those three, and on the answers AI assistants give when someone asks who to call.",
  includesHeading: "Show up where your customers already look.",
  includes: [
    "Google Business Profile optimization",
    "Citation building and name, address and phone consistency",
    "Review strategy and response templates",
    "Service and service-area pages",
    "Schema markup on every page",
    "Local keyword targeting and mapping",
    "Map-pack rank tracking",
    "AI search visibility: cited when someone asks ChatGPT or Gemini who to call",
    "Monthly reporting on calls, not just rankings",
  ],
  whyEyebrow: "Why local SEO compounds",
  whyHeading: "Local visibility wins customers without paying for every click.",
  whyBody:
    "Someone searching \"plumber near me\" or \"best roofer in Raleigh\" is ready to buy. Showing up in the map pack puts you in front of them at that moment, and every review, citation and service page stacks on the last. Unlike ads, the traffic keeps coming when you stop spending.",
  faqs: [
    {
      q: "What do local SEO services include?",
      a: "Everything that decides who shows up in the Google Maps 3-pack and local results: your Google Business Profile, citations, reviews, service and location pages, schema markup and local keyword targeting. We also work on AI search visibility, so assistants like ChatGPT and Gemini can name you when someone asks who to call.",
    },
    {
      q: "How long does it take to rank in the local 3-pack?",
      a: "Most businesses see movement within 4 to 8 weeks, depending on competition and how complete the profile is today. Businesses with a solid site but a neglected profile sometimes move within two weeks of cleanup.",
    },
    {
      q: "What's a citation and why does it matter?",
      a: "A citation is any online mention of your business name, address and phone number. Consistent citations across directories tell Google your business is real and where it is. Inconsistent ones confuse it and hold rankings back.",
    },
  ],
  related: [
    { href: "/services/google-business-profile", label: "Google Business Profile management", desc: "The listing most local calls come from." },
    { href: "/services/website-build", label: "Small business website design", desc: "A site that turns the visit into a call." },
    { href: "/blog/how-to-rank-higher-on-google-maps", label: "How to rank higher on Google Maps", desc: "What decides the 3-pack, in order of weight." },
  ],
};

export const metadata: Metadata = pageMeta({ path: D.path, title: D.title, description: D.description });

export default function Page() {
  return <LocalServicePage d={D} />;
}
