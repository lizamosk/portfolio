import { useMediaQuery, useMounted } from '@vueuse/core'
import { computed } from 'vue'

// The server cannot know the viewport, so it always renders the desktop variant.
// Reporting `false` until the component has mounted keeps the client's first render
// identical to that HTML (no hydration mismatch); the real value applies right after.
const useMaxWidth = (maxWidth: number) => {
  const isMounted = useMounted()
  const matches = useMediaQuery(`(max-width: ${maxWidth - 0.02}px)`)
  return computed(() => isMounted.value && matches.value)
}

export const useIsMobile = () => useMaxWidth(640)

export const useIsTablet = () => useMaxWidth(1024)
