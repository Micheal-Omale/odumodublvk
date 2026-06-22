<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useLenis } from '../composables/useLenis'

// Reveal scoped to this section's root.
const sectionEl = ref(null)
useReveal(sectionEl)

// Optional atmospheric background (source marks it optional). To enable: import a
// photo and assign it here — the layer + gradient are already in place.
const legacyBg = null

const lenis = useLenis()
function scrollTo(hash) {
  const target = document.querySelector(hash)
  if (target) lenis.value?.scrollTo(target, { offset: 0 })
}
</script>

<template>
  <section id="legacy" ref="sectionEl" class="legacy">
    <!-- optional atmospheric photo -->
    <div class="bg" aria-hidden="true">
      <img v-if="legacyBg" class="bg-img" :src="legacyBg" alt="" />
    </div>
    <div class="bg-grad" aria-hidden="true"></div>

    <div class="inner">
      <div class="eyebrow" data-reveal>
        <span class="rule"></span>03 — Legacy<span class="rule"></span>
      </div>

      <h2 class="title">
        <span class="line" data-reveal>MORE&nbsp;THAN</span>
        <span class="line line--red" data-reveal data-reveal-delay="120">MUSIC.</span>
        <span class="line line--cream" data-reveal data-reveal-delay="240">A&nbsp;CULTURAL</span>
        <span class="line line--outline" data-reveal data-reveal-delay="360">MOVEMENT</span>
      </h2>

      <p class="copy" data-reveal data-reveal-delay="480">
        Not a sound, but a posture. Not a moment, but a movement. ODUMODUBLVCK turned the raw
        pulse of the streets into a global language — and handed a generation the confidence to
        speak it.
      </p>

      <div class="cta-wrap" data-reveal data-reveal-delay="560">
        <a class="cta mag" href="#footer" data-cursor @click.prevent="scrollTo('#footer')">
          Enter The Movement →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legacy {
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
  color: var(--color-fg);
  padding: var(--section-y-xl) var(--page-x);
}

/* ---- background layers ---- */
.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.35;
}
.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.bg-grad {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* mid stops are bg-with-alpha (no token); solid stops use the bg token */
  background: linear-gradient(
    180deg,
    var(--color-bg) 0%,
    rgba(5, 5, 5, 0.55) 40%,
    rgba(5, 5, 5, 0.55) 60%,
    var(--color-bg) 100%
  );
}

/* ---- content ---- */
.inner {
  position: relative;
  z-index: 2;
  max-width: var(--max-content);
  margin: 0 auto;
  text-align: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-orange);
  margin-bottom: clamp(30px, 6vh, 70px);
}
.rule {
  width: 40px;
  height: 1px;
  background: var(--color-orange);
}

.title {
  font-family: var(--font-display);
  font-size: min(15vw, 230px);
  line-height: 0.84;
  letter-spacing: -2px;
  margin: 0;
}
.line {
  display: block;
}
.line--red {
  color: var(--color-red);
}
.line--cream {
  color: var(--color-cream);
}
.line--outline {
  color: transparent;
  -webkit-text-stroke: 2px var(--color-fg);
}

.copy {
  max-width: 680px;
  margin: clamp(36px, 6vh, 72px) auto 0;
  font-size: clamp(16px, 1.3vw, 21px);
  line-height: 1.7;
  /* no exact token; closest is --color-text-2 (#cfcfcf) */
  color: #c7c7c7;
}

.cta-wrap {
  margin-top: clamp(40px, 7vh, 80px);
  display: flex;
  justify-content: center;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 34px;
  background: var(--color-red);
  color: var(--color-bg);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
