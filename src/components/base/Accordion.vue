<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'
import { ref } from 'vue'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import ChevronUp from '@/assets/icons/chevron-up.svg'
const activeItem = ref()
</script>

<template>
  <AccordionRoot
    v-model="activeItem"
    class="shadow-[0_2px_10px] shadow-black/5"
    type="single"
    :collapsible="true"
  >
    <AccordionItem value="1" class="overflow-hidden focus-within:relative">
      <AccordionHeader as="div" class="flex flex-col bg-neutral-base"
      :class="activeItem ? 'rounded-t-2xl' : 'rounded-2xl'">
        <slot name="trigger" />
        <AccordionTrigger
          class="flex flex-col cursor-default items-center justify-between px-5 outline-none group"
        >
          <span v-if="activeItem" class="inline-flex place-items-center gap-1.5 cursor-pointer" > Less info <ChevronUp class="AccordionChevron" /> </span>
          <span v-else class="inline-flex place-items-center gap-1.5 cursor-pointer" > More info <ChevronDown class="AccordionChevron" /> </span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        class="AccordionContent
         data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
      >
        <div class="px-5 py-4 bg-white flex flex-col">
          <slot name="content" />
          <a class="block mx-auto underline" @click="activeItem = undefined"> Less info </a>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
