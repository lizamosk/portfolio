import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'

export function useActiveItemOnScroll(
  containerRef: Ref<HTMLElement | null>,
  itemSelector: string
): {
  activeEl: Ref<HTMLElement | null>
  index: Ref<number>
  scrollToSlide: (index: number) => void
} {
  const activeEl = ref(null)
  const activeElIndex = ref<number>(0)
  let observer: IntersectionObserver | null = null
  const visibleMap = new Map<HTMLElement, { ratio: number; index: number }>()

  onMounted(() => {
    const container = containerRef.value
    if (!container) return

    const items = container.querySelectorAll(itemSelector)

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement
            const trueIndex = Array.prototype.indexOf.call(items, target) // get true index
            visibleMap.set(e.target, { ratio: e.intersectionRatio, index: trueIndex })
          } else {
            visibleMap.delete(e.target)
          }
        })

        if (visibleMap.size) {
          const mostVisible = [...visibleMap.entries()]
            .sort((a, b) => a[1].index - b[1].index)
            .sort((a, b) => b[1].ratio - a[1].ratio)[0][0]
          activeEl.value = mostVisible
          activeElIndex.value = visibleMap.get(mostVisible)!.index
        }
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    items.forEach((el) => observer?.observe(el))
  })

  const scrollToSlide = (newIndex: number) => {
    const container = containerRef.value
    if (!container) {
      return
    }
    const indexedItem = container.querySelectorAll(itemSelector).item(newIndex)
    activeElIndex.value = newIndex
    indexedItem.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { activeEl, index: activeElIndex, scrollToSlide }
}
