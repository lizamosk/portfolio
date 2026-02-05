<script lang="ts" setup>
import ScrollDownButtonIcon from '@/assets/icons/scroll-down.svg'
import { scrollToNextPage } from '@/util/scroll'
</script>

<template>
  <div class="flex justify-center">
    <button class="flex justify-center" @click="scrollToNextPage">
      <ScrollDownButtonIcon class="bounce-out-down fixed bottom-10" />
    </button>
  </div>
</template>
