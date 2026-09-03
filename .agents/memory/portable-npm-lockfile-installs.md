---
name: Portable npm lockfile installs
description: Why npm installs outside Replit must rewrite Replit-internal registry hosts.
---

Keep npm configured to replace registry hosts from the lockfile with the registry active in the current build environment.

**Why:** Replit package installation can record `package-firewall.replit.local` tarball URLs in `package-lock.json`. External builders such as Vercel cannot resolve that internal hostname, even though the pinned package versions and integrity hashes are valid.

**How to apply:** Preserve `replace-registry-host=always` in project npm configuration when the same repository is installed both on Replit and external CI/deployment providers.