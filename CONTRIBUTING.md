# Contributing

Thanks for your interest. Issues and pull requests are welcome, especially bug reports from browsers and devices I haven't tested.

## Getting set up

You only need a browser to work on the page. Because it loads its fonts from the `fonts/` folder, serve the folder rather than double-clicking the file:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

To run the tests, you also need Node 20 or later:

```bash
npm install
npx playwright install chromium
npm test
```

## Before you open a pull request

- Run `npm test`. CI runs the same tests at five screen widths.
- Check the page in dark and light mode, with glow on and off, and at phone width.
- If you change how the digits look, rebuild the images with `npm run build:assets` and commit them.
- Add a line to `CHANGELOG.md` under a new "Unreleased" heading.

## Changing the words or colours

Everything you'd want to tune is in the CONFIGURATION block at the top of the `<script>`: `WORDS`, `COLOUR_RULES`, `TIERS`, `DIGIT_TINTS`, `WORD_PADDING` and `SOFT_THRESHOLD`. Colours live in the `:root` CSS variables.

## Style

- Keep it one HTML file with no runtime dependencies (the self-hosted fonts are the only extra files).
- Anything a visitor types must go through `escapeXML()` before it reaches the page.
- Every control must work with a keyboard and have a visible focus ring.
