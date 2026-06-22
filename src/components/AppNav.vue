<script setup>
import { useLenis } from '../composables/useLenis'

const lenis = useLenis()

// Anchor links scroll via the shared Lenis instance instead of native jump.
// Targets live in sibling sections, so query the document.
function scrollTo(hash) {
  const target = document.querySelector(hash)
  if (target) lenis.value?.scrollTo(target, { offset: 0 })
}
</script>

<template>
  <nav class="nav">
    <a class="logo mag" href="#hero" data-cursor @click.prevent="scrollTo('#hero')">ODB</a>

    <div class="links">
      <a class="link mag" href="#disco" data-cursor @click.prevent="scrollTo('#disco')">Sound</a>
      <a class="link mag" href="#awards" data-cursor @click.prevent="scrollTo('#awards')">Awards</a>
      <a class="link mag" href="#legacy" data-cursor @click.prevent="scrollTo('#legacy')">Legacy</a>
    </div>

    <div class="live mag" data-cursor>
      <span class="live-dot"></span>Listen
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px var(--page-x);
  mix-blend-mode: difference;
}

.logo {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-fg);
  text-decoration: none;
}

.links {
  display: flex;
  gap: clamp(16px, 2.4vw, 40px);
}

.link {
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-fg);
  text-decoration: none;
}

.live {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-fg);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-red);
  animation: blink 1.6s infinite;
}
</style>
