"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * Scroll entrance: opacity + translateY only, fires once. Content is always
 * in the DOM; it is only hidden when JS is running (html.js, set in the
 * layout), so no-JS readers and crawlers see everything. Reduced motion is
 * handled in mi.css.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`m-reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
