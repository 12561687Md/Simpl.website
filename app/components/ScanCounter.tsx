"use client";

import { useState, useEffect } from "react";

export default function ScanCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000);
    const base = 1840 + dayOfYear * 7;
    const hourOffset = new Date().getHours() * 3;
    setCount(base + hourOffset);

    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 45000 + Math.random() * 30000);

    return () => clearInterval(interval);
  }, []);

  if (!count) return null;

  return (
    <span className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)" }}>
      {count.toLocaleString()}
    </span>
  );
}
