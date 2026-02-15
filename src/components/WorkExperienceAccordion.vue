<script lang="ts" setup>
import Accordion from '@/components/base/Accordion.vue'
import { WorkExperienceData } from '@/type'
import { onMounted, ref } from 'vue'
import { getRelativeImageUrl } from '@/util/url'
import { TechnologiesIconsMap } from '@/util/technologies'

const props = defineProps<WorkExperienceData>()

const techIconsUrls = ref<{ url: string; name: string }[]>([])
onMounted(() => {
  const urls: { url: string; name: string }[] = []
  props.technologies.forEach((tech) => {
    const path = TechnologiesIconsMap.get(tech.toLowerCase())
    const url = path ? getRelativeImageUrl(path) : undefined
    if (url) {
      urls.push({ url, name: tech })
    }
  })
  techIconsUrls.value = urls
})
</script>

<template>
  <Accordion>
    <template #trigger>
      <section class="px-8 py-6 text-left font-16">
        <div class="flex gap-4">
          <img v-if="icon" :alt="company" :src="icon" class="rounded-circle max-w-16 max-h-16" />
          <div>
            <p class="mb-2 font-22">{{ company }}</p>
            <span class="font-light"> {{ timeline }} </span>
          </div>
        </div>
        <p class="font-semibold font-20 mt-4 mb-2">{{ role }}</p>
        <p>{{ technologies.join(', ') }}</p>
        <div v-if="techIconsUrls.length > 0" class="flex gap-2 mt-3">
          <img v-for="image in techIconsUrls" :alt="image.name" :src="image.url" />
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
