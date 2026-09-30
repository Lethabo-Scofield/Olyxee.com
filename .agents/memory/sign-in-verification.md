---
name: Sign-in verification
description: Distinguish authentication success from a completed browser transition.
---

A successful authentication response does not prove the sign-in journey completed. Check browser navigation and the rendered destination before blaming credentials or changing authentication policy.

**Why:** Workspace sign-in was reported as indefinitely loading even when the server logged successful authentication and workspace responses. Server status codes alone did not establish that the client had left the loading state.

**How to apply:** When authentication succeeds but the user remains stuck, investigate the client transition separately. Verify real browser arrival at the authenticated workspace and persistence after reload, as well as error feedback and an enabled retry button for failed requests.