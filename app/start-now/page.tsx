import type { Metadata } from "next";
import Link from "next/link";
import StartSearch from "./StartSearch";
import StartLeadCard from "./StartLeadCard";
import WildgroveShot from "./WildgroveShot";
import { SimplWordmark } from "@/components/ui/simpl-brand";

export const metadata: Metadata = {
  title: "Fix your business | Simpl",
  description: "Find your business and start your free demo, or contact us directly. Real people reply the same business day.",
  alternates: { canonical: "https://simpl.pro/start-now" },
};

export default function FixYourBusinessPage() {
  return (
    <main className="start-split">
      {/* LEFT: logo pinned to the top (centered, big) -> render -> search -> copy */}
      <section className="start-panel start-left" style={{ textAlign: "center", justifyContent: "flex-start", paddingTop: 40 }}>
        <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex", justifyContent: "center", marginBottom: 34 }}>
          <SimplWordmark size={58} />
        </Link>

        <WildgroveShot />

        {/* Search between the render and the copy. */}
        <div style={{ maxWidth: 480, margin: "34px auto 0", width: "100%" }}>
          <StartSearch />
        </div>

        {/* SEO / conversion copy under the search. */}
        <div style={{ maxWidth: 480, margin: "22px auto 0", width: "100%", textAlign: "left" }}>
          <div className="mono" style={{ fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
            Growth platform for service businesses
          </div>
          <h1 style={{ margin: "9px 0 0", color: "#fff", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            See how service businesses win more customers online.
          </h1>
          <div style={{ marginTop: 14, display: "grid", gap: 9 }}>
            {[
              { h: "Get found by more customers.", b: "Rank higher on Google and AI search, with your 5-star reviews working for you." },
              { h: "Win more of the jobs you earn.", b: "A faster site, a complete Google profile, and follow-up that never drops a lead." },
              { h: "Get your time back.", b: "One team runs it all. You get the calls, the jobs, and your evenings." },
            ].map((x) => (
              <div key={x.h} style={{ display: "flex", gap: 9 }}>
                <span aria-hidden="true" style={{ color: "#fff", flexShrink: 0, marginTop: 1 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="10" opacity="0.45" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ fontSize: 12.5, lineHeight: 1.4, color: "rgba(255,255,255,0.92)" }}>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{x.h}</span> {x.b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT: the wide, blue-glowing lead form */}
      <section className="start-panel start-right">
        <StartLeadCard />
      </section>
    </main>
  );
}
