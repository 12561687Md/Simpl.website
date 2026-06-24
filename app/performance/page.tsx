import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Performance",
  description: "SIMPL monitors your website uptime, Core Web Vitals, contact forms, and checkout flows. When something breaks silently, you'll know in minutes.",
  alternates: { canonical: "https://simpl.pro/performance" },
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Coverage · Performance"
      code="02 / PERFORMANCE"
      headline="Your site is open 24/7."
      accentTail="Is it actually working?"
      sub="SIMPL watches the things that break silently: uptime drops, slow pages, broken forms, checkout failures, and the plugin updates that cause all of them."
      subHook="The worst part? Your site can look perfectly fine while quietly losing every lead that tries to contact you."
      watches={[
        { code: "01", title: "Uptime monitoring", desc: "60-second resolution. When your site goes down at 2am, SIMPL knows before your customers do." },
        { code: "02", title: "Core Web Vitals", desc: "LCP, INP, CLS. The metrics Google uses to rank your site. Tracked across mobile and desktop." },
        { code: "03", title: "Form submission delivery", desc: "Contact forms that stop sending emails after a plugin update. The silent failure that costs more than downtime." },
        { code: "04", title: "Checkout & order flow", desc: "Payment pages, cart flows, booking systems, tested for breakage after every third-party script change." },
        { code: "05", title: "Plugin & CMS regressions", desc: "WordPress updates that break layouts. Shopify theme changes that hide buttons." },
        { code: "06", title: "Mobile rendering", desc: "How your site actually looks and works on a phone. Not a responsive checkbox. A real rendering check." },
      ]}
      watchesHook="Monitoring six signals sounds thorough. But here's what keeps happening to businesses that think they're covered."
      miss={[
        "Contact form stops delivering emails after a WordPress plugin update. A week of leads vanishes. The form still shows a success message.",
        "Site goes down for 4 hours on a Saturday. Nobody notices until Monday morning.",
        "A JavaScript error breaks the booking widget on mobile. Desktop works fine. You never test from your phone.",
        "Page speed drops below Google's threshold after uncompressed images. Rankings slide for weeks before anyone connects the dots.",
        "SSL certificate expires. Chrome shows a full-page warning to every visitor. Your hosting company doesn't notify you.",
        "A third-party chat widget throws errors. Page load time doubles overnight. You blame the hosting.",
      ]}
      missHook="Every one of these happened to a real business. Here's one we caught."
      findingBody="A landscaping company's contact form stopped delivering submissions after a plugin auto-update. The form still showed a success message, but emails never arrived. SIMPL detected the silent failure within 3 hours."
      findingStat="3 hours"
      findingLabel="from failure to alert"
      findingHook="That's performance. But a fast, working site that nobody can find is just an expensive business card. And a site with terrible reviews converts even less."
      related={[
        { href: "/discoverability", title: "Discoverability", blurb: "Indexing, profile health, map rank, schema." },
        { href: "/reputation", title: "Reputation", blurb: "Reviews, sentiment, response cadence." },
        { href: "/spend", title: "Spend", blurb: "Where your marketing dollars actually go." },
      ]}
    />
  );
}
