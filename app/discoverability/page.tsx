import type { Metadata } from "next";
import ServicePage from "../components/ServicePage";

export const metadata: Metadata = {
  title: "Discoverability",
  description: "Simpl monitors your Google indexing, Business Profile, map rankings, schema, and local citations. If Google can't find you, neither can your customers.",
  alternates: { canonical: "https://simpl.pro/discoverability" },
};

export default function Page() {
  return (
    <ServicePage
      eyebrow="Coverage · Discoverability"
      code="01 / DISCOVERABILITY"
      headline="When Google can't find you,"
      accentTail="neither can your customers."
      sub="Simpl watches the surfaces that decide whether anyone shows up at all: your indexing, your map listing, your business profile, the words people type when they're looking for you."
      subHook="Most businesses don't realize something is wrong until leads stop coming in. By then, the damage has been compounding for weeks."
      watches={[
        { code: "01", title: "Indexing health", desc: "Every page on your site, checked against Google's index. We see drops within hours, not weeks." },
        { code: "02", title: "Google Business Profile", desc: "Suspensions, edits, fake duplicates, owner verification, photo replacement." },
        { code: "03", title: "Map pack ranking", desc: "Your position in the local 3-pack, tracked daily against the new competitor down the street." },
        { code: "04", title: "Schema & sitemap", desc: "Structured data that breaks silently when a developer pushes. Sitemaps that stop updating." },
        { code: "05", title: "Branded SERP", desc: "What appears when someone Googles your name. Knowledge panel integrity, sitelinks, hijack attempts." },
        { code: "06", title: "Local citations", desc: "NAP consistency across directories Google cross-references. Phone numbers that drift." },
      ]}
      watchesHook="Knowing what to watch is one thing. Knowing what happens when nobody's watching is another."
      miss={[
        "Service pages drop out of Google's index three days after a CMS update. Nobody notices for six weeks.",
        "Google Business Profile gets suspended for a guideline violation. Calls drop 40% before anyone checks.",
        "A competitor's new location ranks above yours in the 3-pack. You find out from a customer.",
        "A developer adds a robots directive during a migration. Three top-converting pages stop being crawled.",
        "Your knowledge panel gets edited with wrong hours. Calls go to voicemail at 2pm.",
        "An automated directory updates your phone number to a disconnected tracking line. You wonder why the phone stopped ringing.",
      ]}
      missHook="Think none of these apply to you? One business thought the same thing. Here's what we found."
      findingBody="Three service pages on a regional plumbing site were blocked from Google's index by a robots.txt directive added during a March CMS migration. Discovered by Simpl within 11 hours."
      findingStat="11 hours"
      findingLabel="from regression to alert"
      findingHook="That was one surface. Discoverability. But what if the site was also slow, the forms were broken, and the reviews were tanking at the same time?"
      related={[
        { href: "/performance", title: "Performance", blurb: "Speed, uptime, broken forms, checkout integrity." },
        { href: "/reputation", title: "Reputation", blurb: "What's being said about you across the web." },
        { href: "/spend", title: "Spend", blurb: "Where your marketing dollars actually go." },
      ]}
    />
  );
}
