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

export default function FixYourBusinessPage() {
  return (
    <main className="start-split">
      {/* LEFT: branded picture + search to start the demo */}
      <section className="start-panel start-left">
        <Link href="/" aria-label="Simpl home" style={{ display: "inline-flex", marginBottom: 4 }}>
          <SimplWordmark size={26} />
        </Link>

        <h1 style={{ margin: "10px 0 0", color: "#fff", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 480 }}>
          Find your business.<br />
          <span style={{ color: "rgba(255,255,255,0.75)" }}>See your demo in seconds.</span>
        </h1>

        {/* Branded product picture (not an interactive widget). */}
        <div style={{ display: "flex", justifyContent: "center", margin: "18px 0 6px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/simpl-app-duo.png" alt="The Simpl app on phone and desktop" style={{ width: "100%", maxWidth: 440, height: "auto", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }} />
        </div>

        {/* Search bar to start the demo. */}
        <div style={{ maxWidth: 480, width: "100%" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>Find your business</div>
          <StartSearch />
        </div>
      </section>

      {/* RIGHT: the wide, blue-glowing lead form (contact us directly) */}
      <section className="start-panel start-right">
        <StartLeadCard />
      </section>
    </main>
  );
}
