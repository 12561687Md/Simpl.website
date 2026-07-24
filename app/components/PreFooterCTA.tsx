"use client";

import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";
import { SlideIn } from "./ScrollReveal";

/**
 * The lead form that slides up into view as a visitor reaches the bottom of a
 * key page. Rendered by <Footer showLeadForm> so it appears site-wide without
 * editing every page, and opted out on pages that ARE a form (start-now) or
 * where it doesn't belong (legal). SlideIn from the bottom does the "slides
 * into the page on scroll" motion; reduced-motion just renders it in place.
 */
export default function PreFooterCTA({ sourcePage }: { sourcePage?: string }) {
  const pathname = usePathname();
  const src = sourcePage ?? pathname ?? "/";
  return (
    <section style={{ borderTop: "1px solid var(--rule)", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(64px, 9vw, 112px) 32px" }}>
        <SlideIn
          from="bottom"
          distance={120}
          duration={1.1}
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
            <ContactForm ctaLabel="Send it over" sourcePage={src} />
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
