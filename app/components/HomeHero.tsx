"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BusinessSearch, { type Prediction } from "./BusinessSearch";
import UrlFallbackScanner from "./UrlFallbackScanner";
import PhoneLoop from "./PhoneLoop";
import TextMorph from "@/components/ui/text-morph";
import { StarsCanvas } from "@/components/ui/stars-canvas";
import HeroCurvedBottom from "./HeroCurvedBottom";

/**
 * The hero is now purely an entrance. Scanning used to happen in place, which
 * meant the results had nowhere to live and no URL to return to; it now hands
 * off to /audit, where the scan gets a full page and a shareable address.
 *
 * The URL fallback is the one exception: it swaps ScanTool in over the
 * business search rather than navigating to /scan, because leaving the
 * homepage for a business that just failed to find their listing is the
 * exact moment they're most likely to bounce.
 */
export default function HomeHero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [urlMode, setUrlMode] = useState(false);

  function startAudit(p: Prediction) {
    // Name and address ride along from the prediction, which we already have for
    // free. That lets the gate greet them by name without spending a Places
    // Details call on someone who might not fill it in. Display-only: the server
    // trusts nothing here but placeId.
    const q = new URLSearchParams({ place: p.placeId, name: p.name, address: p.address });
    router.push(`/audit?${q}`);
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Big rotating starfield for the hero "sky", contained to the hero and
          layered over the shared small SpaceField. The small field continues
          below into the rest of the page, so the hero flows into section 2 with
          no flat-black cut. Vignette keeps the centred copy legible. */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <StarsCanvas className="!absolute" hue={205} speedMultiplier={0.08} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(90% 80% at 50% 40%, rgba(11,12,13,0.55) 0%, rgba(11,12,13,0.25) 55%, transparent 100%)",
          }}
        />
      </div>
      <section
        style={{
          // zIndex 2 (above HeroCurvedBottom's zIndex 1) so the business-search
          // results dropdown renders in FRONT of the curve/half-circle instead
          // of disappearing behind it.
          position: "relative",
          zIndex: 2,
          maxWidth: 1120,
          margin: "0 auto",
          // Top clearance for the fixed 92px header + a little breathing room;
          // trimmed from 132 to shrink the hero.
          padding: "110px 32px 16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0 auto",
            fontSize: "clamp(36px, 5.6vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            maxWidth: 940,
          }}
        >
          Your business is always online.
          <br />
          Simpl makes sure it&apos;s always{" "}
          <TextMorph words={["winning.", "ranking.", "running."]} interval={2200} />
        </h1>

        {/* The pitch paragraph lived here and was cut on purpose: it was the only
            thing competing with the scan input for attention. It is not retired —
            it's the root description of Simpl (see .agents/product-marketing.md)
            and needs a permanent home further down the page. */}

        {/* Owner-style hero unit: the mini scrolling iPhone (a live Simpl audit
            cycling its tabs) boxed in a card, with the search bar pinned at the
            bottom of the card. The privacy reassurance line was removed. */}
        <div style={{ marginTop: 44 }}>
          <div
            className="hero-audit-card"
            style={{
              maxWidth: 372,
              margin: "0 auto",
              border: "1px solid var(--rule-strong)",
              borderRadius: 28,
              background: "linear-gradient(180deg, rgba(137,207,240,0.07), rgba(19,21,23,0.55))",
              boxShadow: "0 44px 120px -54px rgba(137,207,240,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
              padding: "26px 18px 18px",
            }}
          >
            <PhoneLoop />

            {/* Search bar at the bottom of the card. */}
            <div style={{ marginTop: 22, textAlign: "left", position: "relative" }}>
              <AnimatePresence mode="wait" initial={false}>
                {urlMode ? (
                  <motion.div
                    key="url"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <UrlFallbackScanner />
                    <button
                      type="button"
                      onClick={() => setUrlMode(false)}
                      className="mono"
                      style={{
                        marginTop: 14,
                        color: "var(--muted)",
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        font: "inherit",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      ← Search by business name instead
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="business"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* Name-first search. Asking a contractor for their domain
                        assumes they know it; asking for their business name
                        assumes nothing, and the listing hands us the domain
                        anyway. */}
                    <BusinessSearch onSelect={startAudit} autoFocus />

                    {/* Escape hatch for businesses without a strong Google
                        listing. Swaps ScanTool in over the search. */}
                    <div style={{ marginTop: 12, textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => setUrlMode(true)}
                        style={{
                          color: "var(--accent)",
                          background: "transparent",
                          border: 0,
                          padding: 0,
                          font: "inherit",
                          fontSize: 11.5,
                          cursor: "pointer",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--accent)",
                          paddingBottom: 1,
                        }}
                      >
                        Can&apos;t find your business? Scan by URL →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Curved, glowing hero bottom: the platform marquee sits on a baby-blue
          horizon with rising sparkles. Replaces the old plain rule / character. */}
      <HeroCurvedBottom />
    </div>
  );
}
