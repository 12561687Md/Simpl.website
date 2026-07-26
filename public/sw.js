/* Simpl service worker.
 *
 * Deliberately conservative so it can never break the live site:
 *  - Page navigations are NETWORK-FIRST, so we never serve stale HTML; the
 *    cache is only a fallback when the network is unavailable (offline).
 *  - Same-origin static assets (Next's content-hashed JS/CSS/images/fonts) are
 *    cache-first, which is safe because a new deploy ships new hashed URLs.
 *  - Cross-origin requests are ignored entirely (APIs, remote images).
 */
const CACHE = "simpl-v1";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.add(OFFLINE_URL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return; // never touch cross-origin

  // Navigations: network-first, fall back to cache / offline shell.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Static assets: cache-first, then network (and cache the result).
  if (["style", "script", "image", "font"].includes(req.destination)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
              return res;
            })
            .catch(() => cached)
      )
    );
  }
});
