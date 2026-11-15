<script lang="ts" setup>
import { ref } from 'vue'
import { getRelativeImageUrl } from '@/util/url'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
      class="Slide w-full justify-between flex items-center flex-col bg-surface border border-line px-8 py-6 rounded-2xl m-1"
    >
      <div class="Slide__text mb-4 self-start">
        <p>
          <span class="text-accent font-semibold"> {{ place }}</span
          >, {{ dates }}
        </p>
        <span> {{ title }}</span>
      </div>
      <button
        :aria-label="t('a11y.enlarge_image')"
        class="Slide__imageButton"
        type="button"
        @click="openFullScreen"
      >
        <img
          :alt="place"
          loading="lazy"
          :src="getRelativeImageUrl(props.image)"
          class="Slide__image"
        />
      </button>
    </div>
  </div>
  <slot />
</template>
