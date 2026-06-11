---
name: Olyxee product naming architecture
description: How product display names map to legacy URLs/identifiers, and which products are standalone vs internal.
---

# Olyxee product naming architecture

Display labels were renamed sitewide, but **URLs, domains, routes, image paths, and code identifiers were deliberately kept on the old names**. When editing copy, change only human-visible text — never the technical identifiers.

Display label → kept legacy technical name:
- `Orgni Finance` ← display; URLs/paths still `addup` (addup.olyxee.com, /Logo/Addup_Logo.png, /images/addup/*)
- `Orgni Workflows` ← display; URLs/paths still `ordo` (ordo.olyxee.com, /products/ordo, /images/ordo-logo.png, OrdoPage/OrdoLayout, ORDO_API_KEY, `pip install ordo`)
- `Orgni Docs` ← display; route still `/document-integrity`
- `Order Loop` ← display; path still `/images/courier-loop-logo.png`, brand "Olyxee Logistics" at logistics.olyxee.com
- `Togent` — unchanged

Product hierarchy decisions:
- **Orgni** is the NEW flagship core-infrastructure product (not a rename of anything). "What is Orgni?" copy describes it as the layer connecting business context, workflows, documents, systems, decisions.
- Orgni Finance / Workflows / Docs are positioned as Orgni sub-products.
- **Cortex** is an internal layer inside Orgni, NOT a standalone product. It was deliberately de-listed from the footer/product lists. Its research page (/research/cortex), `@olyxee/cortex` package, and research copy were intentionally left unchanged.

**Why:** The task scope explicitly covered "product hierarchy," so footer IA changes and Cortex de-listing are intentional, not scope drift. A code-review pass that treats this as "rename-only" will wrongly flag the footer restructure, the `What is Orgni?` flagship copy, and the Cortex removal — they are correct.

**How to apply:** For any future copy edit, rename display text per the map above but leave every URL/route/domain/image-path/function-name/env-var/id on its legacy name.
