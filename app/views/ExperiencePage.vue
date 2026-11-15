<script lang="ts" setup>
import WorkExperienceAccordion from '@/components/WorkExperienceAccordion.vue'
import PageContainer from '@/components/base/PageContainer.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WorkExperienceData } from '@/type'
import { getOptimizedImageUrl } from '@/util/url'

const { tm } = useI18n()

// Read synchronously so the whole list is part of the server-rendered HTML
const workData = computed<WorkExperienceData[]>(() =>
  (tm('work_experience.places') as unknown as WorkExperienceData[]).map((item) => ({
    ...item,
    icon: item.icon
      ? getOptimizedImageUrl(`images/logos/${item.icon.toLowerCase()}.png`)
      : undefined,
  }))
)
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
        :technologies="item.technologies"
      />
    </div>
  </PageContainer>
</template>
