---
name: replit.md references files missing from the import
description: replit.md documents components that don't exist on disk in this imported snapshot
---

This Olyxee Next.js project was imported and `replit.md` describes files that do
NOT exist in the imported snapshot. Specifically `src/layouts/DocsLayout.tsx` and
`src/components/docs/sections/` were referenced (and imported by `src/pages/docs.tsx`)
but absent, causing `/docs` to 500 with "Module not found: Can't resolve
'../layouts/DocsLayout'". `DocsLayout` was recreated as a lightweight wrapper.

**Why:** Treat `replit.md` as aspirational documentation, not ground truth for what
exists on disk in an imported repo.

**How to apply:** Before relying on a file `replit.md` mentions, verify it exists
(`ls`/glob). If a page 500s on a missing-module error for a documented component,
the file was likely dropped during import — recreate it to match how it's consumed.
