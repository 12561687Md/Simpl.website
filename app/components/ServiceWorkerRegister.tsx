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
    // Never run the SW in local dev: it caches pages and hides your edits.
    // Also actively unregister any that already installed on localhost.
    if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {});
      return;
    }
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
