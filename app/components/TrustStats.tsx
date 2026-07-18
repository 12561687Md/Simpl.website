"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started || target === 0) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      current = Math.min(Math.round(increment * frame), target);
      setValue(current);
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return started ? value : 0;
}

export default function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Real count from /api/stats, not a growth formula presented as one — see
  // that route's comment for why this changed 2026-07-18.
  const [scanCount, setScanCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setScanCount(typeof d.scans === "number" ? d.scans : 0))
      .catch(() => setScanCount(0));
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const duration = 1800;
  const seconds = useCountUp(30, duration, visible);
  const categories = useCountUp(6, duration, visible);
  const scans = useCountUp(scanCount ?? 0, duration, visible && scanCount !== null);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--fg)", marginBottom: 8 }}>
          {visible ? `${seconds}s` : "0s"}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Average scan time. Type your URL, get your score before your coffee gets cold.</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--fg)", marginBottom: 8 }}>
          {visible ? categories : 0}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Categories scored. Website, SEO, content, social, crawlability, and Google Business Profile.</div>
      </div>
      {/* Real count only, no fallback number pretending to be real: if the
          count hasn't loaded yet or is genuinely zero, it just says zero. */}
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>
          {visible && scanCount !== null ? scans.toLocaleString() : "0"}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Sites scanned. Businesses just like yours finding out what&apos;s broken.</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>0</div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Data sold. Your scan results are yours. We don&apos;t spam, store credentials, or share your info.</div>
      </div>
    </div>
  );
}
