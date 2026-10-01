---
name: Video whitespace measurement
description: Reliably distinguish empty light-colored video margins from moving artwork.
---

Convert to grayscale before inverting a light-background video to measure its content bounds. Check the union of bounds across every frame, with safety padding, rather than trimming from a single still.

**Why:** Inverting limited-range YUV directly made the pale background pass a nominal black threshold; increasing that threshold instead excluded faint artwork. Grayscale bounds gave a reliable distinction. Motion can also extend beyond the bounds visible in one frame.

**How to apply:** When removing empty canvas around an uploaded clip, verify the full animation before choosing the trim window. Preserve the artwork and its proportions, keep the original asset, and use the same framing for the poster and every video fallback.