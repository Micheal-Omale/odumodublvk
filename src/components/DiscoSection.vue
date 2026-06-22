<script setup>
import { useLenis } from '../composables/useLenis'
import imgEziokwu from '@/assets/images/ezioku.jpg'
import imgIndustry from '@/assets/images/indmach.webp'
import imgMachine from '@/assets/images/themachine.jpg'
import imgDeluxewave from '@/assets/images/deluxe.jpg'
// Horizontal scroll position (data-disco-track) + fill (data-disco-fill) are driven
// by App.vue's rAF loop. This component only declares the hooks and the CTA scroll.
const lenis = useLenis()
function scrollTo(hash) {
  const target = document.querySelector(hash)
  if (target) lenis.value?.scrollTo(target, { offset: 0 })
}

// Only two matching cover files exist; Blackwar / New Wave fall back to placeholders.
const albums = [
  {
    title: 'EZIOKWU',
    year: '2023',
    tracks: '15 Tracks',
    format: 'LP',
    blurb: 'Debut album · The truth, undiluted.',
    cover: imgEziokwu,
    alt: 'Eziokwu cover',
  },
  {
    title: 'DELUXE',
    year: '2021',
    tracks: '15 Tracks',
    format: 'EP',
    blurb: 'EP · Drill meets the diaspora.',
    cover: imgDeluxewave,
    alt: 'deluxe cover',
  },
  {
    title: 'THE MACHINE',
    year: '2025',
    tracks: '16 Tracks',
    format: 'LP',
    blurb: 'Sophomore LP · Bigger, louder, undefeated.',
    cover: imgMachine,
    alt: 'The Machine cover',
  },
  {
    title: 'INDUSTRY MACHINE',
    year: '2025',
    tracks: '23 Tracks',
    format: 'LP',
    blurb: 'Latest · Out now everywhere.',
    cover: imgIndustry,
    alt: 'New Wave cover',
  },
]
</script>

<template>
  <section id="disco" class="disco" data-disco>
    <div class="pin" data-disco-pin>
      <!-- section header -->
      <div class="header">
        <div>
          <div class="eyebrow"><span class="rule"></span>01 — Discography</div>
          <h2 class="title">THE&nbsp;CATALOGUE</h2>
        </div>
        <div class="header-hint">Scroll →<br />14 Records</div>
      </div>

      <!-- horizontal track -->
      <div class="track" data-disco-track>
        <!-- intro panel -->
        <div class="intro">
          <p class="intro-copy">
            From the underground drill cuts to platinum-certified statements — a body of work
            that rewired the sound of a generation. Drag through the years.
          </p>
          <div class="intro-stats">
            <div>
              <div class="stat-num stat-num--red">14</div>
              <div class="stat-label">Records</div>
            </div>
            <div>
              <div class="stat-num">3×</div>
              <div class="stat-label">Platinum</div>
            </div>
          </div>
        </div>

        <!-- album cards -->
        <div v-for="album in albums" :key="album.title" class="album" data-album data-cursor>
          <div class="album-art" data-album-art>
            <img
              v-if="album.cover"
              class="art-media"
              :src="album.cover"
              :alt="album.alt"
            />
            <div v-else class="art-media art-placeholder">{{ album.title }}</div>
            <div class="album-meta" data-album-meta>
              <div class="album-meta-row">
                <span>{{ album.year }}</span><span>{{ album.tracks }}</span><span>{{ album.format }}</span>
              </div>
            </div>
          </div>
          <div class="album-head">
            <h3 class="album-name">{{ album.title }}</h3>
            <span class="album-year">{{ album.year }}</span>
          </div>
          <p class="album-blurb">{{ album.blurb }}</p>
        </div>

        <!-- end panel -->
        <div class="end">
          <div class="end-word">STREAM<br />IT<br />ALL</div>
          <a class="cta mag" href="#awards" data-cursor @click.prevent="scrollTo('#awards')">
            Full Catalogue →
          </a>
        </div>
      </div>

      <!-- progress fill -->
      <div class="fill-track">
        <div class="fill" data-disco-fill></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.disco {
  position: relative;
  height: 420vh;
  background: var(--color-bg);
}

.pin {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ---- header ---- */
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6; /* no token above sticker:5 */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: clamp(70px, 12vh, 140px) var(--page-x) 0;
  pointer-events: none;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-orange);
  margin-bottom: 8px;
}
.rule {
  width: 40px;
  height: 1px;
  background: var(--color-orange);
}
.title {
  font-family: var(--font-display);
  font-size: min(11vw, 150px);
  line-height: 0.82;
  letter-spacing: -1px;
  margin: 0;
  color: var(--color-fg);
}
.header-hint {
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-muted-2);
  text-align: right;
  display: none; /* hidden in the source; kept for fidelity */
}

/* ---- horizontal track ---- */
.track {
  display: flex;
  align-items: center;
  gap: clamp(40px, 5vw, 90px);
  height: 100%;
  padding: 0 var(--page-x);
  will-change: transform;
}

/* ---- intro panel ---- */
.intro {
  flex: none;
  width: 34vw;
  min-width: 300px;
}
.intro-copy {
  font-size: clamp(15px, 1.2vw, 19px);
  line-height: 1.65;
  color: var(--color-text-3);
  max-width: 380px;
}
.intro-stats {
  margin-top: 30px;
  display: flex;
  gap: 34px;
}
.stat-num {
  font-family: var(--font-display);
  font-size: 46px;
  line-height: 1;
  color: var(--color-fg);
}
.stat-num--red {
  color: var(--color-red);
}
.stat-label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-top: 4px;
}

/* ---- album cards ---- */
.album {
  flex: none;
  position: relative;
  width: min(40vw, 440px);
}
.album-art {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.album:hover .album-art {
  transform: translateY(-8px);
}
.art-media {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.album:hover .art-media {
  transform: scale(1.08);
}
.art-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 8%;
  /* CLAUDE.md placeholder tint until a real cover is dropped in */
  background: rgba(255, 255, 255, 0.05);
  font-family: var(--font-display);
  font-size: clamp(20px, 2.5vw, 34px);
  letter-spacing: 1px;
  color: var(--color-muted-2);
}
.album-meta {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 5, 5, 0) 40%, var(--color-overlay));
  opacity: 0;
  transition: opacity 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
}
.album:hover .album-meta {
  opacity: 1;
}
.album-meta-row {
  display: flex;
  gap: 24px;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-cream);
}
.album-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 18px;
}
.album-name {
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 42px);
  letter-spacing: 0.5px;
  margin: 0;
  color: var(--color-fg);
}
.album-year {
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--color-orange);
}
.album-blurb {
  font-size: 13px;
  color: var(--color-muted);
  margin: 6px 0 0;
  letter-spacing: 0.5px;
}

/* ---- end panel ---- */
.end {
  flex: none;
  width: 30vw;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.end-word {
  font-family: var(--font-display);
  font-size: min(8vw, 90px);
  line-height: 0.85;
  color: var(--color-cream);
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
  padding: 16px 28px;
  border: 1px solid var(--color-border-2);
  border-radius: 100px;
  color: var(--color-fg);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  width: max-content;
}

/* ---- progress fill ---- */
.fill-track {
  position: absolute;
  bottom: 46px;
  left: var(--page-x);
  right: var(--page-x);
  height: 2px;
  z-index: 6;
  /* no token for this faint track tint; literal per source */
  background: rgba(255, 255, 255, 0.12);
}
.fill {
  height: 100%;
  width: 100%;
  background: var(--color-red);
  transform-origin: left;
  transform: scaleX(0);
}
</style>
