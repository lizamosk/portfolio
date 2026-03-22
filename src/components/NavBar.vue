<script lang="ts" setup>
import FlowerSvg from '@/assets/icons/flower.svg'

const emit = defineEmits<{
  (e: 'contact:click'): void
}>()
</script>

<template>
  <nav
    class="NavBar sticky top-0 w-full bg-neutral-grey flex flex-row align-baseline justify-between pb-4 pt-8 px-8 lg:px-20 xl:px-24"
  >
    <a href="#"><FlowerSvg /> </a>
    <div class="flex flex-row w-64 gap-20 justify-end">
      <a class="ActionLink"> {{ $t('navigation.cv') }} </a>
      <a class="ActionLink" @click="emit('contact:click')"> {{ $t('navigation.contacts') }} </a>
    </div>
  </nav>
</template>
