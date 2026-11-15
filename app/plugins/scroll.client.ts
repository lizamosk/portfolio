import { initScrollToTopOnHardLoad } from '@/util/scroll'

// Must run before the app mounts, see util/scroll.ts
export default defineNuxtPlugin({
  name: 'scroll-to-top-on-hard-load',
  enforce: 'pre',
  setup() {
    initScrollToTopOnHardLoad()
  },
})
