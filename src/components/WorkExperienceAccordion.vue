<script setup lang="ts">
import Accordion from '@/components/base/Accordion.vue'
import { WorkExperienceData } from '@/type'
import { onMounted } from 'vue'
const props = defineProps<
  WorkExperienceData & {
    icons?: string[]
  }
>()
onMounted(() => {
  console.log('image:', props.icon)
})
</script>

<template>
  <Accordion>
    <template #trigger>
      <section class="px-8 py-6 text-left font-16">
        <div class="flex gap-4">
          <img v-if="icon" :src="icon" :alt="company" class="rounded-circle max-w-16 max-h-16" />
          <div>
            <p class="mb-2 font-22">{{ company }}</p>
            <span class="font-light"> {{ timeline }} </span>
          </div>
        </div>
        <p class="font-semibold font-20 mt-4 mb-2">{{ role }}</p>
        <p>{{ technologies.join(', ') }}</p>
      </section>
    </template>
    <template #content>
      <ul class="gap-2 list-disc list-inside">
        <li v-for="point in points" :key="point.slice(20)" class="mb-4">
          {{ point }}
        </li>
      </ul>
    </template>
  </Accordion>
</template>
