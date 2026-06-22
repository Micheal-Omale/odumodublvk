<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Fires once when the loader has finished; App.vue listens to start the hero entrance.
const emit = defineEmits(['done'])

const loaderEl = ref(null)
const wordEl = ref(null)
const barEl = ref(null)
const numEl = ref(null)

let tickId = null
let goTimer = null
let finishTimer = null
let hideTimer = null
let done = false

onMounted(() => {
  // 1. Word rises in + progress bar fills — CSS @keyframes via data-go="1".
  goTimer = setTimeout(() => {
    wordEl.value?.setAttribute('data-go', '1')
    barEl.value?.setAttribute('data-go', '1')
  }, 60)

  // 2. Count 0 → 100. JS only writes textContent; +3.5–9.5 every 95ms.
  let p = 0
  tickId = setInterval(() => {
    p += Math.random() * 6 + 3.5
    if (p >= 100) {
      p = 100
      clearInterval(tickId)
      tickId = null
    }
    if (numEl.value) numEl.value.textContent = Math.floor(p)
  }, 95)

  // 3. Dismiss the loader after 2100ms.
  finishTimer = setTimeout(finish, 2100)
})

function finish() {
  if (done) return
  done = true

  if (tickId) {
    clearInterval(tickId)
    tickId = null
  }
  if (numEl.value) numEl.value.textContent = '100'

  // Tell App.vue to play the hero entrance.
  emit('done')

  // Slide the loader up out of view — CSS @keyframes via data-up="1".
  const el = loaderEl.value
  if (el) {
    el.setAttribute('data-up', '1')
    el.style.pointerEvents = 'none'
    // Remove from the layout 1000ms later (total 3100ms from mount).
    hideTimer = setTimeout(() => {
      el.style.display = 'none'
    }, 1000)
  }
}

onUnmounted(() => {
  if (tickId) clearInterval(tickId)
  clearTimeout(goTimer)
  clearTimeout(finishTimer)
  clearTimeout(hideTimer)
})
</script>

<template>
  <div ref="loaderEl" class="loader" data-loader>
    <div class="word-mask">
      <div ref="wordEl" class="word" data-loader-word>ODUMODUBLVCK</div>
    </div>

    <div class="bar-track">
      <div ref="barEl" class="bar-fill" data-loader-bar></div>
    </div>

    <div class="meta">
      <span>Loading Experience</span><span ref="numEl" data-loader-num>0</span>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: var(--z-loader);
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Clips the word while it rises in (initial translateY + keyframe live in animations.css). */
.word-mask {
  overflow: hidden;
}

.word {
  font-family: var(--font-display);
  font-size: min(13vw, 150px);
  line-height: 0.9;
  letter-spacing: -1px;
  color: var(--color-fg);
}

.bar-track {
  position: relative;
  width: min(60vw, 560px);
  height: 2px;
  margin-top: 34px;
  overflow: hidden;
  /* No exact token for this faint track tint; value taken from the source HTML. */
  background: rgba(255, 255, 255, 0.12);
}

.bar-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: var(--color-red);
  transform-origin: left;
  /* Empty until data-go="1" triggers odbBar; prevents a full-width flash. */
  transform: scaleX(0);
}

.meta {
  display: flex;
  justify-content: space-between;
  width: min(60vw, 560px);
  margin-top: 14px;
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-muted-2);
}
</style>
