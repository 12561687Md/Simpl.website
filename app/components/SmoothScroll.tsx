"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Reduced-motion users get instant native scroll, no Lenis, no bridge.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    // Bridge Lenis <-> ScrollTrigger: keep ScrollTrigger's cached positions in
    // step with Lenis, and drive Lenis from GSAP's ticker so both animate on a
    // single rAF loop (no double loop, no drift). lagSmoothing(0) stops GSAP
    // from time-scaling after a stutter, which would desync the two.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis.raf expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return <>{children}</>;
}
