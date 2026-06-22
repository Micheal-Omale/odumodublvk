<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { provideLenis } from './composables/useLenis'

import AppLoader from './components/AppLoader.vue'
import AppCursor from './components/AppCursor.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import DiscoSection from './components/DiscoSection.vue'
import AwardsSection from './components/AwardsSection.vue'
import LegacySection from './components/LegacySection.vue'
import AppFooter from './components/AppFooter.vue'

const rootEl = ref(null)
const lenisRef = provideLenis()

let rafId = null
const entranceTimers = []

// Per-frame element cache. Re-queried while still null so the loop progressively
// lights up as later components (hero, disco) get built.
let progEl = null
let topEl = null
let botEl = null
let trackEl = null
let discoEl = null
let fillEl = null
let lastSy = -1

function setTransform(el, value) {
  if (el) el.style.transform = value
}

// ---- The single rAF loop: drives Lenis + every per-frame calculation. ----
// No child component is allowed to start its own loop.
function frame(time) {
  lenisRef.value?.raf(time)

  const root = rootEl.value
  if (root) {
    const sy = Math.round(window.scrollY || lenisRef.value?.scroll || 0)
    // Everything below depends only on scroll position — skip when it hasn't moved.
    if (sy !== lastSy) {
      lastSy = sy
      const docH = document.documentElement.scrollHeight - window.innerHeight

      // 1. scroll progress bar
      progEl = progEl || root.querySelector('[data-progress]')
      setTransform(
        progEl,
        `scaleX(${docH > 0 ? Math.round(Math.min(sy / docH, 1) * 1000) / 1000 : 0})`,
      )

      // 2 + 3. hero word vertical parallax
      topEl = topEl || root.querySelector('[data-hero-top]')
      botEl = botEl || root.querySelector('[data-hero-bottom]')
      setTransform(topEl, `translateY(${-Math.round(sy * 0.18)}px)`)
      setTransform(botEl, `translateY(${-Math.round(sy * 0.06)}px)`)

      // 4 + 5. horizontal discography + its fill bar
      trackEl = trackEl || root.querySelector('[data-disco-track]')
      discoEl = discoEl || root.querySelector('[data-disco]')
      if (trackEl && discoEl) {
        const r = discoEl.getBoundingClientRect()
        const total = discoEl.offsetHeight - window.innerHeight
        const progress = Math.min(Math.max(-r.top / total, 0), 1)
        const max = Math.max(trackEl.scrollWidth - window.innerWidth, 0)
        setTransform(trackEl, `translateX(${-Math.round(progress * max)}px)`)
        fillEl = fillEl || root.querySelector('[data-disco-fill]')
        setTransform(fillEl, `scaleX(${Math.round(progress * 1000) / 1000})`)
      }
    }
  }

  rafId = requestAnimationFrame(frame)
}

// ---- Hero entrance, fired when AppLoader emits 'done' (~2100ms). ----
function onLoaderDone() {
  const root = rootEl.value
  if (!root) return
  let popI = 0
  root.querySelectorAll('[data-hero] [data-entrance]').forEach((el) => {
    const kind = el.getAttribute('data-entrance') || 'rise'
    let delay
    if (kind === 'soft') delay = 160
    else if (kind === 'pop') delay = 460 + popI * 110
    else delay = el.closest('[data-hero-bottom]') ? 120 : 0
    if (kind === 'pop') popI++
    entranceTimers.push(setTimeout(() => el.setAttribute('data-in', '1'), delay))
  })
}

onMounted(() => {
  // The shared Lenis instance — provided to children via useLenis() for scrollTo.
  lenisRef.value = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
  rafId = requestAnimationFrame(frame)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  entranceTimers.forEach(clearTimeout)
  lenisRef.value?.destroy()
})
</script>

<template>
  <div ref="rootEl" data-root>
    <AppLoader @done="onLoaderDone" />
    <AppCursor />

    <!-- scroll progress -->
    <div class="progress">
      <div class="progress-fill" data-progress></div>
    </div>

    <AppNav />
    <HeroSection />
    <DiscoSection />
    <AwardsSection />
    <LegacySection />
    <AppFooter />
  </div>
</template>

<style scoped>
[data-root] {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-body);
  /* §4: prevent a horizontal scrollbar from the parallax transforms */
  overflow-x: clip;
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: var(--z-progress);
  background: transparent;
}

.progress-fill {
  height: 100%;
  width: 100%;
  background: var(--color-red);
  transform-origin: left;
  transform: scaleX(0);
}
</style>
