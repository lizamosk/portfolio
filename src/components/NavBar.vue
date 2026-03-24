<script lang="ts" setup>
import FlowerSvg from '@/assets/icons/flower.svg'
import cv from '@/assets/docs/Liza_Moskalenko_CV_Frontend.pdf'

const emit = defineEmits<{
  (e: 'contact:click'): void
}>()
</script>

<template>
  <nav
    class="NavBar sticky w-full bg-neutral-grey flex flex-row align-baseline justify-between pb-4 pt-8 px-8 lg:px-20 xl:px-24"
  >
    <a href="#"><FlowerSvg /> </a>
    <div class="flex flex-row w-64 gap-20 justify-end">
      <a class="ActionLink" :href="cv" target="_blank" rel="noreferrer noopener">
        {{ $t('navigation.cv') }}
      </a>
      <a class="ActionLink" @click="emit('contact:click')"> {{ $t('navigation.contacts') }} </a>
    </div>
  </nav>
</template>
