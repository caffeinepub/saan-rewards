# Specification

## Summary
**Goal:** Replace the current Teen Patti UI with a mobile-first, offline-capable video editing PWA that runs entirely on-device and lets users import, trim, mute, and export videos.

**Planned changes:**
- Replace the primary app screen with a video editor home UI in English (no Teen Patti/game content).
- Add an on-device editing flow: import local video, show preview + duration, set trim start/end with validation, toggle mute/unmute for export, and export to a downloadable edited file with clear error + retry if export fails.
- Add a Help/About dialog explaining local-only processing (no uploads) and simple PWA install-to-home-screen steps (English).
- Update app chrome and metadata for the new video editor: header title, favicon/app icons, index.html title/description, and PWA manifest name/short_name/description/categories.
- Update service worker/offline behavior so the app shell loads offline after first visit and the editor works with local files without network; show a clear message + retry if an asset is missing offline.
- Apply a cohesive, modern visual theme suitable for a clean mobile video editor (non-blue/purple-dominant), with consistent typography, spacing, surfaces, and button hierarchy; ensure mobile-first layout with no horizontal scrolling.

**User-visible outcome:** Users can install the PWA on their phone, open it offline after first load, import a local video, trim it, mute/unmute audio, and export an edited video as a downloadable file—without uploading anything.
