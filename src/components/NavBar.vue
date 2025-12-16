<script setup lang="ts">
import FlowerSvg from "@/assets/icons/flower.svg";
</script>

<template>
  <nav
    class="NavBar fixed top-0 w-full bg-neutral-grey flex flex-row
    align-baseline justify-between pb-4 pt-8 px-8"
  >
    <a href="#"><FlowerSvg /> </a>
    <div class="flex flex-row w-64 gap-20 justify-end">
      <a> {{ $t('navigation.cv')}} </a>
      <a> {{ $t('navigation.contacts')}} </a>
    </div>
  </nav>
</template>
