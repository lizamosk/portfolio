import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const useIsMobile = () => {
  const { width, height } = useWindowSize()
  return computed(() => width.value < 720)
}
