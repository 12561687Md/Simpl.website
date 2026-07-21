"use client";

import { Sparkles } from "@/components/ui/sparkles";

/**
 * One shared, page-wide starfield behind every section, so the whole page reads
 * as a single continuous space scene instead of a starry hero pasted on a black
 * page. This is the small, faint baby-blue star field (the same look that sits
 * "inside the curve"), NOT the big orbiting hero starfield. Fixed to the
 * viewport, non-interactive, painted on the near-black base. Sections with their
 * own solid background hide it; transparent sections let it flow through.
 */
export default function SpaceField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "var(--bg)" }}
    >
      <Sparkles density={180} color="#89CFF0" size={1.1} speed={0.4} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
