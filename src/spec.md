# Specification

## Summary
**Goal:** Replace the current Sky Dodge experience with an original, mobile-first Teen Patti–style card game playable in-browser as a PWA, with clear non-gambling positioning.

**Planned changes:**
- Replace the current primary game shell/start flow so the app opens into a Teen Patti–style game start screen (no Sky Dodge canvas).
- Implement a complete single-player gameplay loop with English UI: start screen → deal → player actions (Fold, Call/Check, Raise) → simple opponent AI actions → showdown → win/lose → play again.
- Ensure the experience is clearly non-gambling: use play chips only, add an in-app English disclaimer (info/help/legal area), and avoid any real-money wording or payment/cashout UI.
- Add and use original, lightweight static visuals (table surface/background, card back, chip icon) stored under `frontend/public/assets/generated`.
- Update user-facing naming/text to match the new card game (English only), including the in-app header title and `frontend/public/manifest.webmanifest`.
- Update in-app help/about/legal content to describe the new card game and state that the user has full access to the project source code and included original assets.

**User-visible outcome:** Opening the app shows a Teen Patti–style card game where the user can play hands against a simple AI using play chips (Fold/Call/Check/Raise), see a clear win/lose result, read an entertainment-only disclaimer, and start the next hand.
