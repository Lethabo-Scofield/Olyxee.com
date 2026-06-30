---
name: Olyxee product naming architecture
description: How product display names map to legacy URLs/identifiers, and which products are standalone vs internal.
---

# Olyxee product naming architecture

Display labels were renamed sitewide, but **URLs, domains, routes, image paths, and code identifiers were deliberately kept on the old names**. When editing copy, change only human-visible text — never the technical identifiers.

Company line (current): "Research and Infrastructure for Operational Intelligence" (was "...for Artificial Intelligence"). Emphasize operational intelligence, live business context, operational memory, decision history, model-neutral architecture; avoid framing the company/Orgni as chatbot/copilot/workflow-automation/generic enterprise AI.

Current public product lineup (display names): Orgni (single flagship platform that builds LIVE BUSINESS CONTEXT), Order Loop (SEPARATE product, customer order communication), Togent (Coming Soon), Ordo (Coming Soon verification engine). **"Orgni Finance", "Orgni Workflows", "Orgni Docs" are NO LONGER separate products** — they were folded into Orgni CAPABILITIES: financial operations, operational workflows, business memory. When a capability needs a tag/badge, use "Orgni · Financial operations" / "Orgni · Operational workflows" / "Orgni · Business memory".

Display label → kept legacy technical name:
- `Orgni Finance` ← display; URLs/paths still `addup` (addup.olyxee.com, /Logo/Addup_Logo.png, /images/addup/*)
- `Orgni Workflows` ← display; URLs/paths still `ordo` (ordo.olyxee.com, /products/ordo, /images/ordo-logo.png, OrdoPage/OrdoLayout, ORDO_API_KEY, `pip install ordo`)
- `Olyxee Document Integrity` ← display (was briefly "Orgni Docs", now fully renamed sitewide); route still `/document-integrity`
- `Order Loop` ← display; path still `/images/courier-loop-logo.png`, brand "Olyxee Logistics" at logistics.olyxee.com
- `Togent` — unchanged

Product hierarchy decisions:
- **Orgni** is the NEW flagship core-infrastructure product (not a rename of anything). "What is Orgni?" copy describes it as the platform connecting knowledge, documents, decisions, processes, systems, permissions, outcomes into one living operational context.
- Financial operations / operational workflows / business memory (formerly Orgni Finance/Workflows/Docs) are Orgni CAPABILITIES, not separate products.
- `/products/ordo` (legacy URL) is the **Orgni Workflows execution surface** (content: "ordo execute --goal", goal-to-delivery), now folded to plain "Orgni" — it is NOT the verification-engine Ordo. The Coming-Soon verification Ordo is positioned separately (e.g. products.tsx Ordo section). A code-review/architect pass WILL wrongly flag the /products/ordo copy as "overwriting Ordo's identity" — it is correct; the route name diverges from its displayed product.
- **Cortex** is retired from all public-facing copy. The `/research/cortex` page was deleted and now 307-redirects to `/research`; it is removed from sitemap and llms.txt. The `@olyxee/cortex` package name and lowercase `cortex` internal search-keyword tokens are kept (not user-visible). Olyxee Cortex / Grysics / Addup / Ordo must not appear as visible product names anywhere.

**Why:** User explicitly declared Grysics, Addup, Ordo, and Olyxee Cortex "old things" and the current lineup is Orgni, Orgni Finance, Orgni Workflows, Order Loop, Olyxee Document Integrity. This supersedes the earlier decision to keep the Cortex research page. A code-review pass that treats this as "rename-only" will wrongly flag the Cortex page deletion and the flagship copy — they are correct.

**How to apply:** For any future copy edit, rename display text per the map above but leave every URL/route/domain/image-path/function-name/env-var/id on its legacy name.
