"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { ScanReview } from "../lib/scan-types";

const mono = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" };

function initials(name: string | null): string {
  if (!name) return "★";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "★";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Deterministic from the name, not random — the same reviewer gets the same
// color every render instead of flickering between them.
const AVATAR_HUES = ["#89CFF0", "#34A853", "#E0A852", "#E05252", "#8A5CF0"];
function avatarColor(name: string | null): string {
  if (!name) return AVATAR_HUES[0];
  const sum = [...name].reduce((n, c) => n + c.charCodeAt(0), 0);
  return AVATAR_HUES[sum % AVATAR_HUES.length];
}

/**
 * Real reviews as clean profile cards (shadcn ReviewCard structure, rebuilt
 * in this codebase's inline-style/CSS-var idiom): avatar + name + date on
 * the left of the header, the actual star row top-right (real stars, not a
 * numeric "5.0" badge), review text below.
 *
 * Two deliberate departures from the reference component:
 *  - Initials avatar, not an image. Google reviews give us the reviewer's
 *    real name but no photo; pasting a stock face next to a real person's
 *    name would be a fabricated trust signal.
 *  - No source named anywhere on the card, same rule as the rest of the
 *    theater: the effect only works if nothing here explains itself.
 */
export default function ReviewProfileCards({ reviews, delay = 0, stagger = 2.5 }: { reviews: ScanReview[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  if (reviews.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      {reviews.map((rv, i) => {
        const color = avatarColor(rv.author);
        const stars = Math.round(rv.rating ?? 0);
        return (
          <motion.article
            key={`${rv.author}-${i}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: reduce ? 0 : delay + i * stagger }}
            aria-label={rv.author ? `Review by ${rv.author}` : "Customer review"}
            style={{
              flex: "1 1 250px",
              minWidth: 250,
              maxWidth: 340,
              // Cream card on the dark theater (the page stays dark; the
              // cream lives on the cards) — mirrors CARD in ScanTheater.tsx.
              background: "#FBF7EE",
              border: "1px solid #E8E1CF",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 16px 38px -18px rgba(0,0,0,0.55)",
            }}
          >
            {/* Header: avatar + name + date left, star row right */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 99,
                    background: color,
                    color: "#0A140D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials(rv.author)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 600, lineHeight: 1.3, color: "#211C14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {rv.author ?? "Verified customer"}
                  </h3>
                  {rv.when && (
                    <p style={{ ...mono, margin: "3px 0 0", fontSize: 11.5, color: "#6E6553" }}>{rv.when}</p>
                  )}
                </div>
              </div>
              {stars > 0 && (
                <div aria-label={`${stars} out of 5 stars`} style={{ display: "flex", gap: 2, flexShrink: 0, paddingTop: 4 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      aria-hidden="true"
                      style={{
                        width: 15,
                        height: 15,
                        color: s < stars ? "#FACC15" : "#D8D2C0",
                        fill: s < stars ? "#FACC15" : "none",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "#3F3A2F" }}>
              &ldquo;{rv.text}&rdquo;
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
