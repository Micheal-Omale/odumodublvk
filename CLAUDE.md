# CLAUDE.md — ODUMODUBLVCK Artist Website

This file is read by Claude Code at the start of every session.
Read it fully before writing any code or creating any file.

---

## Project Overview

A single-page artist website for Nigerian rapper **ODUMODUBLVCK**.
Designed in Claude Design and being rebuilt in **Vue 3**.
The site is a high-end, animation-heavy, dark-themed portfolio covering:
discography, awards, and legacy.

**Design reference:** `DESIGN_SYSTEM.md` in project root.
Read it before touching any color, font, animation, spacing, or z-index.

---
**Source HTML:** `reference/ODUMODUBLVCK.html` in project root.
The actual page template is inside the `<script type="__bundler/template">` tag
as a JSON string. Decode it to read the full HTML structure, inline styles,
and JavaScript for each section. Use it as the exact blueprint when building
each Vue component.

---

## Stack

| Tool | Version / Notes |
|---|---|
| Framework | Vue 3 — Composition API only, `<script setup>` everywhere |
| Build tool | Vite |
| Smooth scroll | Lenis (`npm install lenis`) |
| Animations | CSS @keyframes + `data-*` attribute flags (no GSAP, no anime.js) |
| Styling | Scoped `<style>` per component + global CSS in `src/assets/css/` |
| Routing | None — single page, anchor-based nav |
| State | No Pinia — composables only for shared logic |
| Package manager | npm |

---

## Project Structure

```
/
├── CLAUDE.md                  ← you are here
├── DESIGN_SYSTEM.md           ← visual reference, read before every task
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js
    ├── App.vue                ← Lenis init, rAF loop, cursor, scroll progress
    ├── assets/
    │   ├── css/
    │   │   ├── tokens.css     ← CSS custom properties (colors, fonts)
    │   │   └── animations.css ← all @keyframes + data-attr trigger rules
    │   └── images/            ← artist photos, album covers
    └── components/
        ├── AppLoader.vue      ← fullscreen loader, fires hero entrance on done
        ├── AppNav.vue         ← fixed nav, mix-blend-mode difference
        ├── AppCursor.vue      ← custom cursor (ring + dot)
        ├── HeroSection.vue    ← layered type, floating stickers, parallax
        ├── DiscoSection.vue   ← horizontal sticky-scroll discography
        ├── AwardsSection.vue  ← year rows, count-up stats
        ├── LegacySection.vue  ← full-width type + CTA
        └── AppFooter.vue      ← links, giant name
```

---

## Composables

Create these in `src/composables/` when the logic is needed in more than one component:

- `useLenis.js` — provide/inject the Lenis instance so all components can call `lenis.scrollTo()`
- `useReveal.js` — IntersectionObserver that sets `data-rv="1"` on visible `[data-reveal]` elements
- `useParallax.js` — mouse and scroll parallax logic for hero stickers and words

---

## Vue Conventions

### Always use `<script setup>`
```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
</script>
```

### Refs for DOM elements
```vue
<template>
  <div ref="loaderEl" data-loader></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const loaderEl = ref(null)
onMounted(() => {
  // use loaderEl.value
})
</script>
```

### Cleanup is mandatory
Every `addEventListener`, `requestAnimationFrame`, `IntersectionObserver`, and Lenis instance
**must** be cleaned up in `onUnmounted()`. No exceptions.

```js
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', handleMove)
  lenis?.destroy()
  observer?.disconnect()
})
```

### Props use `defineProps`, emits use `defineEmits`
```js
const props = defineProps({ ready: Boolean })
const emit = defineEmits(['loaded'])
```

### No Options API. No `this`. No `.vue` files using `export default {}`.

---

## CSS Conventions

### Scoped styles per component
Every component uses `<style scoped>`. Never style elements from another component.

### Global CSS is only for:
- CSS custom properties → `tokens.css`
- `@keyframes` and `data-attr` trigger rules → `animations.css`
- Resets and base rules → `animations.css`

### Import order in `main.js`
```js
import './assets/css/tokens.css'
import './assets/css/animations.css'
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

### Use CSS custom properties from tokens.css
```css
/* correct */
color: var(--color-red);
font-family: var(--font-display);

/* wrong */
color: #FF2D2D;
font-family: 'Anton', sans-serif;
```

### Responsive sizing
Use `clamp()` and `min()` exactly as in DESIGN_SYSTEM.md section 4 and 3.
Do not invent new breakpoints or media queries unless necessary.

---

## Animation Rules

### The data-attribute pattern (critical — do not deviate from this)

Animations are triggered by toggling `data-*` attributes, not classes.
The CSS rule listens for the attribute; JS just sets it.

```js
// trigger an entrance animation
el.setAttribute('data-in', '1')

// trigger a scroll reveal
el.setAttribute('data-rv', '1')

