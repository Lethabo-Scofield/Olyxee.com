---
name: Next build vs dev cache collision
description: Running `next build` while `next dev` is up corrupts .next and yields "Cannot find module './NNN.js'" 500s on every page.
---
Never run `npm run build` (or let a review/validation subagent run it) while the "Start application" dev workflow is running.

**Why:** Both write to `.next/`. The production build overwrites the dev server's chunk manifest, and dev then 500s with `Cannot find module './339.js'` from `webpack-runtime.js` until the cache is removed. Happened twice on 2026-09-04.

**How to apply:** If you must build, either stop the workflow first, or build then `rm -rf .next` and restart the workflow. Tell review subagents explicitly not to run `next build`. Recovery is always: `rm -rf .next` + restart workflow.
