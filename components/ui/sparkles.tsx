"use client";

import { useEffect, useRef } from "react";

/**
 * Dependency-free sparkle field on a single <canvas>. Replaced the original
 * tsparticles implementation: tsparticles v3 splits into ~15 sub-packages whose
 * peer-linked `@tsparticles/engine` fails to resolve under Next's bundler, and a
 * full particle engine at the top of the page fights the site's CSS-first
 * performance rule. This draws N tiny dots that drift upward and twinkle, masked
 * by the parent, so it reads the same at a fraction of the weight. Honors
 * prefers-reduced-motion by holding the field still.
 */
type SparklesProps = {
  className?: string;
  color?: string;
  density?: number;
  size?: number;
  speed?: number;
};

type P = { x: number; y: number; r: number; vy: number; ph: number; tw: number };

export function Sparkles({
  className,
  color = "#FFFFFF",
  density = 800,
  size = 1.2,
  speed = 1,
}: SparklesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (size - size / 2.5) + size / 2.5,
      vy: (Math.random() * speed + 0.1) * 0.15,
      ph: Math.random() * Math.PI * 2,
      tw: Math.random() * 0.03 + 0.008,
    });

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(0, Math.round((density * (w * h)) / 900000));
      particles = Array.from({ length: count }, make);
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of particles) {
        if (!reduce) {
          p.y -= p.vy;
          p.ph += p.tw;
          if (p.y < -2) {
            p.y = h + 2;
            p.x = Math.random() * w;
          }
        }
        ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, density, size, speed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

export default Sparkles;
