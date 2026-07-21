"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BusinessSearch, { type Prediction } from "./BusinessSearch";
import UrlFallbackScanner from "./UrlFallbackScanner";
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

        <div style={{ marginTop: 40 }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("[data-section='simpl-score']")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 1,
                fontSize: 11,
              }}
            >
              How it works ↓
            </a>
          </div>

          <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "left", position: "relative" }}>
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
                  <BusinessSearch onSelect={startAudit} autoFocus movingBorder />

                  {/* Reassurance sits directly under the input, where the
                      hesitation is. Worded to stay true after the email gate:
                      we do store an address now, so the promise is about
                      credentials and selling, not storage in general. */}
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 12,
                      letterSpacing: "0.06em",
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ opacity: 0.75 }}>Your data stays private. We never store credentials or sell your details.</span>
                    {/* Escape hatch for businesses without a strong Google
                        listing (no address, brand-new, or ecommerce like home
                        health). Swaps ScanTool in over the search rather than
                        navigating away. */}
                    <button
                      type="button"
                      onClick={() => setUrlMode(true)}
                      style={{
                        color: "var(--accent)",
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        font: "inherit",
                        fontSize: 11,
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
      </section>

      {/* Curved, glowing hero bottom: the platform marquee sits on a baby-blue
          horizon with rising sparkles. Replaces the old plain rule / character. */}
      <HeroCurvedBottom />
    </div>
  );
}
