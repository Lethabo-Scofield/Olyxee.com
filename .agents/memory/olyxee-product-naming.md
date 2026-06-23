---
name: Olyxee product naming architecture
description: How product display names map to legacy URLs/identifiers, and which products are standalone vs internal.
---

# Olyxee product naming architecture

Display labels were renamed sitewide, but **URLs, domains, routes, image paths, and code identifiers were deliberately kept on the old names**. When editing copy, change only human-visible text — never the technical identifiers.

Current public product lineup (display names): Orgni (flagship), Orgni Finance, Orgni Workflows, Order Loop, Olyxee Document Integrity. Togent retained but not part of the headline lineup.

Display label → kept legacy technical name:
- `Orgni Finance` ← display; URLs/paths still `addup` (addup.olyxee.com, /Logo/Addup_Logo.png, /images/addup/*)
- `Orgni Workflows` ← display; URLs/paths still `ordo` (ordo.olyxee.com, /products/ordo, /images/ordo-logo.png, OrdoPage/OrdoLayout, ORDO_API_KEY, `pip install ordo`)
- `Olyxee Document Integrity` ← display (was briefly "Orgni Docs", now fully renamed sitewide); route still `/document-integrity`
- `Order Loop` ← display; path still `/images/courier-loop-logo.png`, brand "Olyxee Logistics" at logistics.olyxee.com
- `Togent` — unchanged

Product hierarchy decisions:
- **Orgni** is the NEW flagship core-infrastructure product (not a rename of anything). "What is Orgni?" copy describes it as the layer connecting business context, workflows, documents, systems, decisions.
- Orgni Finance / Workflows / Olyxee Document Integrity are positioned as Orgni sub-products.
- **Cortex** is retired from all public-facing copy. The `/research/cortex` page was deleted and now 307-redirects to `/research`; it is removed from sitemap and llms.txt. The `@olyxee/cortex` package name and lowercase `cortex` internal search-keyword tokens are kept (not user-visible). Olyxee Cortex / Grysics / Addup / Ordo must not appear as visible product names anywhere.

**Why:** User explicitly declared Grysics, Addup, Ordo, and Olyxee Cortex "old things" and the current lineup is Orgni, Orgni Finance, Orgni Workflows, Order Loop, Olyxee Document Integrity. This supersedes the earlier decision to keep the Cortex research page. A code-review pass that treats this as "rename-only" will wrongly flag the Cortex page deletion and the flagship copy — they are correct.

**How to apply:** For any future copy edit, rename display text per the map above but leave every URL/route/domain/image-path/function-name/env-var/id on its legacy name.
