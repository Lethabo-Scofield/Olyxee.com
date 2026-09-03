---
name: Portable npm lockfile installs
description: Why npm installs outside Replit must rewrite Replit-internal registry hosts.
---

Keep committed npm lockfiles free of Replit-internal tarball URLs. Rewrite them to canonical `https://registry.npmjs.org/<package>/-/<tarball>` URLs before deploying through an external builder.

**Why:** Replit package installation can record `package-firewall.replit.local/npm/...` tarball URLs in `package-lock.json`. External builders cannot resolve that hostname. npm's `replace-registry-host=always` is not sufficient because it can preserve the extra `/npm/` path and produce invalid public URLs such as `registry.npmjs.org/npm/zod/...`.

**How to apply:** Check the lockfile for both `package-firewall.replit.local` and malformed `registry.npmjs.org/npm/` references. Validate with a cache-empty `npm ci` using `replace-registry-host=never` so the committed URLs are tested exactly.