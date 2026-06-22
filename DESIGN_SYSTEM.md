# ODUMODUBLVCK — Design System
> Source of truth for the Vue.js rebuild. Every token, pattern, and convention
> was extracted directly from the Claude Design export (ODUMODUBLVCK.html).

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Smooth scroll | Lenis (`npm install lenis`) |
| Animations | CSS @keyframes triggered by `data-*` attribute flags |
| Scroll detection | Native `IntersectionObserver` |
| Fonts | Google Fonts — Anton + Space Grotesk |
| Build | Vite (default Vue 3 scaffold) |

---

## 2. Color Palette

```css
/* tokens — put these in src/assets/css/tokens.css */
:root {
  --color-bg:       #050505;   /* page background */
  --color-fg:       #F5F5F5;   /* primary text / light */
  --color-red:      #FF2D2D;   /* brand accent — red */
  --color-cream:    #FFF3E2;   /* warm white */
  --color-orange:   #FF6A00;   /* section labels / callouts */
  --color-text-2:   #cfcfcf;   /* body copy */
  --color-text-3:   #bdbdbd;   /* secondary body */
  --color-muted:    #888888;   /* meta / captions */
  --color-muted-2:  #777777;   /* nav links */
  --color-gold:     #9a7d57;   /* awards page muted labels */
  --color-border:   rgba(255,255,255,0.10); /* subtle borders */
  --color-border-2: rgba(255,255,255,0.30); /* button borders */
  --color-overlay:  rgba(5,5,5,0.85);       /* image overlays */
}
```

**Section backgrounds:**
- Global: `#050505`
- Awards section only: `#FFF3E2` (inverted — text becomes `#050505`)

---

## 3. Typography

### Font loading (index.html `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

### Font families
```css
--font-display: 'Anton', sans-serif;   /* headings, giant type */
--font-body:    'Space Grotesk', sans-serif; /* UI, body, labels */
```

### Type scale (as used in the design)

| Role | CSS |
|---|---|
| Hero word ODUMODU | `font: Anton; size: min(17vw, 250px); line-height: .8; letter-spacing: -2px` |
| Hero word BLVCK | `font: Anton; size: min(21vw, 300px); line-height: .8; letter-spacing: -3px` |
| Section H2 (dark bg) | `font: Anton; size: min(11–15vw, 150–230px); line-height: .82-.84; letter-spacing: -1 to -2px` |
| Album title | `font: Anton; size: clamp(26px, 3vw, 42px); letter-spacing: .5px` |
| Award row year | `font: Anton; size: min(11vw, 150px); line-height: .8; letter-spacing: -1px` |
| Award entry | `font: Anton; size: clamp(20px, 2vw, 30px); letter-spacing: .5px` |
| Nav logo | `font: Anton; size: 22px; letter-spacing: 1px; text-transform: uppercase` |
| Section label (e.g. "01 — Discography") | `font: Space Grotesk; size: 12px; letter-spacing: 3px; text-transform: uppercase; color: var(--color-orange)` |
| Body copy | `font: Space Grotesk; size: clamp(15px, 1.2vw, 19px); line-height: 1.65; color: var(--color-text-3)` |
| Nav links / buttons | `font: Space Grotesk; size: 12px; letter-spacing: 2.5px; text-transform: uppercase` |
| Caption / meta | `font: Space Grotesk; size: 11–13px; letter-spacing: 2px; text-transform: uppercase; color: var(--color-muted)` |
| Footer giant name | `font: Anton; size: min(20vw, 330px); line-height: .78; letter-spacing: -3px` |

---

## 4. Spacing & Layout

```css
/* Horizontal page padding (consistent across all sections) */
--page-x: clamp(20px, 4vw, 56px);

/* Section vertical padding */
--section-y-lg: clamp(90px, 14vh, 170px);   /* awards, legacy */
--section-y-xl: clamp(110px, 20vh, 260px);  /* legacy */
--section-y-footer: clamp(70px, 11vh, 130px);

/* Max content container (legacy section) */
--max-content: 1500px;
```

