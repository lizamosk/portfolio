<script lang="ts" setup>
import ScrollDownButtonIcon from '@/assets/icons/scroll-down.svg'
import { scrollToNextPage } from '@/util/scroll'
</script>

<template>
  <div class="flex justify-center">
    <button
      class="flex justify-center"
      :aria-label="$t('a11y.scroll_next')"
      :title="$t('a11y.scroll_next')"
      @click="scrollToNextPage"
    >
      <ScrollDownButtonIcon
        aria-hidden="true"
        class="bounce-out-down fixed bottom-10 text-accent"
      />
    </button>
  </div>
</template>
