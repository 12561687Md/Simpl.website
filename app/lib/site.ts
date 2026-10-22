/**
 * One source of truth for the revamped site's structure (2026-10-22 revamp).
 *
 * Header, footer, hubs, sitemap-adjacent links and JSON-LD all read from here,
 * so a renamed service or a new industry changes in exactly one place.
 * Positioning: Simpl builds custom growth portals for high-ticket B2B companies
 * (the Account Engine), plus CRM and follow-up and an AI receptionist. Websites,
 * SEO, GBP and ads are the secondary "easy wins".
 */

export const SITE = {
  name: "Simpl",
  url: "https://www.simpl.pro",
  email: "team@simpl.pro",
  phone: "(919) 428-9452",
  phoneHref: "tel:+19194289452",
  city: "Raleigh, NC",
  primaryCta: { label: "See your top 25 accounts", href: "/top-25" },
} as const;

export interface NavItem {
  href: string;
  label: string;
  desc: string;
}

/** The money: custom growth portals and what runs on them. */
export const GROWTH_SERVICES: NavItem[] = [
  { href: "/services/account-engine", label: "Account Engine", desc: "Who to call this week, with proof" },
  { href: "/services/crm-follow-up", label: "CRM & follow-up", desc: "Every good account, followed up" },
  { href: "/services/ai-receptionist", label: "AI receptionist & 24/7 support", desc: "Every call answered, any hour" },
];

/** The easy wins: still sold, never the lead. */
export const EASY_WINS: NavItem[] = [
  { href: "/services/website-build", label: "Websites", desc: "Fast, findable, built to convert" },
  { href: "/services/local-seo", label: "SEO & AI search", desc: "Found on Google and in AI answers" },
  { href: "/services/google-business-profile", label: "Google Business Profile", desc: "Own the map listing" },
  { href: "/services/paid-ads", label: "Paid ads", desc: "Google and Meta, no markup" },
];

export const INDUSTRIES: (NavItem & { slug: string })[] = [
  { slug: "low-voltage-security", href: "/industries/low-voltage-security", label: "Low voltage, security & telecom", desc: "Integrators, access control, cabling" },
  { slug: "senior-living-technology", href: "/industries/senior-living-technology", label: "Senior living technology", desc: "Nurse call, networks, resident tech" },
  { slug: "building-systems", href: "/industries/building-systems", label: "Building systems", desc: "Fire protection, HVAC, elevators" },
  { slug: "facility-services", href: "/industries/facility-services", label: "Facility services", desc: "Cleaning, maintenance, property services" },
  { slug: "healthcare-technology", href: "/industries/healthcare-technology", label: "Healthcare technology", desc: "Medical equipment, healthcare IT" },
];

export const RESOURCES: NavItem[] = [
  { href: "/blog", label: "Blog", desc: "B2B growth playbooks" },
  { href: "/faq", label: "FAQ", desc: "Straight answers" },
  { href: "/about", label: "About Simpl", desc: "Who builds it and why" },
];

/** Account Engine pricing. Mirrors Simpl.master/brand/pricing/simpl-engine-pricing.html. */
export const PLANS = [
  {
    id: "base",
    name: "Account Engine",
    monthly: 1000,
    setup: 10000,
    tag: "Your market, researched every night, in a portal that's yours.",
    replaces: [
      ["Research / business development hire", "$5,000+/mo"],
      ["Data and contact tools", "$1,250+/mo"],
      ["An outbound agency", "$3,000-10,000/mo"],
    ] as [string, string][],
    featLead: "What you get",
    features: [
      { b: "Your own portal.", t: "Your brand, your address, your team's logins" },
      { b: "Your whole market scored nightly", t: "from inspections, permits, licenses, new owners and budget cycles" },
      { b: "A daily game plan.", t: "Today's best calls, follow-ups due, what changed overnight" },
      { b: "Who decides, found on demand,", t: "confirmed from public sources" },
      { b: "Proof on every fact,", t: "linked to the official record" },
      { b: "Lists, pipeline, notes and exports", t: "for the whole team" },
    ],
    cta: { label: "See your top 25 accounts", href: "/top-25?plan=base" },
  },
  {
    id: "pro",
    name: "Account Engine Pro",
    monthly: 2500,
    setup: 15000,
    badge: "Most complete",
    tag: "Everything in Account Engine, plus the follow-up, the phones and the reach to close it.",
    replaces: [
      ["Everything in Account Engine", "$6,250+/mo"],
      ["CRM + follow-up sequences, set up and run", "$800+/mo"],
      ["24/7 answering and support line", "$1,000+/mo"],
      ["Researcher on call for any account", "$2,000+/mo"],
    ] as [string, string][],
    featLead: "Everything in Account Engine, plus",
    features: [
      { b: "Any territory, up to nationwide,", t: "with multiple markets and states" },
      { b: "Custom reasons to call", t: "built around how you sell, from new data sources" },
      { b: "Overnight research", t: "on your top accounts, every night" },
      { b: "CRM and follow-up:", t: "email, wait, call, follow up until they reply, in your CRM or ours", soon: true },
      { b: "24/7 answering and support line", t: "for your customers", soon: true },
      { b: "Ask your engine", t: "anything, in plain English", soon: true },
      { b: "A monthly strategy call", t: "and priority support" },
    ],
    cta: { label: "Map your market with us", href: "/top-25?plan=pro" },
  },
] as const;

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
