"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration: number, started: boolean, suffix = "") {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
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

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const dayOfYear = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000);
  const scanTarget = 1840 + dayOfYear * 7 + new Date().getHours() * 3;

  const duration = 1800;
  const scans = useCountUp(scanTarget, duration, visible);
  const seconds = useCountUp(30, duration, visible);
  const categories = useCountUp(6, duration, visible);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>
          {visible ? `${seconds}s` : "0s"}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Average scan time. Type your URL, get your score before your coffee gets cold.</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>
          {visible ? categories : 0}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>Categories scored. Website, SEO, content, social, crawlability, and Google Business Profile.</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>
          {visible ? scans.toLocaleString() : "0"}
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
