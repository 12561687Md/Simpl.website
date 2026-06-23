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
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
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
        boxShadow: "0 4px 24px rgba(143,180,168,0.25), 0 2px 8px rgba(0,0,0,0.4)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        letterSpacing: "0.04em",
      }}
    >
      Run free scan ↑
    </a>
  );
}
