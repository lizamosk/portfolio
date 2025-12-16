<script setup lang="ts">
import { onMounted, ref, useSlots } from 'vue'
import Button from '@/components/base/Button.vue'

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
onMounted(() => {
  console.log('Carousel:', props)
})

const activeSlide = ref(0)
const viewNextSlide = () => {
  if (activeSlide.value === props.slides.length - 1) {
    activeSlide.value = 0;
  } else {
    activeSlide.value++;
    console.log(activeSlide.value)
  }
}
</script>

<template>
  <section
    class="snap-mandatory flex scroll-smooth overflow-auto Slides"
    :class="[direction === 'horizontal' ? 'snap-x' : 'snap-y flex-col']"
    :style="{ height: height + 'px' }"
  >
    <div
      :key="slide.toString()"
      v-for="(slide, i) in slides"
      class="Slide__container snap-center flex"
      :class="[direction === 'vertical' && 'flex-col']"
      :style="{ '--n': i }"
    >
      <component :is="slideComponent" class="Slide" v-bind="slide">
<!--        <Button @click="viewNextSlide"> > </Button>-->
      </component>
    </div>
  </section>
</template>
