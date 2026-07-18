"use client";

import Link from "next/link";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useRipple, RippleLayer } from "./ripple-button";

interface RippleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Ripple fill. Defaults to dark ink so it reads on the green CTA
   *  (--accent-ink is dark, since white text/ripple fails contrast on
   *  this bright a green). */
  rippleColor?: string;
  duration?: number;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A navigation CTA (real <Link>/anchor) with a click ripple. Adds relative +
 * overflow-hidden so the ripple clips to the button regardless of the passed
 * className. Text sits above the ripple via z-10.
 */
export function RippleLink({
  href,
  children,
  className,
  style,
  rippleColor = "#0A140D",
  duration = 600,
  onClick,
}: RippleLinkProps) {
  const { ripples, create } = useRipple(duration);

  return (
    <Link
      href={href}
      className={cn("relative overflow-hidden", className)}
      style={style}
      onClick={(e) => {
        create(e);
        onClick?.(e);
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-1">{children}</span>
      <RippleLayer ripples={ripples} color={rippleColor} />
    </Link>
  );
}
