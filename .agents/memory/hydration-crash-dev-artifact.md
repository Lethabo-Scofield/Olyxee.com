---
name: Hydration "crash" is a dev-only Fast Refresh artifact
description: The recurring "Start application crashed: Hydration failed" overlay is not a reproducible bug
---

The Replit "Start application artifact crashed with a runtime error" overlay on this site
is almost always the Next.js dev **hydration mismatch** overlay, surfaced to Replit by
`src/components/ErrorReporter.tsx` (it polls `[data-nextjs-dialog-overlay]` and forwards it).

**Key finding:** On clean full page loads the app hydrates with zero console errors
(verified many times). The hydration error only fires during Fast Refresh / HMR transitions
while editing, then the dev overlay persists until a clean reload — so it *looks* like a
recurring crash but is not reproducible on a fresh load.

**Why:** framer-motion v12 `motion` components render `initial` animation styles
(`opacity:0;transform:...`) during SSR; under React 19's strict hydration these can
momentarily mismatch during an HMR re-render. framer-motion 12.40 + React 19 is otherwise
correctly versioned and SSR-safe.

**Ruled out (don't re-chase these):** invalid HTML nesting (SSR HTML parsed clean — no
block-in-`<p>`, no nested `<a>`/`<button>`); `useIsMobile` (only used by unused
`ui/sidebar.tsx`, returns false on both server and first client render); `ErrorReporter`'s
`<html>`/`<body>` block (only renders on the global-error route, returns `null` otherwise);
visual-edit overlay (renders empty fragment during SSR).

**How to apply:** If the user reports this "crash", restart the workflow and load the page
fresh to confirm clean hydration before chasing a fix. Genuine render-time non-determinism
(`new Date().getFullYear()` in `footer.tsx`, `about.tsx`, `LegalLayout.tsx`) is already
guarded with `suppressHydrationWarning`. Don't make invasive changes to motion components
chasing a non-reproducible dev artifact.
