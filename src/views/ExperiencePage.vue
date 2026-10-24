<script lang="ts" setup>
import WorkExperienceAccordion from '@/components/WorkExperienceAccordion.vue'
import PageContainer from '@/components/base/PageContainer.vue'
import { inject, nextTick, onMounted, ref, Ref } from 'vue'
import { WorkExperienceData } from '@/type'
import { getRelativeImageUrl } from '@/util/url'
import { useReveal } from '@/composables/useReveal'

const workData: Ref<WorkExperienceData[]> = ref([])
const locale = inject('locale') as Required<Ref<string>>
const { observeElements } = useReveal()

onMounted(() => {
  import(`@/copy/${locale.value}.json`).then(async (data) => {
    data.work_experience.places.forEach((item: WorkExperienceData) => {
      if (item.icon) {
        const path = getRelativeImageUrl(`images/logos/${item.icon.toLowerCase()}.png`)!
        item.icon = new URL(path, import.meta.url).href
      }
    })
    workData.value = data.work_experience.places
    await nextTick()
    observeElements('reveal-container')
  })
})
</script>
<template>
  <PageContainer>
    <h2 class="reveal-container">{{ $t('work_experience.header') }}</h2>
    <div class="flex gap-10 flex-col lg:mx-40">
      <WorkExperienceAccordion
        v-for="(item, index) in workData"
        :key="index"
        class="reveal-container"
        :company="item.company"
        :timeline="item.timeline"
        :role="item.role"
        :description="item.description"
        :icon="item.icon"
        :points="item.points"
        :technologies="item.technologies" />
    </div>
  </PageContainer>
</template>
