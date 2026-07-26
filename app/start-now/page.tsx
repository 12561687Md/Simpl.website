import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import StartSearch from "./StartSearch";
import { SimplWordmark } from "@/components/ui/simpl-brand";

export const metadata: Metadata = {
  title: "Fix your business | Simpl",
  description: "Find your business and get your free breakdown, or tell us what's going on. Real people reply the same business day.",
  alternates: { canonical: "https://simpl.pro/start-now" },
};

const BULLETS = [
  { h: "Get found by more customers.", b: "Rank higher on Google and in AI search. Auto-boost your 5-star reviews." },
  { h: "Win more of the jobs you already earn.", b: "A faster site, a complete Google profile, and follow-up that never drops a lead." },
  { h: "Save your time.", b: "One team runs the whole thing. You get the calls, the jobs, and your evenings back." },
];

/* Simpl-fied dashboard mockup: a site preview with a floating Simpl Score card. */
function DashboardMock() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
      {/* Browser window */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", background: "#0e1519", boxShadow: "0 40px 100px -40px rgba(0,0,0,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: 99, background: c }} />)}
          <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>yourbusiness.com</span>
        </div>
        {/* Site hero preview */}
        <div style={{ position: "relative", height: 210, background: "linear-gradient(135deg, #1b5e20, #2e7d32 60%, #43a047)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "0.02em" }}>Your Business</span>
            <span style={{ background: "#fff", color: "#14421f", fontSize: 9.5, fontWeight: 700, padding: "5px 10px", borderRadius: 6 }}>Book online</span>
          </div>
          <div style={{ position: "relative", padding: "14px 14px 0" }}>
            <div style={{ color: "#c8ecca", fontSize: 8.5, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>Top-rated in your city</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 800, lineHeight: 1.1, marginTop: 6, textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>The best in town,<br />booked in seconds.</div>
            <div style={{ marginTop: 12, display: "inline-block", background: "#fff", color: "#14421f", fontSize: 10, fontWeight: 800, padding: "7px 13px", borderRadius: 7 }}>Get a free quote</div>
          </div>
        </div>
      </div>

      {/* Floating Simpl Score card */}
      <div style={{ position: "absolute", top: -18, right: -14, width: 168, background: "#fff", color: "#0f1a12", borderRadius: 14, padding: "14px 15px", boxShadow: "0 24px 50px -18px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 78, height: 78, borderRadius: "50%", background: "conic-gradient(#34A853 0turn 0.72turn, #e6e9e0 0.72turn 1turn)" }}>
            <div style={{ position: "absolute", inset: 7, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>87</span>
              <span style={{ fontSize: 8, color: "#6b6b6b" }}>/100</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 9, color: "#6b6b6b", letterSpacing: "0.06em" }}>Simpl Score</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#2e7d32" }}>Great</div>
        </div>
        <div style={{ marginTop: 10, display: "grid", gap: 7 }}>
          {[["Search results", 0.9], ["Reviews", 0.72], ["Local listings", 0.95]].map(([t, v]) => (
            <div key={t as string}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: "#555", marginBottom: 3 }}><span>{t}</span></div>
              <div style={{ height: 4, borderRadius: 99, background: "#e6e9e0", overflow: "hidden" }}>
                <div style={{ width: `${(v as number) * 100}%`, height: "100%", background: "#34A853" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FixYourBusinessPage() {
  return (
    <main className="start-split">
      {/* LEFT: the pitch + dashboard + business search */}
      <section className="start-panel start-left">
        <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex", marginBottom: 8 }}>
          <SimplWordmark size={24} />
        </Link>

        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 4px" }}>
          <DashboardMock />
        </div>

        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>Growth platform for service businesses</div>
        <h1 style={{ margin: "12px 0 0", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 500 }}>
          See how businesses win more customers online.
        </h1>

        <div style={{ marginTop: 20, display: "grid", gap: 12, maxWidth: 460 }}>
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

        <div style={{ marginTop: 22, maxWidth: 480 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Find your business</div>
          <StartSearch />
        </div>
      </section>

      {/* RIGHT: the diagnosis / contact form */}
      <section className="start-panel start-right">
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <span style={{ display: "inline-flex", gap: 6 }}>
              <span style={{ width: 22, height: 6, borderRadius: 99, background: "var(--accent)" }} />
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--rule-strong)" }} />
            </span>
          </div>
          <h2 style={{ margin: 0, textAlign: "center", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Fix your business</h2>
          <p style={{ margin: "10px auto 0", textAlign: "center", maxWidth: 340, fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)" }}>
            Tell us what&apos;s going on, the phone&apos;s quieter, you&apos;re not showing up, the site looks dated, and we&apos;ll find what it&apos;s costing you.
          </p>
          <div style={{ marginTop: 20 }}>
            <ContactForm ctaLabel="Fix my business" sourcePage="/start-now" />
          </div>
          <p className="mono" style={{ marginTop: 14, textAlign: "center", fontSize: 10.5, color: "var(--fg-dim)", lineHeight: 1.5 }}>
            Real people reply the same business day. No pitch attached to a first reply.
          </p>
        </div>
      </section>
    </main>
  );
}
