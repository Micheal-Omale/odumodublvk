<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Pointer-fine gate: on touch devices the component renders nothing and no JS runs.
const isFine = window.matchMedia('(pointer: fine)').matches

const ringEl = ref(null)
const dotEl = ref(null)

// Mouse target (mx/my) + lerped ring position (rx/ry); last painted ring px (lrx/lry).
let mx = 0
let my = 0
let rx = 0
let ry = 0
let lrx = -1
let lry = -1
let cRaf = null

// Bound elements, kept so listeners can be removed on unmount.
let cursorEls = []
let magEls = []
let mounted = true

// ---- dot: follows the mouse instantly ----
function onCursorMove(e) {
  mx = e.clientX
  my = e.clientY
  const dot = dotEl.value
  if (dot) {
    dot.style.left = mx + 'px'
    dot.style.top = my + 'px'
  }
}

// ---- ring: lerps toward the mouse in its own rAF loop ----
function ringRaf() {
  rx += (mx - rx) * 0.18
  ry += (my - ry) * 0.18
  const nx = Math.round(rx)
  const ny = Math.round(ry)
  // Only touch the DOM when the rounded position actually changes.
  if (nx !== lrx || ny !== lry) {
    const ring = ringEl.value
    if (ring) {
      ring.style.left = nx + 'px'
      ring.style.top = ny + 'px'
    }
    lrx = nx
    lry = ny
  }
  cRaf = requestAnimationFrame(ringRaf)
}

// ---- hover on [data-cursor]: ring grows + turns red ----
function onCursorEnter() {
  const ring = ringEl.value
  if (!ring) return
  ring.style.width = '66px'
  ring.style.height = '66px'
  ring.style.background = 'rgba(255, 45, 45, 0.18)'
  ring.style.borderColor = 'var(--color-red)'
}
function onCursorLeave() {
  const ring = ringEl.value
  if (!ring) return
  ring.style.width = '42px'
  ring.style.height = '42px'
  ring.style.background = 'transparent'
  ring.style.borderColor = 'rgba(245, 245, 245, 0.6)'
}

// ---- magnetic on .mag: element follows the cursor at 30% offset ----
function onMagMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left - r.width / 2
  const y = e.clientY - r.top - r.height / 2
  el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
}
function onMagLeave(e) {
  e.currentTarget.style.transform = 'translate(0, 0)'
}

onMounted(() => {
  if (!isFine) return

  mx = rx = window.innerWidth / 2
  my = ry = window.innerHeight / 2

  window.addEventListener('mousemove', onCursorMove)
  cRaf = requestAnimationFrame(ringRaf)

  // [data-cursor] and .mag elements live in sibling components that mount after
  // this one — wait a tick for the whole page to exist before binding to them.
  nextTick(() => {
    if (!mounted) return

    cursorEls = Array.from(document.querySelectorAll('[data-cursor]'))
    cursorEls.forEach((el) => {
      el.addEventListener('mouseenter', onCursorEnter)
      el.addEventListener('mouseleave', onCursorLeave)
    })

    magEls = Array.from(document.querySelectorAll('.mag'))
    magEls.forEach((el) => {
      el.addEventListener('mousemove', onMagMove)
      el.addEventListener('mouseleave', onMagLeave)
    })
  })
})

onUnmounted(() => {
  mounted = false
  if (!isFine) return

  window.removeEventListener('mousemove', onCursorMove)
  if (cRaf) cancelAnimationFrame(cRaf)

  cursorEls.forEach((el) => {
    el.removeEventListener('mouseenter', onCursorEnter)
    el.removeEventListener('mouseleave', onCursorLeave)
  })
  magEls.forEach((el) => {
    el.removeEventListener('mousemove', onMagMove)
    el.removeEventListener('mouseleave', onMagLeave)
  })
})
</script>

<template>
  <template v-if="isFine">
    <div ref="ringEl" class="ring" data-cursor-ring></div>
    <div ref="dotEl" class="dot" data-cursor-dot></div>
  </template>
</template>

<style scoped>
.ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 42px;
  height: 42px;
  /* No token for this fg-with-alpha; literal value from the source HTML. */
  border: 1px solid rgba(245, 245, 245, 0.6);
  border-radius: 50%;
  z-index: var(--z-cursor-ring);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.25s, height 0.25s, background 0.25s, border-color 0.25s;
  mix-blend-mode: difference;
}

.dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: var(--color-fg);
  border-radius: 50%;
  z-index: var(--z-cursor-dot);
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
</style>
