/**
 * One source of truth for the site's structure (market intelligence site,
 * 2026-11-20, branch market-intel-site).
 *
 * Positioning (docs/brand/BRAND.md + STANDING_CONTEXT, set 2026-11-18):
 * "Simpl, the market intelligence partner for commercial building services",
 * always paired with the outcome line below.
 *
 * Prices are NOT on the site: the dashboard tiers in OFFER_AND_PRICING.md are
 * "Recommended", not "Decided", so every price is said on a 15-minute call.
 * The honest terms (pricing rule 11) ARE decided and are shown.
 */

export const SITE = {
  name: "Simpl",
  url: "https://www.simpl.pro",
  email: "team@simpl.pro",
  phone: "(919) 428-9452",
  phoneHref: "tel:+19194289452",
  city: "Raleigh, NC",
  positioning: "The market intelligence partner for commercial building services.",
  outcome: "We find the buildings that need you, before your competitors know they exist.",
  primaryCta: { label: "See your market", href: "/book" },
  book: { label: "See your market", href: "/book" },
  login: { label: "Client login", href: "/login" },
} as const;

export interface NavItem {
  href: string;
  label: string;
  desc: string;
}

export const NAV: NavItem[] = [
  { href: "/industries", label: "Industries", desc: "Six trades, the records we watch for each" },
  { href: "/how-it-works", label: "How it works", desc: "Read a sample brief" },
  { href: "/pricing", label: "Pricing", desc: "Honest terms" },
  { href: "/about", label: "About", desc: "Who builds it" },
];

/** The six trades. Data for each page lives in app/lib/industries.ts. */
export const INDUSTRIES: (NavItem & { slug: string })[] = [
  { slug: "elevator-service", href: "/industries/elevator-service", label: "Elevator service", desc: "Failed inspections, lapsed certificates" },
  { slug: "fire-alarm-sprinkler", href: "/industries/fire-alarm-sprinkler", label: "Fire alarm & sprinkler", desc: "Alarm and sprinkler citations, abatement orders" },
  { slug: "low-voltage-fiber-telecom", href: "/industries/low-voltage-fiber-telecom", label: "Low voltage, fiber & telecom", desc: "New space, renovations, elevator lines" },
  { slug: "roofing-facade", href: "/industries/roofing-facade", label: "Roofing & facade", desc: "Unsafe facades, fire escape orders" },
  { slug: "generators", href: "/industries/generators", label: "Generators", desc: "Emergency power citations" },
  { slug: "commercial-construction", href: "/industries/commercial-construction", label: "Concrete & commercial construction", desc: "Recertification and retrofit deadlines" },
];

/** Kept for older imports (blog, free-tools). The local door is parked. */
export const GROWTH_SERVICES: NavItem[] = [
  { href: "/how-it-works", label: "How it works", desc: "Read a sample brief" },
];
export const LOCAL_SERVICES: NavItem[] = [];
export const EASY_WINS = LOCAL_SERVICES;
