"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BusinessSearch, { type Prediction } from "./BusinessSearch";
import PlatformLogos from "./PlatformLogos";
import UrlFallbackScanner from "./UrlFallbackScanner";
import TextRotator from "./TextRotator";
import { DottedSurface } from "@/components/ui/dotted-surface";

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
      <DottedSurface />
      {/* Legibility scrim, centre-weighted to sit behind the centred copy. Much
          lighter than the old shader needed — the aura is a soft glow, not a
          busy plasma grid, so it doesn't need to be half-erased to stay readable. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(95% 85% at 50% 42%, rgba(11,12,13,0.38) 0%, rgba(11,12,13,0.2) 55%, rgba(11,12,13,0.05) 100%)",
        }}
      />
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1120,
          margin: "0 auto",
          // Enough clearance that "Your business is" doesn't rub against the
          // floating nav puck (which sits at top-5, ~80-90px tall including
          // its own padding). Matches the top padding used on every other
          // page's hero (start, scan, faq: 120-140px).
          padding: "132px 32px 40px",
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
          SIMPL makes sure it&apos;s always{" "}
          <TextRotator words={["winning.", "ranking.", "running.", "learning."]} />
        </h1>

        {/* The pitch paragraph lived here and was cut on purpose: it was the only
            thing competing with the scan input for attention. It is not retired —
            it's the root description of SIMPL (see .agents/product-marketing.md)
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
            <span>See where you stand. Find your business</span>
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
                  <BusinessSearch onSelect={startAudit} autoFocus />

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

          <PlatformLogos />
        </div>
      </section>
    </div>
  );
}
