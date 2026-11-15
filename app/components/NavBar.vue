<script lang="ts" setup>
import FlowerSvg from '@/assets/icons/flower.svg'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { CV_PATH } from '@/contants'

const emit = defineEmits<{
  (e: 'contact:click'): void
}>()
</script>

<template>
  <nav
    class="NavBar sticky w-full flex flex-row items-center justify-between pb-4 pt-8 px-8 lg:px-20 xl:px-24"
  >
    <a href="#" :aria-label="$t('a11y.logo_link')"><FlowerSvg aria-hidden="true" /> </a>
    <div class="flex flex-row items-center gap-5 sm:gap-10 justify-end">
      <a class="ActionLink" :href="CV_PATH" target="_blank" rel="noreferrer noopener">
        {{ $t('navigation.cv') }}
      </a>
      <a class="ActionLink" href="#contact-page" @click.prevent="emit('contact:click')">
        {{ $t('navigation.contacts') }}
      </a>
      <ThemeSwitch />
    </div>
  </nav>
</template>
