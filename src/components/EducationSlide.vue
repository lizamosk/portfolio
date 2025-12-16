<script setup lang="ts">
defineProps<{
  place: string
  image: string
  dates: string
  title: string
  ctaPosition?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div>
    <div :key="title" class="Slide flex items-center flex-col bg-neutral-base px-8 py-6 rounded-2xl">
      <div class="Slide__text mb-4">
        <p>
          <span class="has-text-brand-blue"> {{ place }}</span
          >, {{ dates }}
        </p>
        <span> {{ title }}</span>
      </div>
      <img class="Slide__image" :src="image" :alt="place" />
    </div>
  </div>
  <slot />
</template>