**Layout rules:**
- No global container div — each section handles its own `padding: var(--section-y) var(--page-x)`
- `overflow-x: clip` on root to prevent horizontal scrollbar from parallax
- All images use `<image-slot>` in the original → replace with `<img>` or `<div>` placeholders in Vue

---

## 5. Z-Index Layers

```js
// z-index map (define as JS constants or CSS vars)
Z = {
  loader:      9999,
  cursorDot:   9999,
  cursorRing:  9998,
  progress:    9000,
  nav:         8000,
  heroSticker: 5,
  heroFront:   4,
  heroPortrait:3,
  heroBack:    2,
  heroGradient:1,
}
```

---

## 6. Keyframe Animations

All animations are defined in global CSS and triggered by toggling `data-*` attributes via JavaScript. **Never use v-show/v-if to toggle entrance animations** — use the attribute pattern below.

```css
/* src/assets/css/animations.css */

/* --- ENTRANCE (triggered by data-in="1") --- */
[data-entrance] { opacity: 0; }

[data-entrance="rise"][data-in="1"] {
  animation: odbRise 1.1s cubic-bezier(.2,.8,.2,1) both;
}
[data-entrance="soft"][data-in="1"] {
  animation: odbSoft 1.3s ease-out both;
}
[data-entrance="pop"][data-in="1"] {
  animation: odbPop .8s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes odbRise {
  from { opacity: 0; transform: translateY(80px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes odbSoft {
  from { opacity: 0; transform: scale(1.06); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes odbPop {
  0%   { opacity: 0; transform: scale(.55); }
  70%  { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}

/* --- REVEAL ON SCROLL (triggered by data-rv="1") --- */
[data-reveal] { opacity: 0; }

[data-reveal][data-rv="1"] {
  animation: odbReveal .9s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes odbReveal {
  from { opacity: 0; transform: translateY(42px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* --- LOADER --- */
[data-loader-word] { transform: translateY(110%); }
[data-loader-word][data-go="1"] {
  animation: odbWordUp 1s .1s cubic-bezier(.2,.8,.2,1) both;
}
[data-loader][data-up="1"] {
  animation: odbLoaderUp 1s cubic-bezier(.76,0,.24,1) both;
}
[data-loader-bar][data-go="1"] {
  animation: odbBar 2.1s linear both;
}

@keyframes odbWordUp   { from { transform: translateY(115%); } to { transform: translateY(0); } }
@keyframes odbLoaderUp { from { transform: translateY(0);    } to { transform: translateY(-110%); } }
@keyframes odbBar      { from { transform: scaleX(0);        } to { transform: scaleX(1); } }

/* --- AMBIENT / LOOP ANIMATIONS (always on) --- */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .25; }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-14px); }
}
@keyframes floatySlow {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-22px); }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .25; }
}

/* --- GLOBAL RESETS --- */
html, body { margin: 0; padding: 0; background: #050505; }
* { box-sizing: border-box; }
::selection { background: #FF2D2D; color: #050505; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
@media (pointer: fine) { * { cursor: none !important; } }
```

---

## 7. Data-Attribute Conventions (JS Hook Pattern)

The design uses `data-*` attributes as JS hooks — **never use class names for JS logic**.

