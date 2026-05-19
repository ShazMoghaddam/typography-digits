# Typography Digits
### Generative Word-Cloud Art · Shaz Moghaddam · London, UK

[🔗 LinkedIn](https://www.linkedin.com/in/shazmoghaddam/) &nbsp;|&nbsp; [🌐 Website](https://shazmoghaddam.github.io/)

---

## What is it?

**Typography Digits** is a fully hand-coded, generative design piece where the numbers 0–9 are built entirely from programming and data-science vocabulary. No images, no libraries, no frameworks — pure HTML, CSS, and vanilla JavaScript.

Each digit is a living word cloud. The words breathe, shimmer, and respond to interaction. Every time you load the page, the layout is uniquely generated.

---

## How it works — technically

### Word placement (the hard part)
Most word-cloud tools place text randomly and accept collisions. This project uses a proper **two-pass collision detection system**:

1. Each digit character is rendered onto an offscreen `<canvas>` at full resolution, producing a **pixel mask** — a map of which pixels are inside the glyph
2. Words are placed in four size tiers (large anchors → medium fill → small fill → tiny gap-fill), each attempting hundreds of random positions
3. Every candidate position passes **two gates** before being accepted:
   - **Gate A (hard):** the centre pixel of the word's bounding box must land inside the digit mask
   - **Gate B (soft):** ≥ 50% of a 5×5 sample grid across the bounding box must be inside — allowing contour-hugging words that define the digit's edges, while letting SVG `clipPath` trim any overflow cleanly
4. An **AABB (axis-aligned bounding box)** collision check with 1.5px padding prevents overlap between already-placed words

Word widths are measured via `canvas.measureText()` *after* `document.fonts.ready` resolves, so Roboto's real metrics are used — not approximations.

### Rendering
Accepted word positions are written as SVG `<text>` elements inside a `<clipPath>` — the digit character itself acts as the clipping mask. This means scaling is resolution-independent, and the digit outline is always crisp.

---

## Features

| Feature | Detail |
|---|---|
| **Generative layout** | Canvas pixel mask + AABB packing; unique on every load |
| **Word animations** | Each word breathes on its own random cycle (4–9 s), staggered entrance |
| **Shimmer sweep** | Diagonal light gleam sweeps across each digit independently |
| **3D tilt** | Cursor-tracked `perspective rotateX/Y` on hover |
| **Click flash** | Single click snaps all words to full brightness, then releases |
| **Double-click regenerate** | Rebuilds any digit with a fresh layout on demand |
| **Neon glow mode** | Layered `drop-shadow` bloom toggle |
| **Speed control** | Slider scales all animation durations from 0.3× to 3× |
| **Palette cycling** | Three curated colour themes: Vibrant → Cool → Warm |
| **Light / dark mode** | Warm off-white canvas with full header chrome adaptation |
| **Custom word input** | Add your own words; all digits regenerate with new vocabulary |
| **Per-digit colour tint** | Each digit 0–9 has a unique chromatic identity tint |
| **Grain texture** | Subtle `feTurbulence` fractalNoise overlay for tactile depth |
| **`prefers-reduced-motion`** | All animations disabled at OS level for accessibility |

---

## Design decisions

**Why SVG clipPath instead of canvas rendering?**
SVG scales to any resolution without pixelation. The clipPath approach means the digit outline is a vector glyph — razor sharp at any display density. Canvas was only used for the collision detection mask, not the final render.

**Why vanilla JS?**
Zero build step, zero dependencies, zero bundle size. The entire project is a single `.html` file you can open anywhere.

**Why Roboto 400 / 700 / 900?**
The digit clip character uses Roboto 900 Black for maximum stroke weight and clear silhouette. Word text uses 400 (regular) and 700 (bold) to create visual hierarchy within the dense word texture.

**Why 16 specific colours?**
Each colour is semantically assigned — crimson for identity, blue for Python/cloud, vermillion for deep learning, aqua for NLP/LLM, etc. The palette is consistent enough to feel designed, varied enough to be vibrant.

---

## Colour system

| Class | Hex | Semantic role |
|---|---|---|
| `.w-crimson` | `#EA2264` | Identity / transformer |
| `.w-gold` | `#FFC81E` | Data science |
| `.w-lavender` | `#CB9DF0` | ML / algorithms |
| `.w-blue` | `#0046FF` | Python / cloud / Docker |
| `.w-amber` | `#FFB823` | JS / app development |
| `.w-vermillion` | `#FF4400` | Deep learning / neural |
| `.w-orange` | `#FA8112` | SQL / AWS / pipeline |
| `.w-aqua` | `#6DE1D2` | NLP / GPT / LLM |
| `.w-teal` | `#36ADA3` | Kubernetes / CI-CD |
| `.w-red` | `#FF0000` | PyTorch / TensorFlow |
| `.w-coral` | `#FA5C5C` | Debugging / testing |
| `.w-sage` | `#6A9C89` | Statistics / maths |
| `.w-olive` | `#898121` | DevOps / MLOps |
| `.w-tangerine` | `#FF6500` | HTML / big data |
| `.w-gold-deep` | `#FFC900` | Data analysis |
| `.w-slate` | `#3B7597` | General / fallback |

---

## Stack

```
HTML5   —  structure + SVG clipPath rendering
CSS3    —  custom properties, keyframe animations, filters, backdrop-filter
JS ES6+ —  canvas pixel mask, AABB collision detection, event delegation
Roboto  —  Google Fonts (400 · 700 · 900)
```

No frameworks. No build tools. No dependencies.

---

## Customisation

Everything is documented inline. Key entry points:

- **`WORDS`** — vocabulary pool (add your own skills or name)
- **`COLOUR_RULES`** — keyword → `.w-*` class mapping
- **`TIERS`** — font-size ranges, word counts, attempt budgets per size tier
- **`DIGIT_TINTS`** — per-digit background tint colours
- **`:root` CSS variables** — all 16 colours in one place

---

*Built entirely from scratch · No libraries · No frameworks · One file*

**Shaz Moghaddam** · Data Science · Machine Learning · App Development · London, UK
