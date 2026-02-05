# Specification

## Summary
**Goal:** Make the mobile on-screen Left/Right buttons reliably steer the player car by using robust touch/pointer handling that correctly sets and clears the shared control state.

**Planned changes:**
- Update the on-screen control buttons to use mobile-safe input events (pointer and/or touch events) so press-and-hold sets Left/Right control state and release/cancel always clears it.
- Ensure touch cancel / pointer cancel (including lifting outside the button) clears the active control so the car does not keep steering.
- Prevent unwanted browser gestures (scroll/zoom) triggered by interacting with the on-screen controls during gameplay.
- Keep existing gameplay behavior intact and ensure keyboard ArrowLeft/ArrowRight controls continue to work as before.

**User-visible outcome:** On mobile, pressing and holding Left/Right moves the car left/right reliably, and releasing (even off the button) immediately stops steering without accidental page scrolling/zooming.
