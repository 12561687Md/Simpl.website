"use client";

import { useEffect, useState } from "react";

/**
 * A 3D coverflow that showcases many images at once (center + tilted left/right),
 * auto-advancing on an interval. Adapted from the circular-testimonials style but
 * image-only, so it drops into a fixed-height showcase box. An optional `overlay`
 * (e.g. a glass result badge) floats over the active image, and a caption line
 * can name what's on screen. onError hides a failed image instead of a broken
 * tile. Pauses while the tab/window is hidden.
 */
export interface CoverflowImage {
  src: string;
  alt: string;
  /** Optional short caption shown under the stage when this image is active. */
  caption?: string;
}

export default function ImageCoverflow({
  images,
  interval = 1000,
  overlay,
  rounded = 16,
}: {
  images: CoverflowImage[];
  interval?: number;
  overlay?: React.ReactNode;
  rounded?: number;
}) {
  const [active, setActive] = useState(0);
  const n = images.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setActive((p) => (p + 1) % n);
    }, interval);
    return () => clearInterval(t);
  }, [n, interval]);

  const styleFor = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "62%",
      height: "82%",
      objectFit: "cover",
      borderRadius: rounded,
      boxShadow: "0 26px 60px -26px rgba(0,0,0,0.75)",
      transition: "transform 0.75s cubic-bezier(.4,1.3,.4,1), opacity 0.75s ease",
      willChange: "transform, opacity",
    };
    const isActive = i === active;
    const isLeft = (active - 1 + n) % n === i;
    const isRight = (active + 1) % n === i;
    if (isActive) return { ...base, transform: "translate(-50%,-50%) scale(1) rotateY(0deg)", opacity: 1, zIndex: 3 };
    if (isLeft) return { ...base, transform: "translate(-95%,-46%) scale(0.8) rotateY(30deg)", opacity: 0.82, zIndex: 2 };
    if (isRight) return { ...base, transform: "translate(-5%,-46%) scale(0.8) rotateY(-30deg)", opacity: 0.82, zIndex: 2 };
    return { ...base, transform: "translate(-50%,-50%) scale(0.62)", opacity: 0, zIndex: 1, pointerEvents: "none" };
  };

  const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.visibility = "hidden"; };
  const caption = images[active]?.caption;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", flex: 1, minHeight: 0, perspective: 1200 }}>
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={img.src + i} src={img.src} alt={img.alt} onError={hideOnError} style={styleFor(i)} />
        ))}
        {overlay ? (
          <div style={{ position: "absolute", left: "20%", bottom: 14, zIndex: 4 }}>{overlay}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 12, minHeight: 22 }}>
        {caption ? (
          <span style={{ fontSize: 12.5, color: "var(--muted)", marginRight: 4 }}>{caption}</span>
        ) : null}
        {images.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              width: i === active ? 16 : 6,
              height: 6,
              borderRadius: 999,
              background: i === active ? "var(--accent)" : "var(--rule-strong)",
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
