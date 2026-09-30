---
name: Image preview verification
description: Distinguish early screenshot rendering from actual image delivery failures.
---

Do not diagnose an image delivery problem solely from an early desktop screenshot. A successful request and positive natural image width also do not prove the image has a rendered box yet.

**Why:** Early career-banner captures showed blank image areas and missing header logos even with loaded assets. The same page rendered correctly after settling; initial image bounds were zero, while later bounds matched the banner.

**How to apply:** Verify on the development domain with a clean browser load. Wait for page hydration, image completion, positive natural width, and nonzero rendered bounds before capturing. Prefer a delayed browser capture over repeated workflow restarts or speculative image changes.

For browser-protocol checks, return primitive booleans from readiness assertions rather than DOM elements, and wait for the interactive control state as well as media readiness.

**Why:** Media playback can begin before React updates its pause-button label. Returning a DOM element with protocol `returnByValue` can instead fail with “Object reference chain is too long,” which is a verification-script failure, not an application failure.

**How to apply:** Coerce element-presence checks to booleans and evaluate browser functions directly instead of assembling selectors with nested quoting.