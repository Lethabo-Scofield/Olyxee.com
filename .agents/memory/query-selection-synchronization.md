---
name: Query-driven selections
description: Avoid selection and receipt mismatches during rapid Next.js shallow navigation.
---

Use the router query as the single source of truth for selections whose identity is in the URL. Avoid optimistically copying the selection into local state and relying on a passive effect to reconcile it.

**Why:** During testing, the browser URL changed to a new internship before React observed the new query. Immediate Back restored the original URL but left the optimistic selection showing the other role: the passive effect never observed an intermediate query change.

**How to apply:** Derive the active selection from the normalized query. Scope success to the identity actually submitted, invalidate pending submissions when navigation starts, and make history tests verify rendered selection as well as the URL.