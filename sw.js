// River survey offline app: keeps everything needed to run with no signal.
const VERSION = "river-survey-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "setup.json", "river-survey-recording-sheet.pdf",
  "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fonts: keep a copy after the first visit
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(VERSION).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => new Response("", {status: 504}))));
    return;
  }
  if (url.origin !== location.origin) return;
  // App files: answer from the saved copy at once, refresh it in the background when there's signal
  e.respondWith(caches.open(VERSION).then(async c => {
    const key = req.mode === "navigate" ? "index.html" : req;
    const cached = await c.match(key, {ignoreSearch: true});
    const fresh = fetch(req).then(r => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => null);
    if (cached){ e.waitUntil(fresh); return cached; }
    return (await fresh) || new Response("Offline", {status: 503});
  }));
});
