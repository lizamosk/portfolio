<script setup lang="ts">
import FlowerSvg from '@/assets/icons/flower.svg'
import InstagramLogo from '@/assets/icons/social/instagram.svg'
import LinkedinLogo from '@/assets/icons/social/linkedin.svg'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="text-white w-full
    grid-rows-2
    bg-dust-blue grid grid-cols-2 md:grid-cols-3 align-baseline justify-between pb-4 pt-8 px-8"
  >
    <div>
      <a href="#">Made by Liza Moskalenko <FlowerSvg /> </a>
      <a> {{ $t('navigation.cv') }} </a>
    </div>
    <span class="row-start-2 md:col-start-2 text-center"> {{ currentYear }}</span>
    <div class="flex flex-col gap-4 md:col-start-3 items-end">
      <div class="flex gap-2 justify-start">
        <a> <LinkedinLogo /> </a>
        <a> <InstagramLogo /></a>
      </div>
      <span> limoskk1@gmail.com </span>
    </div>
  </footer>
</template>
