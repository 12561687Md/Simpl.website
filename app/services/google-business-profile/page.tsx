import type { Metadata } from "next";
import LocalServicePage, { type LocalServiceData } from "../../components/LocalServicePage";
import { pageMeta } from "../../lib/schema";

/* Primary keyword: "Google Business Profile management" (1,300/mo).
   Copy carried over in substance (GBP work itself is deferred, 2026-10-22). */
const D: LocalServiceData = {
  path: "/services/google-business-profile",
  crumb: "Google Business Profile",
  title: "Google Business Profile Management Services | Simpl",
  description:
    "Google Business Profile management: categories, services, photos, posts, reviews and suspension recovery, run monthly so your listing wins calls.",
  serviceName: "Google Business Profile management",
  serviceType: "Google Business Profile optimization and management",
  eyebrow: "Google Business Profile",
  h1: <>Google Business Profile management, <em>run like it matters.</em></>,
  sub: "The listing most of your calls come from, actually managed.",
  lead: "When someone nearby searches for what you do, your Google Business Profile is what they see first. A complete, active profile wins those calls. A stale one hands them to the business above you.",
  includesHeading: "The listing, run like a channel.",
  includes: [
    "Claiming, verification and cleanup",
    "Primary and secondary category strategy",
    "Services, service areas and hours filled out completely",
    "Monthly photo and post cadence",
    "Review strategy and owner-response templates",
    "Q&A seeded with the questions customers ask",
    "Suspension protection and recovery",
    "Monthly calls, views and direction-request reporting",
  ],
  whyEyebrow: "Why it compounds",
  whyHeading: "Profile activity compounds into map-pack rank.",
  whyBody:
    "Google's local ranking runs on relevance, distance and prominence, and prominence is earned: steady reviews, fresh photos, complete information, owner replies. Every month of activity stacks on the last, which is why the businesses at the top of the map treat the profile like a channel, not a set-and-forget listing.",
  faqs: [
    {
      q: "Do I need a Google Business Profile?",
      a: "If you serve customers in a specific area, yes. It is the single biggest factor in local search rankings and it is where the Google Maps 3-pack pulls from. Without one you are invisible for the highest-intent searches.",
    },
    {
      q: "How long until profile work moves my ranking?",
      a: "Completing and correcting a profile can move visibility within weeks, especially where competitors are inactive. Reviews and posting compound over the following months.",
    },
    {
      q: "My profile got suspended. Can you fix it?",
      a: "Usually, yes. Suspensions typically come from name or address inconsistencies, category issues or edits that tripped Google's filters. We handle reinstatement and set the profile up so it doesn't happen again.",
    },
  ],
  related: [
    { href: "/services/local-seo", label: "Local SEO services", desc: "Citations, pages and AI search on top of the profile." },
    { href: "/blog/how-to-rank-higher-on-google-maps", label: "How to rank higher on Google Maps", desc: "What decides the 3-pack." },
    { href: "/free-tools", label: "Free website audit", desc: "Grades your profile alongside your site." },
  ],
};

export const metadata: Metadata = pageMeta({ path: D.path, title: D.title, description: D.description });

export default function Page() {
  return <LocalServicePage d={D} />;
}
