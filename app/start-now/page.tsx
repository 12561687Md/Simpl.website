import type { Metadata } from "next";
import Link from "next/link";
import StartSearch from "./StartSearch";
import StartLeadCard from "./StartLeadCard";
import { SimplWordmark } from "@/components/ui/simpl-brand";

export const metadata: Metadata = {
  title: "Fix your business | Simpl",
  description: "Find your business and start your free demo, or contact us directly. Real people reply the same business day.",
  alternates: { canonical: "https://simpl.pro/start-now" },
};

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none"; };

/* Score card: gauge + grade, colored by value. */
function ScoreCard({ label, score, word, wordColor, ring, sub, style }: { label: string; score: number; word: string; wordColor: string; ring: string; sub?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", color: "#0f1a12", borderRadius: 12, padding: "11px 12px", boxShadow: "0 22px 46px -16px rgba(0,0,0,0.5)", textAlign: "center", ...style }}>
      <div style={{ fontSize: 8, color: "#6b6b6b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 58, height: 58, borderRadius: "50%", background: `conic-gradient(${ring} 0turn ${score / 100}turn, #e6e9e0 ${score / 100}turn 1turn)` }}>
          <div style={{ position: "absolute", inset: 5, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{score}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 800, color: wordColor, marginTop: 5 }}>{word}</div>
      {sub && <div style={{ fontSize: 8, color: "#6b6b6b", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

/* The left image: a real render of the Wildgrove hero (the site we build), with
   the Simpl audit going from bad (week 1) to 90+ a few weeks later. */
function WildgroveShot() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 470, margin: "0 auto" }}>
      {/* Browser window with the Wildgrove hero */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.16)", background: "#0e1519", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.85)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: 99, background: c }} />)}
          <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>wildgrovelandscaping.com</span>
        </div>
        {/* Wildgrove hero (photo over mowing-stripe fallback) */}
        <div style={{ position: "relative", height: 236, background: "repeating-linear-gradient(102deg, #2f6d3f 0 15px, #357a46 15px 30px)", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1722881445875-bdd5f4d9e6fa?w=1200&q=80&auto=format&fit=crop" alt="" onError={hideImg} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,18,9,0.35), rgba(6,18,9,0.8))" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px" }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: "0.02em" }}>WILDGROVE</span>
            <span style={{ background: "#eafff0", color: "#14421f", fontSize: 8.5, fontWeight: 800, padding: "5px 10px", borderRadius: 6 }}>Free quote</span>
          </div>
          <div style={{ position: "relative", padding: "14px 14px 0" }}>
            <div style={{ color: "#c6ecd0", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>Landscaping in Cary, NC</div>
            <div style={{ color: "#fff", fontSize: 21, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", marginTop: 7, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>The best lawn on the block.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <span style={{ background: "#2fb457", color: "#06210f", fontSize: 10, fontWeight: 800, padding: "7px 13px", borderRadius: 8 }}>Get my free estimate</span>
              <span style={{ color: "#ffd24a", fontSize: 11 }}>★★★★★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit, week 1: bad (red), small + faded, top-left */}
      <ScoreCard label="Week 1" score={41} word="Needs work" wordColor="#c0392b" ring="#E05252" style={{ position: "absolute", top: -14, left: -14, width: 108, opacity: 0.96 }} />

      {/* Audit, now: 90+ (green), prominent, top-right */}
      <ScoreCard label="A few weeks later" score={92} word="Great" wordColor="#2e7d32" ring="#34A853" sub="up from 41" style={{ position: "absolute", top: -20, right: -14, width: 132 }} />
    </div>
  );
}

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
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><circle cx="12" cy="12" r="10" opacity="0.4" /><path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
