import type { Metadata } from "next";
import LocalServicePage, { type LocalServiceData } from "../../components/LocalServicePage";
import { pageMeta } from "../../lib/schema";

/* Primary keyword: "PPC management services" (1,000/mo, KD 16).
   Secondary: Google Ads management, Local Services Ads. */
const D: LocalServiceData = {
  path: "/services/paid-ads",
  crumb: "PPC management",
  title: "PPC Management Services for Service Businesses | Simpl",
  description:
    "PPC management services for service businesses: Google Ads, Local Services Ads and Meta retargeting with real call tracking. You own the account.",
  serviceName: "PPC management services",
  serviceType: "Pay-per-click advertising management",
  eyebrow: "PPC management",
  h1: <>PPC management services that <em>book jobs, not just clicks.</em></>,
  sub: "You own the ad account. Every dollar of spend goes to the platform.",
  lead: "Google Ads, Local Services Ads and Meta retargeting, built around the searches that turn into booked work and measured on calls and jobs, not impressions.",
  includesHeading: "Paid channels that pay for themselves.",
  includes: [
    "Google Search Ads setup and management",
    "Local Services Ads optimization",
    "Meta retargeting campaigns",
    "Branded search defense",
    "Landing pages built for ad traffic",
    "Full conversion and call tracking",
    "Keyword-level return reporting",
    "Testing on ad copy and landing pages",
  ],
  whyEyebrow: "Why it compounds",
  whyHeading: "Paid data tells your SEO what to build next.",
  whyBody:
    "Every click, call and bounce shows which searches and pages your customers care about. That data shapes which service pages we build and which keywords we chase organically, so your SEO gets smarter every month because paid already proved what works.",
  faqs: [
    {
      q: "How much should I budget for Google Ads?",
      a: "It depends on your trade and your market, and we give you a straight number for yours on a free call before anything launches. Campaigns are built around the searches that convert, not the ones with the most volume. You own the ad account, and every dollar of spend goes to the platform.",
    },
    {
      q: "How quickly will I see results from PPC?",
      a: "Paid ads can produce leads in the first week. Most campaigns see their first qualified calls within 7 to 14 days of launch, and results improve as the data comes in.",
    },
    {
      q: "Can competitors bid on my brand name?",
      a: "Yes, and many do. It is legal for a competitor to bid on your business name, so their ad can appear above your own listing when someone searches for you. Branded search defense protects the customers you already earned.",
    },
  ],
  related: [
    { href: "/services/local-seo", label: "Local SEO services", desc: "The traffic that keeps coming when the ads stop." },
    { href: "/services/website-build", label: "Small business website design", desc: "Landing pages that turn clicks into calls." },
    { href: "/free-tools", label: "Free website audit", desc: "Check your site before you pay for traffic." },
  ],
};

export const metadata: Metadata = pageMeta({ path: D.path, title: D.title, description: D.description });

export default function Page() {
  return <LocalServicePage d={D} />;
}
