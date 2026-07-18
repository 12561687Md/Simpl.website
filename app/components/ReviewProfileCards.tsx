"use client";

import { motion, useReducedMotion } from "framer-motion";
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
 * Real reviews as profile cards, side by side, not a stacked list of quote
 * blocks. No source named anywhere on the card, same rule as the rest of
 * the theater: the effect only works if nothing here explains itself.
 */
export default function ReviewProfileCards({ reviews, delay = 0, stagger = 2.5 }: { reviews: ScanReview[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  if (reviews.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {reviews.map((rv, i) => {
        const color = avatarColor(rv.author);
        return (
          <motion.div
            key={`${rv.author}-${i}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: reduce ? 0 : delay + i * stagger }}
            style={{
              flex: "1 1 220px",
              minWidth: 220,
              maxWidth: 280,
              border: "1px solid var(--rule)",
              borderRadius: 12,
              padding: "16px 18px",
              background: "var(--bg-soft)",
              boxShadow: "0 14px 34px -20px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 99,
                  background: color,
                  color: "var(--accent-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12.5,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {initials(rv.author)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {rv.author ?? "Verified customer"}
                </div>
                {rv.rating && (
                  <div aria-hidden="true" style={{ color: "var(--accent)", fontSize: 10.5, letterSpacing: 1 }}>
                    {"★".repeat(Math.round(rv.rating))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--fg)" }}>&ldquo;{rv.text}&rdquo;</div>
          </motion.div>
        );
      })}
    </div>
  );
}
