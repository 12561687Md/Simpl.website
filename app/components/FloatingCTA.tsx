"use client";

import { useState, useEffect } from "react";

type Props = {
  /** Button text. Promise-based, never "Submit"/"Go". */
  label?: string;
  /** Arrow glyph shown after the label. Decorative, hidden from screen readers. */
  glyph?: string;
  /** CSS selector to scroll to. Omit to scroll to the top of the page. */
  target?: string;
  /** Scroll distance in px before the button appears. */
  after?: number;
};

export default function FloatingCTA({
  label = "Find my score",
  glyph = "↑",
  target,
  after = 600,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > after);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [after]);

  if (!visible) return null;

  function go(e: React.MouseEvent) {
    e.preventDefault();
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <a
      href={target || "#"}
      className="floating-cta"
      aria-label={label}
      onClick={go}
      style={{
        position: "fixed",
        bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
        right: "calc(24px + env(safe-area-inset-right, 0px))",
        background: "var(--accent)",
        color: "var(--accent-ink)",
        padding: "14px 24px",
        minHeight: 48,
        minWidth: 48,
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 4,
        textDecoration: "none",
        zIndex: 50,
        boxShadow: "0 0 0 1px rgba(143,180,168,0.5), 0 0 12px rgba(143,180,168,0.4)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
        letterSpacing: "0.04em",
      }}
    >
      {label} <span aria-hidden="true" style={{ marginLeft: 6 }}>{glyph}</span>
    </a>
  );
}
