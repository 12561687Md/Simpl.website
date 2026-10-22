/**
 * One source of truth for the site's structure (revamp 2026-10-22).
 *
 * Header, footer, hubs, related links and JSON-LD all read from here, so a
 * renamed service or a new industry changes in exactly one place.
 *
 * Positioning: Simpl is a client acquisition partner for B2B companies. Door
 * one is the Account Engine (a private portal that reads the public record and
 * tells a sales team who to call, why now and who decides). Door two is local
 * SEO and websites for service businesses.
 *
 * Prices are deliberately NOT on the site (Matt, 2026-10-22). Every engagement
 * is scoped on a call.
 */

export const SITE = {
  name: "Simpl",
  url: "https://www.simpl.pro",
  email: "team@simpl.pro",
  phone: "(919) 428-9452",
  phoneHref: "tel:+19194289452",
  city: "Raleigh, NC",
  primaryCta: { label: "See your top prospects", href: "/top-prospects" },
  book: { label: "Book a call", href: "/book" },
  login: { label: "Client login", href: "/login" },
} as const;

export interface NavItem {
  href: string;
  label: string;
  desc: string;
}

/** Door one: the B2B client acquisition stack. */
export const GROWTH_SERVICES: NavItem[] = [
  { href: "/services/account-engine", label: "Account Engine", desc: "Who to call this week, with proof" },
  { href: "/services/crm-follow-up", label: "CRM & follow-up", desc: "Every good account, followed up" },
  { href: "/services/ai-receptionist", label: "AI receptionist", desc: "Every call answered, any hour" },
];

/** Door two: local SEO and websites for service businesses. */
export const LOCAL_SERVICES: NavItem[] = [
  { href: "/services/local-seo", label: "Local SEO", desc: "Found on Google Maps and in AI answers" },
  { href: "/services/website-build", label: "Websites", desc: "Fast, findable, built to convert" },
  { href: "/services/google-business-profile", label: "Google Business Profile", desc: "Own the map listing" },
  { href: "/services/paid-ads", label: "PPC management", desc: "Google and Meta ads, no markup" },
];

/** Kept for older imports. */
export const EASY_WINS = LOCAL_SERVICES;

export const INDUSTRIES: (NavItem & { slug: string })[] = [
  { slug: "low-voltage-security", href: "/industries/low-voltage-security", label: "Low voltage & security", desc: "Integrators, access control, cabling" },
  { slug: "senior-living-technology", href: "/industries/senior-living-technology", label: "Senior living technology", desc: "Nurse call, networks, resident tech" },
  { slug: "building-systems", href: "/industries/building-systems", label: "Building systems", desc: "Fire protection, HVAC, elevators" },
  { slug: "facility-services", href: "/industries/facility-services", label: "Facility services", desc: "Commercial cleaning, maintenance" },
  { slug: "healthcare-technology", href: "/industries/healthcare-technology", label: "Healthcare technology", desc: "Medical equipment, healthcare IT" },
];

export const CASE_STUDY = { href: "/case-studies/noovis", label: "Noovis case study", desc: "A network integrator's Account Engine" };

export const RESOURCES: NavItem[] = [
  { href: CASE_STUDY.href, label: "Case study: Noovis", desc: CASE_STUDY.desc },
  { href: "/blog", label: "Blog", desc: "B2B prospecting playbooks" },
  { href: "/free-tools", label: "Free website audit", desc: "For local service businesses" },
  { href: "/faq", label: "FAQ", desc: "Straight answers" },
];

export const COMPANY: NavItem[] = [
  { href: "/about", label: "About Simpl", desc: "Who builds it and why" },
  { href: "/book", label: "Book a call", desc: "30 minutes, no pitch deck" },
  { href: "/login", label: "Client login", desc: "Go to your portal" },
];