| Attribute | Element | Purpose |
|---|---|---|
| `data-root` | root `<div>` | JS selects all child elements from here |
| `data-loader` | loader wrapper | gets `data-up="1"` to dismiss |
| `data-loader-word` | "ODUMODUBLVCK" text | gets `data-go="1"` to rise in |
| `data-loader-bar` | progress bar fill | gets `data-go="1"` to animate |
| `data-loader-num` | "0–100" counter | JS writes textContent |
| `data-cursor-ring` | outer cursor circle | JS moves via `left/top` |
| `data-cursor-dot` | inner cursor dot | JS moves via `left/top` |
| `data-cursor` | any interactive el | triggers cursor enlarge on hover |
| `data-progress` | scroll progress bar fill | JS sets `scaleX` |
| `data-hero` | hero `<section>` | bounds check for parallax |
| `data-hero-top` | "ODUMODU" word | JS translateY on scroll |
| `data-hero-bottom` | "BLVCK" word | JS translateY on scroll |
| `data-depth="N"` | parallax sticker/element | mouse parallax multiplier |
| `data-entrance="rise\|soft\|pop"` | animated entry el | gets `data-in="1"` after loader |
| `data-reveal` | scroll-reveal el | gets `data-rv="1"` via IntersectionObserver |
| `data-reveal-delay="N"` | scroll-reveal el | delay in ms before applying `data-rv` |
| `data-disco` | discography section | scroll calculation bounds |
| `data-disco-pin` | sticky inner div | stays `position: sticky` |
| `data-disco-track` | horizontal strip | JS sets `translateX` |
| `data-disco-fill` | progress bar fill | JS sets `scaleX` |
| `data-album` | album card | hover interaction |
| `data-album-art` | album art wrapper | translateY on hover |
| `data-album-meta` | overlay inside art | opacity on hover |
| `data-award-row` | each year row | (structural) |
| `data-count="N"` | animated number | count-up target value |
| `data-count-from="N"` | animated number | count-up start value |
| `data-suffix="str"` | animated number | appended after number (e.g. "B+") |
| `data-footer-name` | giant footer name | structural |
| `data-scrollcue` | ↓ scroll hint | structural |

---

## 8. JavaScript Logic Summary

All JS lives in `onMounted()` inside each Vue component. Use `onUnmounted()` to clean up event listeners and rAF loops.

### Lenis (App.vue)
```js
import Lenis from 'lenis'
// Init once at app level. Pass the instance down via provide/inject or a composable.
const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
```

### Custom Cursor (App.vue)
```
- dot: follows mouse instantly via mousemove
- ring: lerps toward mouse at 0.18 speed via rAF
- On [data-cursor] hover: ring grows to 66px, turns red
- On leave: ring shrinks to 42px, goes back to default
```

### Magnetic Hover (.mag class)
```
- On mousemove: translate element by (offsetX * 0.3, offsetY * 0.3)
- On mouseleave: translate(0, 0)
```

### Hero Parallax (two layers)
```
- Mouse move: each [data-depth] el moves at (-cx * depth * 16)px in both axes
- Scroll: [data-hero-top] moves at scrollY * -0.18, [data-hero-bottom] at scrollY * -0.06
```

### Horizontal Discography Scroll
```
- Section height: 420vh  →  sticky inner is 100vh
- Progress: (-rect.top / (section.offsetHeight - innerHeight)), clamped 0–1
- translateX: -progress * (track.scrollWidth - innerWidth)
```

### Scroll Reveal (IntersectionObserver)
```
- threshold: 0.14
- rootMargin: "0px 0px -7% 0px"
- On intersect: setTimeout(el.setAttribute('data-rv','1'), delay)
- Also triggers countUp() if el has data-count
```

### Count-Up Animation
```
- Duration: 1400ms
- Easing: 1 - (1-k)^3  (cubic ease-out)
- Reads data-count-from (default 0) → data-count, appends data-suffix
```

### Loader Sequence
```
1. data-loader-word → data-go="1" (CSS animates it up) at 60ms
2. JS ticker updates data-loader-num every 95ms (+3.5–9.5 per tick)
3. After 2100ms: set 100, trigger hero entrance, data-loader → data-up="1"
4. After 1000ms more: loader display:none
```

### Hero Entrance (post-loader)
```
- [data-entrance="rise"] at delay 0ms (hero-top) and 120ms (hero-bottom)
- [data-entrance="soft"] at 160ms
- [data-entrance="pop"] staggered from 460ms, +110ms each
```

---

## 9. Vue Component Structure

