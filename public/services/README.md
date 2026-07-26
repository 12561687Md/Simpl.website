# Service hero photos

Drop real photos here and the matching service page's hero turns into a
Toast-style two-column layout (copy left, photo right). Real photos of actual
jobs, crews, trucks, and owners build the "I can relate to this" trust that a
text-only hero can't. Client/job photos beat stock every time.

## Image spec
- **Aspect:** landscape, roughly 4:3 (the hero frame is `aspect-ratio: 4/3`).
- **Size:** ~1600 x 1200 px is plenty. Export JPG or WebP, aim for under ~400 KB.
- **Subject:** the work, the people, or the result, not a logo or a stock handshake.
- **Filename:** exactly as listed below (lowercase, hyphens), so wiring is automatic.

## What each page wants

| Page | File to drop here | Good subject |
|---|---|---|
| CRM & AI Automation (`/services/ai-quoting-agent`) | `crm-automation.jpg` | An owner/tech answering a customer on the job, phone in hand |
| Custom Website (`/services/website-build`) | `website-build.jpg` | A finished site on a laptop/phone, or an owner reviewing it |
| Quick Wins (`/services/quick-wins`) | `quick-wins.jpg` | Hands on a laptop fixing something, before/after energy |
| Local SEO (`/services/local-seo`) | `local-seo.jpg` | A branded truck/van in a neighborhood, or a phone showing the map result |
| Paid Ads (`/services/paid-ads`) | `paid-ads.jpg` | An owner reviewing results, or a busy job that ads booked |
| Organic Growth (`/services/organic-growth`) | `organic-growth.jpg` | A crew at work, steady-growth feel |
| Fractional CMO & Strategy (`/services/strategy`) | `strategy.jpg` | A real planning/whiteboard moment, one-on-one |
| Google Business Profile (`/services/google-business-profile`) | `google-business-profile.jpg` | A phone showing a complete Google listing with reviews |

## Wiring (one line per page)
Each page has a commented `heroImage` line. Once the file is here, uncomment it
(or tell me and I will), e.g. in `app/services/ai-quoting-agent/page.tsx`:

```ts
heroImage: { src: "/services/crm-automation.jpg", alt: "An owner answering a customer on the job" },
```

That is the whole change; the shell handles the layout, framing, and mobile stacking.
