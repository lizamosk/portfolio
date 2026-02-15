import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const useIsMobile = () => {
  const { width, height } = useWindowSize()
  return computed(() => width.value < 640)
}

export const useIsTablet = () => {
  const { width, height } = useWindowSize()
  return computed(() => width.value < 1024)
}
