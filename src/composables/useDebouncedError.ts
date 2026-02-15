import { ref, Ref, watch } from 'vue'

export function useDebouncedError(errorRef: Ref<string | undefined>, delay = 2000) {
  const visibleError = ref<string | undefined>()
  let timer: ReturnType<typeof setTimeout>

  watch(errorRef, (newError) => {
    // 1. If the field becomes VALID, clear error immediately
    if (!newError) {
      clearTimeout(timer)
      visibleError.value = undefined
      return
    }

    // 2. If invalid, wait X seconds before showing the message
    clearTimeout(timer)
    timer = setTimeout(() => {
      visibleError.value = newError
    }, delay)
  })

  return visibleError
}
