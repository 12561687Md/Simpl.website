"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position, animate }: { position: number; animate: boolean }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Cream lines on our dark page, not the original slate/white. Kept neutral
          on purpose — the brand green stays a sparse accent, not the backdrop. */}
      <svg
        className="w-full h-full"
        style={{ color: "var(--fg)" }}
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              animate
                ? { pathLength: 1, opacity: [0.2, 0.45, 0.2], pathOffset: [0, 1, 0] }
                : { pathLength: 1, opacity: 0.35 }
            }
            transition={
              animate
                ? { duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                : { duration: 0 }
            }
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Your Digital Presence, Handled",
  ctaText = "Find what's broken",
  ctaHref = "/scan",
}: {
  title?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0">
        <FloatingPaths position={1} animate={!reduce} />
        <FloatingPaths position={-1} animate={!reduce} />
      </div>

      <div className="relative z-10 mx-auto px-4 md:px-6 text-center" style={{ maxWidth: 900 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.4 }}
        >
          <h1
            className="font-semibold mb-10"
            style={{ fontSize: "clamp(36px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={reduce ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: reduce ? 0 : wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(180deg, var(--fg), var(--muted))" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="inline-block group relative rounded-2xl p-px overflow-hidden transition-shadow duration-300"
            style={{ background: "linear-gradient(180deg, var(--accent-line), transparent)" }}
          >
            <Button
              asChild
              variant="ghost"
              className="rounded-[1.05rem] px-8 py-6 text-base font-semibold transition-all duration-300 group-hover:-translate-y-0.5"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              <Link href={ctaHref}>
                <span>{ctaText}</span>
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
