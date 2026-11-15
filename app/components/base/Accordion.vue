<script lang="ts" setup>
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'
import { onMounted, ref } from 'vue'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import ChevronUp from '@/assets/icons/chevron-up.svg'

const activeItem = ref()

// A closed panel is not in the DOM at all. Until the app has hydrated, keep a hidden
// copy of its content in the server-rendered HTML so search engines can read it.
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})
</script>

<template>
  <AccordionRoot v-model="activeItem" :collapsible="true" type="single">
    <AccordionItem
      class="overflow-hidden focus-within:relative rounded-2xl isolate AccordionItem"
      value="1"
    >
      <AccordionHeader as="div" class="flex flex-col bg-surface pb-6">
        <slot name="trigger" />
        <AccordionTrigger
          class="flex flex-col cursor-default items-center justify-between px-5 group"
        >
          <span
            v-if="activeItem === '1'"
            class="inline-flex place-items-center gap-1.5 cursor-pointer ActionLink"
          >
            {{ $t('accordion.less_info') }} <ChevronUp class="AccordionChevron w-4" />
          </span>
          <span v-else class="inline-flex place-items-center gap-1.5 cursor-pointer ActionLink">
            {{ $t('accordion.more_info') }} <ChevronDown class="AccordionChevron w-4" />
          </span>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent class="AccordionContent">
        <div class="px-5 py-4 bg-surface border-t border-line flex flex-col">
          <slot name="content" />
          <button
            class="block mx-auto cursor-pointer ActionLink"
            type="button"
            @click="activeItem = undefined"
          >
            {{ $t('accordion.less_info') }}
          </button>
        </div>
      </AccordionContent>
      <div v-if="!isHydrated" hidden>
        <slot name="content" />
      </div>
    </AccordionItem>
  </AccordionRoot>
</template>
