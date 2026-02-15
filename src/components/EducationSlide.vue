<script lang="ts" setup>
import { ref } from 'vue'
import { getRelativeImageUrl } from '@/util/url'

const props = defineProps<{
  place: string
  image: string
  dates: string
  title: string
  ctaPosition?: 'vertical' | 'horizontal'
}>()

const isFullScreen = ref(false)

const openFullScreen = () => {
  isFullScreen.value = true
}

const onHide = () => {
  isFullScreen.value = false
}
</script>

<template>
  <Teleport to="body">
    <VueEasyLightbox
      :imgs="[{ alt: title, title, src: getRelativeImageUrl(props.image) }]"
      :visible="isFullScreen"
      @hide="onHide"
    ></VueEasyLightbox>
  </Teleport>
  <div v-bind="$attrs" class="flex place-content-center place-items-center w-full">
    <div
      :key="title"
      class="Slide w-full justify-between flex items-center flex-col bg-neutral-base px-8 py-6 rounded-2xl m-1"
    >
      <div class="Slide__text mb-4 self-start">
        <p>
          <span class="has-text-brand-blue font-semibold"> {{ place }}</span
          >, {{ dates }}
        </p>
        <span> {{ title }}</span>
      </div>
      <img
        :alt="place"
        loading="lazy"
        :src="getRelativeImageUrl(props.image)"
        class="Slide__image"
        @click="openFullScreen"
      />
    </div>
  </div>
  <slot />
</template>
