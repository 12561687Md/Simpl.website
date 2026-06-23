"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#"
      className="floating-cta"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        letterSpacing: "0.04em",
      }}
    >
      Run free scan ↑
    </a>
  );
}
