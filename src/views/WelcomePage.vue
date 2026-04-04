<script lang="ts" setup>
import Button from '@/components/base/Button.vue'
import ScrollDownButton from '@/components/ScrollDownButton.vue'
import PageContainer from '@/components/base/PageContainer.vue'
import { onMounted, useTemplateRef } from 'vue'
import { useElementVisibility, useIntersectionObserver } from '@vueuse/core'
import PencilShapeSvg from '@/assets/icons/vector/pencil-shape.svg'
import { animate, svg } from 'animejs'
import welcomeVideo from '@/assets/video/welcome.mp4'
import { downloadCV } from '@/util/cv'

const pageRef = useTemplateRef<HTMLElement>('page')
const isPageVisible = useElementVisibility(pageRef)
const videoPlayer = useTemplateRef<HTMLVideoElement>('videoPlayer')

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
      videoPlayer.value.play()
    } else {
      videoPlayer.value.pause()
    }
  },
  { immediate: true }
)

onMounted(() => {
  animate(svg.createDrawable('.pencil-shape-path'), {
    draw: '0 1',
    ease: 'linear',
    duration: 3000,
    loop: true,
  })
})
</script>

<template>
  <PageContainer class="reveal-container">
    <div ref="page" class="flex flex-col lg:flex-row gap-8 md:gap-16">
      <div class="Welcome-column">
        <h2 class="has-text-brand-blue md:mb-12">{{ $t('intro.greeting') }}</h2>

        <h1 class="tracking-widest mb-6 md:mb-12">
          <span> {{ $t('intro.header.role') }} </span
          ><span class="scramble-text">{{ $t('intro.header.role2') }} </span>
          <br />
          <div class="flex">
            <span class="whitespace-nowrap"> {{ $t('intro.header.of_your') }} </span>
            <div class="relative">
              <PencilShapeSvg class="absolute top-[-15px] md:top-[-5px] md:w-[240px]" />
              <span>&nbsp;{{ $t('intro.header.dreams') }} </span>
            </div>
          </div>
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
          <Button class="px-16 transition-transform duration-300 hover:scale-105" type="outlined"
          @click="downloadCV">
            {{ $t('intro.download_cv') }}
          </Button>
        </div>
      </div>
      <div class="Welcome-column video-wrapper w-fit self-center">
        <video
          ref="videoPlayer"
          class="rounded-3xl max-h-[40rem]"
          loop
          muted
          playsinline
          preload="auto"
          :src="welcomeVideo"
        />
      </div>
    </div>
    <ScrollDownButton v-if="isPageVisible" />
  </PageContainer>
</template>
