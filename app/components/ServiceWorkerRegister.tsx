"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js after load so it never competes with first paint. The
 * service worker is what makes the site installable (desktop/home screen) and
 * gives an offline fallback. Registration failures are swallowed: a missing SW
 * must never break the page.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
