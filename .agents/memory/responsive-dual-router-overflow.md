---
name: Dual-router overflow-x-hidden
description: Both the App Router and Pages Router body tags need overflow-x-hidden separately
---

This project is a Next.js hybrid: some routes use the App Router (`src/app/layout.tsx`) and some use the Pages Router (`src/pages/_document.tsx`). Each defines its OWN `<body>`.

**Rule:** Any global body-level class (e.g. `overflow-x-hidden`) must be applied in BOTH `src/app/layout.tsx` and `src/pages/_document.tsx`, or it only takes effect on half the site.

**Why:** Mobile horizontal-scroll bug appeared only on app-router pages (homepage, /products/ordo) because `_document.tsx` had `overflow-x-hidden` but `layout.tsx` did not. The page-router pages were fine, masking the issue.

**How to apply:** When fixing layout/overflow/global body styling, check and update both files in lockstep.
