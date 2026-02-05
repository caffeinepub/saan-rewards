# Specification

## Summary
**Goal:** Make the Traffic Jam game online-only by blocking gameplay without an active internet connection, and prevent PWA offline caching from enabling play.

**Planned changes:**
- Add an in-game connectivity gate that blocks starting or continuing gameplay when the device is offline, and blocks immediately if the connection drops mid-session.
- Provide a clear blocking UI with a retry/continue path that unblocks when connectivity is restored (without requiring a full manual reset).
- Adjust PWA service worker behavior so game assets are not cached/served for offline gameplay, while keeping offline navigation routed to the existing offline page (offline.html).
- Update Help/About content (English only) to state that an active internet connection is required and offline play is not supported.

**User-visible outcome:** If the user is offline (or goes offline), the game shows a blocking message requiring internet and prevents play; once reconnected, the user can continue. Reloading/navigating while offline shows the offline page rather than allowing the game to run from cached assets.
