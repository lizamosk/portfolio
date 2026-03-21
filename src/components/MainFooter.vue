<script lang="ts" setup>
import InstagramLogo from '@/assets/icons/social/instagram.svg'
import LinkedinLogo from '@/assets/icons/social/linkedin.svg'
import TelegramLogo from '@/assets/icons/social/telegram.svg'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer-touch-safe-bottom mb-2 text-white w-full grid-rows-[1fr_auto] bg-dust-blue grid grid-cols-3 align-baseline justify-between pb-4 pt-8 px-8 lg:px-20 xl:px-24"
  >
    <div class="flex flex-col gap-2">
      <p class="flex">Made by Liza Moskalenko &#129653;</p>
      <a class="ActionLink light"> {{ $t('navigation.cv') }} </a>
    </div>
    <span class="row-start-2 col-start-2 text-center pt-3 pb-4"> {{ currentYear }}</span>
    <div class="flex flex-col gap-4 col-start-3 items-end">
      <div class="flex gap-2 justify-start">
        <a href="https://t.me/limoskk" target="_blank">
          <TelegramLogo class="ActionLink light"
        /></a>
        <a href="https://www.linkedin.com/in/limoskk/" target="_blank">
          <LinkedinLogo class="ActionLink light" />
        </a>
        <a href="https://www.instagram.com/limoskk/" target="_blank">
          <InstagramLogo class="ActionLink light"
        /></a>
      </div>
      <a
        class="ActionLink light break-words text-left lg:text-right"
        href="mailto:limoskk.social@gmail.com"
      >
        limoskk.social@gmail.com
      </a>
    </div>
<!--    <span class="text-center text-sm opacity-90 lg:row-start-2 lg:col-start-2 lg:pt-3 lg:pb-4">-->
<!--      {{ currentYear }}-->
<!--    </span>-->
  </footer>
</template>
