# Changelog

All notable changes to this project are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [semantic versioning](https://semver.org/).

## [1.0.0] - 2026-11-27

The first proper release. It fixes the layout bug behind patchy digits, makes the page work on phones and keyboards, and gives the repo the full set of files.

### Fixed
- **Patchy digits.** The code waited for `document.fonts.ready`, but that only waits for fonts already in use, and nothing used Roboto Black yet. So the words were measured against a fallback font while the clip used the real one. All three weights are now loaded explicitly before anything is measured.
- **Custom words could run code.** Typed words went into the page's HTML unescaped, so `<img onerror=...>` would run. A word with `&` (like "R&D") also broke its digit. Words are now escaped and always shown as plain text.
- **Phone layout.** On phones the header controls ran off the edge of the screen, so Light, Glow, Speed, Palette and + couldn't be reached. Below 860 px the header now wraps into rows, with every control visible.
- **Frozen page on load.** Laying out the words took several seconds on slower devices, because every one of about 90,000 attempts re-parsed the font and re-measured a word. Each word is now measured once and scaled: about 60 times faster.
- A double-click also fired two "flash" effects before reshuffling.
- Every custom word containing an "r" was coloured slate, because the one-letter rule for "R" matched any "r".

### Added
- Keyboard support: Tab to a digit, **Enter** or **Space** reshuffles it. Every control has a visible focus ring, and the toggles are announced as switches.
- Double-tap to reshuffle on phones and tablets.
- Light mode, glow, animation and palette are remembered between visits.
- The Anim toggle starts off for visitors who ask their device for less motion.
- A footer explaining the click and double-click actions.
- Sharing tags (title, description, image) and a favicon.
- Live demo on GitHub Pages.
- Smoke tests in a headless browser at five screen widths, run in CI on every push and pull request.
- README banner, GitHub social preview and screenshots, built from the live page by `assets/build.mjs`.
- `CHANGELOG.md`, `SECURITY.md`, `CONTRIBUTING.md` and Dependabot.

### Changed
- Roboto is now embedded in the page instead of loaded from Google Fonts: no third-party request, and it works offline and straight from disk.
- `typography-digits-v4.html` is now `index.html`, so GitHub Pages serves it at a clean address.
- The header is sticky instead of fixed, so it never covers the digits.
- Muted text and controls are brighter in dark mode and darker in light mode, to meet WCAG AA contrast. The + button and speed slider are bigger and easier to tap.
- Licence year corrected to 2026, when the project was created.

### Removed
- Four raw screenshots (15 MB) from the repo root, replaced by `assets/screenshots/` (under 300 KB in total).

## [0.4.0] - 2026-05-19

The "v4, Edge-Fill Edition" draft: canvas pixel mask, two-gate placement, SVG clipPath rendering, animations, glow, speed, palettes and custom words. The licence was later switched to the standard MIT text (26 October 2026).
