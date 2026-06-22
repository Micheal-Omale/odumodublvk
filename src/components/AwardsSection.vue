<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

// Reveal + count-up scoped to this section's root.
const sectionEl = ref(null)
useReveal(sectionEl)

const awardRows = [
  {
    year: '2021',
    countFrom: '2016',
    entries: [
      { name: 'NEXT RATED — HEADIES', status: 'Winner', delay: 60 },
      { name: 'BREAKTHROUGH ACT — SOUNDCITY', status: 'Nominee', delay: 140 },
    ],
  },
  {
    year: '2023',
    countFrom: '2018',
    entries: [
      { name: 'ALBUM OF THE YEAR — EZIOKWU', status: 'Winner', delay: 60 },
      { name: 'BEST RAP — MOBO AWARDS', status: 'Winner', delay: 140 },
    ],
  },
  {
    year: '2025',
    countFrom: '2020',
    entries: [
      { name: 'BRIT — INTERNATIONAL ACT', status: 'Nominee', delay: 60 },
      { name: 'GRAMMY — BEST GLOBAL ALBUM', status: 'Nominee', delay: 140, highlight: true },
    ],
  },
]

const stats = [
  { value: '9', count: '9', suffix: '', label: 'Awards Won', delay: 0 },
  { value: '27', count: '27', suffix: '', label: 'Nominations', delay: 80 },
  { value: '1B+', count: '1', suffix: 'B+', decimals: 1, label: 'Streams', delay: 160 },
]
</script>

<template>
  <section id="awards" ref="sectionEl" class="awards">
    <div class="eyebrow" data-reveal><span class="rule"></span>02 — Accolades</div>
    <h2 class="title" data-reveal>A&nbsp;DECADE<br />OF&nbsp;<span class="hot">FIRSTS</span></h2>

    <div class="rows">
      <div v-for="row in awardRows" :key="row.year" class="row" data-award-row>
        <div class="year" data-reveal :data-count="row.year" :data-count-from="row.countFrom">
          {{ row.year }}
        </div>
        <div class="entries">
          <div
            v-for="entry in row.entries"
            :key="entry.name"
            class="entry"
            data-reveal
            :data-reveal-delay="entry.delay"
          >
            <span class="entry-name">{{ entry.name }}</span>
            <span class="entry-status" :class="{ 'entry-status--hot': entry.highlight }">
              {{ entry.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="stats">
      <div
        v-for="stat in stats"
        :key="stat.label"
        data-reveal
        :data-reveal-delay="stat.delay"
      >
        <div
          class="stat-num"
          :data-count="stat.count"
          :data-suffix="stat.suffix"
          :data-count-decimals="stat.decimals"
        >
          {{ stat.value }}
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Inverted section: cream background, dark text. */
.awards {
  position: relative;
  background: var(--color-cream);
  color: var(--color-bg);
  padding: var(--section-y-lg) var(--page-x);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 14px;
}
.rule {
  width: 40px;
  height: 1px;
  background: var(--color-red);
}

.title {
  font-family: var(--font-display);
  font-size: min(13vw, 190px);
  line-height: 0.82;
  letter-spacing: -2px;
  margin: 0 0 clamp(40px, 7vh, 90px);
}
.hot {
  color: var(--color-red);
}

/* ---- year rows ---- */
.rows {
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--color-bg);
}
.row {
  display: grid;
  grid-template-columns: minmax(180px, 28vw) 1fr;
  gap: clamp(20px, 4vw, 70px);
  padding: clamp(28px, 4vh, 52px) 0;
  border-bottom: 2px solid var(--color-bg);
  align-items: start;
}
.year {
  font-family: var(--font-display);
  font-size: min(11vw, 150px);
  line-height: 0.8;
  letter-spacing: -1px;
}
.entries {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.entry {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  /* no token for this dark-with-alpha hairline; literal per source */
  border-bottom: 1px solid rgba(5, 5, 5, 0.2);
  padding-bottom: 14px;
}
.entry-name {
  font-family: var(--font-display);
  font-size: clamp(20px, 2vw, 30px);
  letter-spacing: 0.5px;
}
.entry-status {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-gold);
  white-space: nowrap;
}
.entry-status--hot {
  color: var(--color-red);
  font-weight: 700;
}

/* ---- stat band ---- */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 4vw, 60px);
  margin-top: clamp(50px, 8vh, 100px);
}
.stat-num {
  font-family: var(--font-display);
  font-size: min(9vw, 110px);
  line-height: 0.85;
}
.stat-label {
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-top: 8px;
}
</style>
