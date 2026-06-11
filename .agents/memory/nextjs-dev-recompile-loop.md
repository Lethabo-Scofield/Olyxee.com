---
name: Next.js dev infinite recompile / Fast-Refresh reload loop on Replit
description: Why the dev preview can reload every ~0.5s ("stuck, won't navigate") and how to stop it
---

# Symptom
The app preview keeps full-reloading itself every ~0.5s, so the user can't click/navigate ("stuck on landing page, doesn't redirect"). Browser console shows a non-stop `[Fast Refresh] rebuilding` / `done` loop. Server log shows back-to-back `✓ Compiled in ~400ms` **with no GET requests and no source-file changes**, and `GET /` firing repeatedly on its own.

# Root cause
Next.js webpack **dev file-watcher** was not ignoring churny platform directories. On Replit's overlay filesystem, watching `.cache`, `.local`, `.next`, `.agents`, `.config`, `.upm` makes watchpack misfire continuously → infinite recompile → Fast Refresh falls back to full page reloads → preview reloads in a loop. A free-running burst of `Compiled (N modules)` with zero requests is the tell-tale sign (pure server-side, not browser-driven).

# Fix
Add a **dev-only** `webpack.watchOptions.ignored` list in `next.config.ts` for those dirs (plus `node_modules`/`.git`). Verify by: warm a route, then watch an idle window with NO requests — it must show **0** compiles; repeat-`curl` the same route must NOT recompile after the first.

**Why:** the loop is environment-specific (overlay FS + platform dirs churning), not caused by app code, so naming/content edits are red herrings. Don't rip out Replit tooling (visual-edits `VisualEditsMessenger`/component-tagger) chasing it — the watcher scope is the lever.

# Related: corrupted `.next` causes `Unexpected end of JSON input` 500s
A separate symptom in the same incident: intermittent `⨯ SyntaxError: Unexpected end of JSON input at JSON.parse (<anonymous>) { page: '/about' }` → random `500`s. Cause: corrupted/half-written webpack persistent cache in `.next` (racing recompiles read an empty manifest JSON). Fix: stop the server, `rm -rf .next`, restart. Clearing `.next` fixes the 500s but NOT the watcher loop — they are two distinct problems.
