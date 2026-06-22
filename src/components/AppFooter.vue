<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import { useLenis } from '../composables/useLenis'

// Reveal scoped to the footer root.
const footerEl = ref(null)
useReveal(footerEl)

const lenis = useLenis()
function scrollTo(hash) {
  const target = document.querySelector(hash)
  if (target) lenis.value?.scrollTo(target, { offset: 0 })
}

// Placeholder destinations — swap '#' for real URLs when available.
const columns = [
  {
    title: 'Listen',
    links: [
      { label: 'Spotify', href: '#' },
      { label: 'Apple Music', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'TikTok', href: '#' },
    ],
  },
  {
    title: 'Business',
    links: [
      { label: 'Bookings', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Management', href: '#' },
    ],
  },
]
</script>

<template>
  <footer id="footer" ref="footerEl" class="footer">
    <!-- top row -->
    <div class="top">
      <div class="brand" data-reveal>
        <div class="brand-label">Signature</div>
        <p class="brand-line">BUILT LOUD.<br />BUILT TO LAST.</p>
      </div>

      <div class="cols" data-reveal data-reveal-delay="80">
        <div v-for="col in columns" :key="col.title" class="col">
          <div class="col-title">{{ col.title }}</div>
          <div class="col-links">
            <a
              v-for="link in col.links"
              :key="link.label"
              class="link mag"
              :href="link.href"
              data-cursor
              @click.prevent
              >{{ link.label }}</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- floating stickers -->
    <div class="sticker sticker-thanks">
      <div class="thanks">THANK<br />YOU</div>
    </div>
    <div class="sticker sticker-year">
      <div class="year-badge">2026</div>
    </div>

    <!-- giant name -->
    <div class="giant" data-footer-name>
      <div class="giant-top">ODUMODU</div>
      <div class="giant-bottom">BL<span class="v">V</span>CK</div>
    </div>

    <!-- baseline -->
    <div class="baseline">
      <span>© 2026 ODUMODUBLVCK · Antiworld Sound</span>
      <span>Abuja → London → World</span>
      <a class="totop mag" href="#hero" data-cursor @click.prevent="scrollTo('#hero')">
        Back to top <span class="arrow">↑</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
  color: var(--color-fg);
  padding: var(--section-y-footer) var(--page-x) 40px;
  border-top: 1px solid var(--color-border);
}

/* ---- top row ---- */
.top {
  position: relative;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
  align-items: flex-start;
}
.brand-label {
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-orange);
  margin-bottom: 18px;
}
.brand-line {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.4vw, 38px);
  line-height: 1.05;
  letter-spacing: 0.5px;
  margin: 0;
  max-width: 14ch;
}
.cols {
  display: flex;
  gap: clamp(30px, 5vw, 80px);
}
.col-title {
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-muted-2);
  margin-bottom: 16px;
}
.col-links {
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 14px;
}
.link {
  color: var(--color-text-2);
  text-decoration: none;
}

/* ---- floating stickers ---- */
.sticker {
  position: absolute;
  z-index: 2;
}
.sticker-thanks {
  top: 18%;
  right: 18vw;
  animation: floaty 7s ease-in-out infinite;
}
.sticker-year {
  top: 40%;
  left: 30vw;
  animation: floatySlow 8s ease-in-out infinite;
}
.thanks {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--color-orange);
  color: var(--color-bg);
  transform: rotate(-12deg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.5px;
  line-height: 0.9;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
}
.year-badge {
  background: var(--color-red);
  color: var(--color-bg);
  padding: 9px 13px;
  transform: rotate(7deg);
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.5);
}

/* ---- giant name ---- */
.giant {
  position: relative;
  z-index: 3;
  margin-top: clamp(50px, 9vh, 110px);
  text-align: center;
}
.giant-top,
.giant-bottom {
  font-family: var(--font-display);
  font-size: min(20vw, 330px);
  line-height: 0.78;
  letter-spacing: -3px;
  white-space: nowrap;
}
.giant-top {
  color: var(--color-fg);
}
.giant-bottom {
  color: var(--color-cream);
}
.giant-bottom .v {
  color: var(--color-red);
}

/* ---- baseline ---- */
.baseline {
  position: relative;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-top: clamp(40px, 6vh, 70px);
  padding-top: 26px;
  border-top: 1px solid var(--color-border);
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-muted-2);
}
.totop {
  color: var(--color-fg);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.arrow {
  font-family: var(--font-display);
}
</style>
