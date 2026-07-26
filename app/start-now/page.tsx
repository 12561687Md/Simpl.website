import type { Metadata } from "next";
import Link from "next/link";
import StartSearch from "./StartSearch";
import StartLeadCard from "./StartLeadCard";
import PhoneLoop from "../components/PhoneLoop";
import { SimplWordmark } from "@/components/ui/simpl-brand";

export const metadata: Metadata = {
  title: "Fix your business | Simpl",
  description: "Find your business and get your free breakdown, or tell us what's going on. Real people reply the same business day.",
  alternates: { canonical: "https://simpl.pro/start-now" },
};

const BULLETS = [
  { h: "Get found by more customers.", b: "Rank higher on Google and in AI search, with your 5-star reviews working for you." },
  { h: "Win more of the jobs you already earn.", b: "A faster site, a complete Google profile, and follow-up that never drops a lead." },
  { h: "Get your time back.", b: "One team runs the whole thing. You get the calls, the jobs, and your evenings." },
];

export default function FixYourBusinessPage() {
  return (
    <main className="start-split">
      {/* LEFT: the real Simpl app (branded, interactive) with the search under it */}
      <section className="start-panel start-left">
        <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex", marginBottom: 6 }}>
          <SimplWordmark size={24} />
        </Link>

        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginTop: 8 }}>
          Growth platform for service businesses
        </div>
        <h1 style={{ margin: "12px 0 0", fontSize: "clamp(25px, 2.9vw, 36px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 480 }}>
          Your whole online presence, fixed and handled.
        </h1>

        {/* The real Simpl app, not a copied audit box. */}
        <div style={{ display: "flex", justifyContent: "center", margin: "22px 0 6px" }}>
          <PhoneLoop />
        </div>

        {/* Search right under the app. */}
        <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Find your business</div>
          <StartSearch />
        </div>

        <div style={{ marginTop: 24, display: "grid", gap: 11, maxWidth: 480, marginInline: "auto", width: "100%" }}>
          {BULLETS.map((x) => (
            <div key={x.h} style={{ display: "flex", gap: 10 }}>
              <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" opacity="0.35" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span style={{ fontSize: 13.5, lineHeight: 1.45 }}>
                <span style={{ fontWeight: 700 }}>{x.h}</span>{" "}
                <span style={{ color: "var(--muted)" }}>{x.b}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT: the wide, blue-glowing lead form that slides in */}
      <section className="start-panel start-right">
        <StartLeadCard />
      </section>
    </main>
  );
}
