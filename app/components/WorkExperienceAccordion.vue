<script lang="ts" setup>
import Accordion from '@/components/base/Accordion.vue'
import type { WorkExperienceData } from '@/type'
import { computed } from 'vue'
import { getRelativeImageUrl } from '@/util/url'
import { TechnologiesIconsMap } from '@/util/technologies'

const props = defineProps<WorkExperienceData>()

const techIconsUrls = computed(() => {
  const urls: { url: string; name: string }[] = []
  props.technologies.forEach((tech) => {
    const path = TechnologiesIconsMap.get(tech.toLowerCase())
    const url = path ? getRelativeImageUrl(path) : undefined
    if (url) {
      urls.push({ url, name: tech })
    }
  })
  return urls
})
</script>

<template>
  <Accordion>
    <template #trigger>
      <section class="px-8 py-6 text-left font-16">
        <div class="flex gap-4">
          <img
            v-if="icon"
            :alt="company"
            :src="icon"
            class="rounded-circle max-w-16 max-h-16"
            height="64"
            width="64"
          />
          <div>
            <p class="mb-2 font-22 font-semibold text-strong">{{ company }}</p>
            <span class="text-muted"> {{ timeline }} </span>
          </div>
        </div>
        <p class="font-semibold font-20 mt-4 mb-2 text-strong">{{ role }}</p>
        <p>{{ technologies.join(', ') }}</p>
        <div v-if="techIconsUrls.length > 0" class="flex gap-2 mt-3">
          <span
            v-for="image in techIconsUrls"
            :key="image.name"
            class="flex items-center justify-center rounded-lg border border-line bg-chip p-1"
          >
            <img :alt="image.name" :src="image.url" />
          </span>
        </div>
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
