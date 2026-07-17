/**
 * GSAP + free plugins, registered once for the whole app.
 *
 * Import from here, never from "gsap" directly, so plugins are guaranteed
 * registered:  import { gsap, ScrollTrigger, Flip } from "@/app/lib/gsap";
 *
 * Registration is guarded to the client: ScrollTrigger/Observer touch window,
 * and this module can be evaluated during SSR. GSAP core is import-safe; we
 * only defer the registerPlugin call.
 *
 * The Lenis <-> ScrollTrigger bridge lives in SmoothScroll.tsx (it owns the
 * Lenis instance). Without that bridge, scroll-triggered tweens fire against
 * the native scroll position while Lenis smooths a different one, and they
 * drift. Don't animate scroll here.
 */
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register only the free plugins.
if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, Observer, ScrollTrigger);
}

export { gsap, Flip, Observer, ScrollTrigger };