// trigger loader dismiss
loaderEl.setAttribute('data-up', '1')
```

See DESIGN_SYSTEM.md sections 6 and 7 for the full attribute map and all keyframes.

### Never use v-show or v-if to drive entrance animations
`v-show` toggles `display:none` which breaks CSS animation timing.
`v-if` removes elements from the DOM before they can animate out.
Use the `data-*` attribute pattern and let CSS handle visibility transitions.

### Delay staggering is done in JS with setTimeout, not CSS `transition-delay`
```js
elements.forEach((el, i) => {
  setTimeout(() => el.setAttribute('data-in', '1'), i * 110)
})
```

### Ambient animations (floaty, blink) are always-on in CSS
These never need JS triggering — they are on the element from render.

---

## JavaScript Rules

### No jQuery. No lodash. No animation libraries.
Vanilla JS only, inside Vue lifecycle hooks.

### All scroll math uses `window.scrollY`
When Lenis is active, also read `lenis.scroll` as the canonical scroll position.

### requestAnimationFrame loop lives in App.vue
The main rAF loop runs once in `App.vue` and handles:
- scroll progress bar
- hero vertical parallax
- horizontal disco scroll position
- cursor ring lerp

Do NOT create additional rAF loops in child components.
If a child needs per-frame updates, lift the logic into `App.vue` or the relevant composable.

### querySelector pattern inside components
```js
onMounted(() => {
  // always scope to the component's root ref, not document
  const el = rootRef.value.querySelector('[data-loader-bar]')
})
```

---

## Lenis Setup (App.vue)

```js
import Lenis from 'lenis'

onMounted(() => {
  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
  })

  // Anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(a.getAttribute('href'))
      if (target) lenis.scrollTo(target, { offset: 0 })
    })
  })

  // Integrate into rAF loop (see rAF section below)
})
```

---

## rAF Loop (App.vue)

The single rAF loop in `App.vue` drives all per-frame calculations:

```js
let rafId
const frame = (time) => {
  lenis?.raf(time)

  const sy = Math.round(lenis?.scroll ?? window.scrollY)

  // 1. scroll progress bar
  // 2. hero top word parallax  (sy * -0.18)
  // 3. hero bottom word parallax (sy * -0.06)
  // 4. horizontal disco translateX
  // 5. disco fill scaleX

  rafId = requestAnimationFrame(frame)
}
rafId = requestAnimationFrame(frame)
```

---

## Horizontal Disco Scroll Logic

```
Section height:  420vh
Sticky height:   100vh

progress = clamp((-section.getBoundingClientRect().top) / (section.offsetHeight - innerHeight), 0, 1)
translateX = -(progress * (track.scrollWidth - innerWidth))
fill.style.transform = `scaleX(${progress})`
```

---

## Loader → Hero Entrance Sequence

```
t=0ms:    Loader mounts, word rises (data-go="1")
t=60ms:   data-loader-word gets data-go="1"
t=95ms×N: JS counter ticks to 100 over ~2100ms
t=2100ms: counter hits 100, hero entrance fires, loader gets data-up="1"
t=3100ms: loader gets display:none

Hero entrance order:
- data-entrance="rise" on hero-top:    delay 0ms
- data-entrance="soft":                delay 160ms
- data-entrance="rise" on hero-bottom: delay 120ms
- data-entrance="pop" × N:             delay 460ms, stagger +110ms each
```

---

## Image Handling

Replace `<image-slot>` elements from the original design with `<img>` tags.
Use the slot IDs from DESIGN_SYSTEM.md section 13 to know dimensions.

For development, use placeholder divs with the correct aspect ratios and
a background of `rgba(255,255,255,0.05)` until real images are dropped in.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `HeroSection.vue` |
| Composable files | camelCase with `use` prefix | `useLenis.js` |
| CSS custom properties | kebab-case | `--color-red` |
| Template refs | camelCase | `const heroEl = ref(null)` |
| Data attributes | kebab-case | `data-reveal-delay` |
| JS variables | camelCase | `let scrollY = 0` |
| Constants | camelCase | `const lerpSpeed = 0.18` |

---

## Build Order

Work through components in this sequence — each one depends on the previous:

1. `src/assets/css/tokens.css` — CSS custom properties
2. `src/assets/css/animations.css` — all keyframes
3. `main.js` — imports and mount
4. `AppLoader.vue` — everything else waits for this
5. `App.vue` — Lenis, rAF, cursor, scroll progress
6. `AppCursor.vue`
7. `AppNav.vue`
8. `HeroSection.vue`
9. `DiscoSection.vue`
10. `AwardsSection.vue`
11. `LegacySection.vue`
12. `AppFooter.vue`

---

## Common Commands

```bash
npm install          # install deps
npm run dev          # dev server (localhost:5173)
npm run build        # production build
npm run preview      # preview production build
```

---

## What NOT To Do

- Do not use `document.querySelector` at the top level — always scope to a component ref
- Do not hardcode color values — always use `var(--color-*)` from tokens.css
- Do not use class names as JS hooks — use `data-*` attributes
- Do not create multiple rAF loops — one loop in App.vue only
- Do not use `v-show` or `v-if` to trigger entrance animations
- Do not install GSAP, Framer Motion, or any animation library
- Do not use the Options API or `export default {}`
- Do not use `<style>` without `scoped` (except in tokens.css and animations.css)
- Do not forget `onUnmounted()` cleanup for every listener and rAF

---

## Current Status

- [x] Design exported from Claude Design
- [x] Design system documented (DESIGN_SYSTEM.md)
- [x] CLAUDE.md written
- [ ] Vue project scaffolded
- [ ] tokens.css + animations.css created
- [ ] Components built
- [ ] Real images dropped in
- [ ] Deployed to Vercel