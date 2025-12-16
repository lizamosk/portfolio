<script setup lang="ts">
import Accordion from '@/components/base/Accordion.vue'
import WorkExperienceAccordion from '@/components/WorkExperienceAccordion.vue'
import PageContainer from '@/components/base/PageContainer.vue'
import { inject, onMounted, Ref, ref, watch } from 'vue'
import { WorkExperienceData } from '@/type'

const workData: Ref<WorkExperienceData[]> = ref([])
const locale = inject('locale') as Required<Ref<string>>
import(`@/copy/${locale.value}.json`).then((data) => {
  data.work_experience.forEach((item: WorkExperienceData) => {
    if (item.icon) {
      const path = `../assets/images/logos/${item.icon.toLowerCase()}.png`
      item.icon = new URL(
        path,
        import.meta.url
      ).href
    }
  })
  workData.value = data.work_experience
})
</script>
<template>
  <PageContainer>
    <h2>Work experience</h2>
    <div class="flex gap-10 flex-col lg:mx-40">
      <WorkExperienceAccordion v-for="item in workData" v-bind="item" />
    </div>
  </PageContainer>
</template>
