import { onMounted, onUnmounted } from 'vue'

// Count-up tween duration (ms) — matches the source.
const COUNT_DURATION = 1400

// Scoped scroll-reveal: a component passes its own root ref; every [data-reveal]
// inside it gets data-rv="1" (CSS animates it) once it scrolls into view, after an
// optional [data-reveal-delay]. Elements with [data-count] also count up.
//
// IntersectionObserver-driven (not the rAF loop). Count-up uses short, self-
// terminating rAF tweens — transient animations, not a competing render loop.
export function useReveal(rootRef) {
  let observer = null
  const timers = []
  const rafs = []

  function countUp(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0
    const suffix = el.getAttribute('data-suffix') || ''
    // Optional decimals so small ranges (e.g. 0 → 1 for "1B+") still glide.
    const decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0
    const from = el.hasAttribute('data-count-from')
      ? parseFloat(el.getAttribute('data-count-from'))
      : 0
    const start = performance.now()
    const step = (t) => {
      const k = Math.min((t - start) / COUNT_DURATION, 1)
      const eased = 1 - Math.pow(1 - k, 3)
      const current = from + eased * (target - from)
      if (k < 1) {
        el.textContent = (decimals ? current.toFixed(decimals) : Math.floor(current)) + suffix
        rafs.push(requestAnimationFrame(step))
      } else {
        el.textContent = target + suffix
      }
    }
    rafs.push(requestAnimationFrame(step))
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target
          const delay = parseFloat(el.getAttribute('data-reveal-delay')) || 0
          timers.push(setTimeout(() => el.setAttribute('data-rv', '1'), delay))
          // data-count may be on the revealed element itself (years) or nested
          // inside it (stat numbers live under a [data-reveal] wrapper).
          const countEl = el.matches('[data-count]') ? el : el.querySelector('[data-count]')
          if (countEl) countUp(countEl)
          observer.unobserve(el)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
    )

    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
    timers.forEach(clearTimeout)
    rafs.forEach(cancelAnimationFrame)
  })
}
