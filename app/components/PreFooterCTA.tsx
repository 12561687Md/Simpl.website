"use client";

import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";

/**
 * The lead form block at the bottom of key pages. Rendered by
 * <Footer showLeadForm> so it appears site-wide without editing every page, and
 * opted out on pages that ARE a form (start-now) or where it doesn't belong
 * (legal).
 *
 * No reveal animation, and it must sit ABOVE the page-wide starfield. The real
 * cause of the "form disappears at the bottom" bug: <SpaceField> is a fixed,
 * opaque layer at z-index:0. <main> and <footer> are positioned, so they paint
 * over it, but this plain <section> was static and painted UNDER it, invisible.
 * position:relative + zIndex:1 lifts it above the starfield like everything else.
 */
export default function PreFooterCTA({ sourcePage }: { sourcePage?: string }) {
  const pathname = usePathname();
  const src = sourcePage ?? pathname ?? "/";
  return (
    <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--rule)", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(64px, 9vw, 112px) 32px" }}>
        <div
          style={{
            borderRadius: 24,
            border: "1px solid var(--accent-line)",
            background: "linear-gradient(155deg, rgba(137,207,240,0.12), rgba(137,207,240,0.02) 60%)",
            boxShadow: "0 40px 100px -50px rgba(137,207,240,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            padding: "clamp(32px, 5vw, 56px)",
          }}
        >
          <div className="grid-prefooter" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 18 }}>
                Ready when you are
              </div>
              <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.025em", fontWeight: 500 }}>
                Tell us about your business.<br />
                <span style={{ color: "var(--muted)" }}>We&apos;ll show you the wins waiting.</span>
              </h2>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "var(--muted)", maxWidth: 440 }}>
                Real people read every message and reply the same business day, usually within four hours. No pitch attached to a first reply, just a straight answer on where you stand and what we&apos;d do first.
              </p>
            </div>
            <ContactForm ctaLabel="Fix my business" sourcePage={src} />
          </div>
        </div>
      </div>
    </section>
  );
}
