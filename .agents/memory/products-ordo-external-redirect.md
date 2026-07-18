---
name: /products/ordo redirects externally
description: Local product page code never renders; next.config.ts redirects it to an external site.
---
`next.config.ts` redirects `/products/ordo` → https://orgni.olyxee.com and `/products/addup` → https://addup.olyxee.com (external projects).
**Why:** Editing `src/app/products/ordo/page.tsx` has no visible effect in preview — the dark orange page seen at that route is the external Orgni site, not local code.
**How to apply:** Before restyling/debugging any `/products/*` route, check the `redirects()` block in next.config.ts first. When the user says "product page" they may mean `/enterprise` or another local page.