```
src/
├── App.vue                  ← Lenis, cursor, rAF loop, scroll progress
├── main.js
├── assets/
│   └── css/
│       ├── tokens.css       ← CSS custom properties (colors, fonts)
│       └── animations.css   ← All @keyframes + data-attr rules
└── components/
    ├── AppLoader.vue        ← Loader overlay
    ├── AppNav.vue           ← Fixed navigation
    ├── AppCursor.vue        ← Custom cursor ring + dot
    ├── HeroSection.vue      ← Hero with parallax stickers
    ├── DiscoSection.vue     ← Horizontal scroll discography
    ├── AwardsSection.vue    ← Year rows + stat band
    ├── LegacySection.vue    ← Full-width text + CTA
    └── AppFooter.vue        ← Links + giant name
```

**Composables (optional but recommended):**
```
src/composables/
├── useLenis.js       ← provide/inject smooth scroll instance
├── useReveal.js      ← IntersectionObserver setup
└── useParallax.js    ← mouse + scroll parallax logic
```

---

## 10. Easing Reference

| Name | Value | Used for |
|---|---|---|
| Primary smooth | `cubic-bezier(.2, .8, .2, 1)` | entrances, reveals, pop |
| Loader dismiss | `cubic-bezier(.76, 0, .24, 1)` | loader sliding up |
| Cursor ring | `transition` at 0.18 lerp speed | in rAF loop |
| Magnetic | `transition: transform .35s cubic-bezier(.2,.8,.2,1)` | `.mag` elements |
| Album hover art | `transition: transform .5–.6s cubic-bezier(.2,.8,.2,1)` | album cards |

---

## 11. Interaction States

| Trigger | Effect |
|---|---|
| Hover on `[data-cursor]` | Cursor ring → 66px, red tint background, red border |
| Hover on `.mag` | Element translates ±30% of mouse offset |
| Hover on `[data-album]` | Art lifts -8px, overlay fades in, image scales 1.08x |
| `::selection` | Background `#FF2D2D`, text `#050505` |
| Live dot (nav) | `animation: blink 1.6s infinite` |
| Floating stickers | `animation: floaty / floatySlow` (6–8s infinite) |

---

## 12. Section-by-Section Background + Text Colors

| Section | Background | Text | Accent |
|---|---|---|---|
| Loader | `#050505` | `#F5F5F5` | `#FF2D2D` |
| Nav | transparent (blend: difference) | `#F5F5F5` | — |
| Hero | `#050505` | `#F5F5F5` + `#FFF3E2` | `#FF2D2D` |
| Discography | `#050505` | `#F5F5F5` | `#FF6A00` |
| Awards | `#FFF3E2` | `#050505` | `#FF2D2D` |
| Legacy | `#050505` | `#F5F5F5` | `#FF2D2D` + `#FF6A00` |
| Footer | `#050505` | `#F5F5F5` + `#FFF3E2` | `#FF2D2D` + `#FF6A00` |

---

## 13. Image Slots (Replace in Vue)

All images use placeholder `<image-slot>` elements in the original. Replace with `<img>` tags in Vue:

| ID | Dimensions | Description |
|---|---|---|
| `odb-hero-portrait` | `min(30vw,380px) × min(58vh,540px)` | Main artist portrait |
| `odb-hero-album` | `148×148px` | Polaroid-style album art |
| `odb-hero-clip` | `122×152px` | Polaroid clipping |
| `odb-hero-arsenal` | `104×104px` (circle) | Arsenal crest |
| `odb-album-1` | square, `min(40vw,440px)` | Eziokwu cover |
| `odb-album-2` | square, `min(40vw,440px)` | Blackwar cover |
| `odb-album-3` | square, `min(40vw,440px)` | The Machine cover |
| `odb-album-4` | square, `min(40vw,440px)` | New Wave cover |
| `odb-legacy-bg` | full section | Atmospheric/live photo |

---

*Last updated from ODUMODUBLVCK.html export — Claude Design.*