<script lang="ts" setup>
import Button from '@/components/base/Button.vue'
import ScrollDownButton from '@/components/ScrollDownButton.vue'
import PageContainer from '@/components/base/PageContainer.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useElementVisibility, useIntersectionObserver } from '@vueuse/core'
import PencilShapeSvg from '@/assets/icons/vector/pencil-shape.svg'
import { animate, svg } from 'animejs'
import welcomeVideo from '@/assets/video/welcome.mp4'
import welcomePoster from '@/assets/video/welcome-poster.webp'
import { downloadCV } from '@/util/cv'

const pageRef = useTemplateRef<HTMLElement>('page')
const isPageVisible = useElementVisibility(pageRef)
const videoPlayer = useTemplateRef<HTMLVideoElement>('videoPlayer')
const prefersReducedMotion =
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isVideoPlaying = ref(false)
// Once the visitor pauses the video, scrolling must not restart it behind their back.
const pausedByUser = ref(prefersReducedMotion)

const toggleVideo = () => {
  const video = videoPlayer.value
  if (!video) {
    return
  }
  if (video.paused) {
    pausedByUser.value = false
    void video.play()
  } else {
    pausedByUser.value = true
    video.pause()
  }
}

// The poster is the largest element above the fold: fetch it with top priority so
// the hero is complete on first paint, before the video itself has buffered.
useHead({
  link: [{ rel: 'preload', as: 'image', href: welcomePoster, fetchpriority: 'high' }],
})

const emit = defineEmits<{
  (e: 'contact:click'): void
}>()

useIntersectionObserver(
  videoPlayer,
  ([{ isIntersecting }]) => {
    if (!videoPlayer.value) {
      return
    }
    if (isIntersecting) {
      if (!pausedByUser.value) {
        void videoPlayer.value.play()
      }
    } else {
      videoPlayer.value.pause()
    }
  },
  { immediate: true }
)

onMounted(() => {
  // Reduced motion: leave the pencil circle fully drawn instead of looping it
  if (prefersReducedMotion) {
    return
  }
  animate(svg.createDrawable('.pencil-shape-path'), {
    draw: '0 1',
    ease: 'linear',
    duration: 3000,
    loop: true,
  })
})
</script>

<template>
  <PageContainer>
    <div ref="page" class="flex flex-col lg:flex-row gap-8 md:gap-16">
      <div class="Welcome-column">
        <p class="Greeting mb-5 md:mb-12">{{ $t('intro.greeting') }}</p>

        <h1 class="mb-6 md:mb-12">
          <span> {{ $t('intro.header.role') }} </span
          ><span class="scramble-text">{{ $t('intro.header.role2') }} </span>
          <br />
          <span class="flex mt-2">
            <span class="whitespace-nowrap"> {{ $t('intro.header.of_your') }} </span>
            <span>&nbsp;</span>
            <!-- The circle is sized from the word itself, so it fits any language/font size -->
            <span class="relative">
              <PencilShapeSvg
                aria-hidden="true"
                class="pointer-events-none absolute -left-2 -top-2 h-[calc(100%+1rem)] w-[calc(120%+1.5rem)] overflow-visible text-accent"
              />
              <span class="ml-1">{{ $t('intro.header.dreams') }} </span>
            </span>
          </span>
        </h1>

        <div class="flex flex-col gap-6 min-w-2xs max-w-80">
          <Button
            class="px-16 transition-transform duration-300 hover:scale-105"
            shine
            @click="
              (e) => {
                emit('contact:click')
                e.currentTarget.blur()
              }
            "
          >
            {{ $t('intro.contact_me') }}
          </Button>
          <Button
            class="px-16 transition-transform duration-300 hover:scale-105"
            type="outlined"
            @click="downloadCV"
          >
            {{ $t('intro.download_cv') }}
          </Button>
        </div>
      </div>
      <div class="Welcome-column video-wrapper relative w-fit self-center">
        <video
          ref="videoPlayer"
          class="rounded-3xl max-h-[40rem] w-auto"
          height="1080"
          loop
          muted
          playsinline
          :poster="welcomePoster"
          preload="auto"
          :src="welcomeVideo"
          width="1000"
          @pause="isVideoPlaying = false"
          @play="isVideoPlaying = true"
        />
        <button
          :aria-label="isVideoPlaying ? $t('a11y.pause_video') : $t('a11y.play_video')"
          class="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-strong shadow-md"
          type="button"
          @click="toggleVideo"
        >
          <svg
            v-if="isVideoPlaying"
            aria-hidden="true"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect height="14" rx="1" width="4.5" x="5" y="5" />
            <rect height="14" rx="1" width="4.5" x="14.5" y="5" />
          </svg>
          <svg v-else aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"
            />
          </svg>
        </button>
      </div>
    </div>
    <ScrollDownButton v-if="isPageVisible" />
  </PageContainer>
</template>
