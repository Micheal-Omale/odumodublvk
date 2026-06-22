import { provide, inject, ref } from 'vue'

const LENIS_KEY = Symbol('lenis')

// Called once in App.vue. Returns a ref that App fills in once Lenis is created
// (Lenis is built in onMounted, after child setup runs — so we share a ref, not
// the instance itself, and consumers read .value lazily at click time).
export function provideLenis() {
  const lenis = ref(null)
  provide(LENIS_KEY, lenis)
  return lenis
}

// Called in any component that needs to scroll. Returns the shared ref;
// .value is the Lenis instance, or null before App.vue has initialised it.
export function useLenis() {
  return inject(LENIS_KEY, ref(null))
}
