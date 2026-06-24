import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Spend",
  description: "SIMPL monitors your Google Ads, Meta Ads, and paid campaigns for wasted spend, competitor bidding, landing page mismatches, and budget leaks.",
  alternates: { canonical: "https://simpl.pro/spend" },
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Coverage · Spend"
      code="04 / SPEND"
      headline="You're paying for clicks."
      accentTail="Do you know where they go?"
      sub="SIMPL watches your paid campaigns for the silent leaks: competitors bidding on your name, dead keywords eating budget, landing pages that don't match the ad."
      subHook="You're already paying for the clicks. The question is whether anyone's checking where that money actually goes."
      watches={[
        { code: "01", title: "Branded search defense", desc: "Competitors bidding on your company name. They're intercepting traffic you already earned." },
        { code: "02", title: "Wasted spend detection", desc: "Keywords that cost money and convert nothing. Campaigns burning budget on irrelevant searches." },
        { code: "03", title: "Landing page mismatch", desc: "Ad copy promises one thing. The landing page says something else. Google penalizes the mismatch, and you pay more per click." },
        { code: "04", title: "Bid efficiency", desc: "Are you overpaying for clicks competitors get cheaper? SIMPL benchmarks your CPC against the category." },
        { code: "05", title: "Cross-platform inventory", desc: "Google, Meta, Bing. Every active campaign tracked in one place. No more spreadsheet reconciliation." },
        { code: "06", title: "Budget pacing", desc: "Are you burning through monthly budget by the 15th? SIMPL tracks daily spend against targets." },
      ]}
      watchesHook="Tracking spend is the easy part. The hard part is catching the waste before it compounds. Here's how fast it adds up."
      miss={[
        "A competitor starts bidding on your brand name. Your cost per lead doubles. You don't realize it for two months.",
        "An agency leaves a test campaign running. It burns $800/month on irrelevant keywords. Nobody reviews the account.",
        "Google auto-applies a recommendation that broadens targeting. Irrelevant clicks spike. The dashboard still looks green.",
        "Your best landing page gets a CMS update that breaks the form. Paid traffic flows. Leads don't. You blame the ad copy.",
        "Meta campaign runs out of budget mid-month. Nobody notices until the phone stops ringing.",
        "A negative keyword list gets deleted. Spend on garbage searches triples overnight. The monthly report buries it in averages.",
      ]}
      missHook="Sound extreme? Every dollar amount in this list came from a real account. Here's one."
      findingBody="An HVAC company was spending $1,200/month on Google Ads for three keywords that hadn't generated a single conversion in 90 days. SIMPL flagged the dead spend within 48 hours. That's $14,400/year on fire."
      findingStat="$14,400"
      findingLabel="annual waste identified"
      findingHook="That's just ad spend. But the landing pages those ads pointed to, the reviews customers saw when they arrived, whether Google could even find the site organically: that's the full picture."
      related={[
        { href: "/discoverability", title: "Discoverability", blurb: "Indexing, profile health, map rank, schema." },
        { href: "/performance", title: "Performance", blurb: "Speed, uptime, broken forms, checkout." },
        { href: "/reputation", title: "Reputation", blurb: "What's being said about you across the web." },
      ]}
    />
  );
}
