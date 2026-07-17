"use client";

import { cn } from "@/lib/utils";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";

type Ripple = { x: number; y: number; size: number; key: number };

/**
 * Ripple-on-press logic, extracted so both the button and the link variant
 * (ripple-link.tsx, used by the nav CTAs) share one implementation.
 */
export function useRipple(duration = 600) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const create = useCallback((event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    setRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;
    const last = ripples[ripples.length - 1];
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== last.key));
    }, duration);
    return () => clearTimeout(timeout);
  }, [ripples, duration]);

  return { ripples, create };
}

/** Absolutely-positioned ripple spans. Parent must be relative + overflow-hidden. */
export function RippleLayer({ ripples, color }: { ripples: Ripple[]; color: string }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.key}
          className="absolute animate-rippling rounded-full opacity-30"
          style={{
            width: `${r.size}px`,
            height: `${r.size}px`,
            top: `${r.y}px`,
            left: `${r.x}px`,
            backgroundColor: color,
            transform: "scale(0)",
          }}
        />
      ))}
    </span>
  );
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, children, rippleColor = "#ffffff", duration = "600ms", onClick, ...props }, ref) => {
    const { ripples, create } = useRipple(parseInt(duration, 10));

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      create(event);
      onClick?.(event);
    };

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary",
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <RippleLayer ripples={ripples} color={rippleColor} />
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";

export { RippleButton };
