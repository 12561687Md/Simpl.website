"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Big background wordmark with a cursor-follow reveal, adapted from the nurui
 * "hover-footer" to the Simpl theme: the base + animated strokes use the brand
 * accent instead of neutral/rainbow, and colors are set explicitly (not via
 * Tailwind palette classes) so it never depends on a palette this project may
 * not define. Used behind the footer to show "Simpl" large.
 */
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const r = svgRef.current.getBoundingClientRect();
      setMaskPosition({
        cx: `${((cursor.x - r.left) / r.width) * 100}%`,
        cy: `${((cursor.y - r.top) / r.height) * 100}%`,
      });
    }
  }, [cursor]);

  const textClass = "font-bold uppercase";
  const textStyle: React.CSSProperties = { fontSize: 72, fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif", letterSpacing: "-0.02em" };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none", className)}
      style={{ cursor: "default" }}
    >
      <defs>
        <linearGradient id="simplTextGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#89CFF0" />
              <stop offset="40%" stopColor="#5AB4DE" />
              <stop offset="70%" stopColor="#3E9BC4" />
              <stop offset="100%" stopColor="#89CFF0" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="simplRevealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="simplTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#simplRevealMask)" />
        </mask>
      </defs>

      {/* faint base outline */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3" stroke="var(--rule-strong)" fill="transparent" className={textClass} style={{ ...textStyle, opacity: hovered ? 0.6 : 0.28 }}>
        {text}
      </text>
      {/* one-time accent draw-in */}
      <motion.text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3" stroke="var(--accent)" fill="transparent" className={textClass} style={textStyle}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000, opacity: 0.5 }}
        whileInView={{ strokeDashoffset: 0, strokeDasharray: 1000, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      {/* cursor-follow gradient reveal */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" stroke="url(#simplTextGradient)" strokeWidth="0.3" mask="url(#simplTextMask)" fill="transparent" className={textClass} style={textStyle}>
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 z-0"
    aria-hidden="true"
    style={{ background: "radial-gradient(125% 125% at 50% 8%, rgba(15,15,17,0.0) 45%, rgba(137,207,240,0.14) 100%)" }}
  />
);
