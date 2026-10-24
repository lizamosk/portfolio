<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import { useActiveItemOnScroll } from '@/composables/useActiveItemOnScroll'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg'
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg'
import ChevronUpIcon from '@/assets/icons/chevron-up.svg'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'

const props = defineProps({
  direction: {
    direction: String,
    default: 'horizontal',
    validator: (value: string) => {
      return ['horizontal', 'vertical'].includes(value)
    },
  },
  slides: {
    type: Array<object>,
    required: true,
  },
  slideComponent: { type: Object, required: true },
  height: {
    type: Number,
    default: 400,
  },
})

const containerRef = useTemplateRef('slides')
const { index: activeSlideIndex, scrollToSlide } = useActiveItemOnScroll(
  containerRef,
  '.Slide__container'
)

const viewNextSlide = () => {
  if (activeSlideIndex.value === props.slides.length - 1) {
    scrollToSlide(0)
  } else {
    scrollToSlide(activeSlideIndex.value! + 1)
  }
}

const viewPreviousSlide = () => {
  if (activeSlideIndex.value === 0) {
    scrollToSlide(props.slides.length - 1)
  } else {
    scrollToSlide(activeSlideIndex.value! - 1)
  }
}

const isVertical = computed(() => props.direction === 'vertical')

const navigationIcons = computed(() => {
  return isVertical.value
    ? { iconPrevious: ChevronUpIcon, iconNext: ChevronDownIcon }
    : { iconPrevious: ChevronLeftIcon, iconNext: ChevronRightIcon }
})
</script>

<template>
  <section
    ref="slides"
    :class="[direction === 'horizontal' ? 'snap-x' : 'snap-y flex-col']"
    class="snap-mandatory flex scroll-smooth overflow-auto Slides"
  >
    <div
      v-for="(slide, i) in slides"
      :key="slide.toString()"
      :class="[
        isVertical && 'flex-col',
        `Slide__container-${i}`,
        i === activeSlideIndex && 'Slide__container--active',
      ]"
      :style="{ '--n': i + 1 }"
      class="Slide__container snap-center flex"
    >
      <div :class="isVertical ? 'flex-col' : 'flex-row'" class="Slide__frame flex w-full">
        <component
          :is="navigationIcons.iconPrevious"
          v-if="i > 0"
          class="w-8 h-8 icon primary"
          :class="[
            activeSlideIndex !== i ? 'invisible pointer-events-none' : '',
            isVertical ? 'mb-3' : 'mr-3',
          ]"
          @click="
            () => {
              if (activeSlideIndex === i) {
                viewPreviousSlide()
              }
            }
          "
        ></component>
        <component
          :is="slideComponent"
          :class="isVertical ? 'Slide--vertical' : 'Slide--horizontal'"
          v-bind="slide"
        >
        </component>
        <component
          :is="navigationIcons.iconNext"
          v-if="i < slides.length - 1"
          class="w-8 h-8 icon primary"
          :class="[
            activeSlideIndex !== i ? 'invisible pointer-events-none' : '',
            isVertical ? 'mt-3' : 'mr-3',
          ]"
          @click="
            () => {
              if (activeSlideIndex === i) {
                viewNextSlide()
              }
            }
          "
        ></component>
      </div>
    </div>
  </section>
</template>
