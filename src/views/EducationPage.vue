<script setup lang="ts">
import PageContainer from '@/components/base/PageContainer.vue'
import Carousel from '@/components/base/Carousel.vue'
import { useI18n } from 'vue-i18n'
import { computed, ComputedRef } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import EducationSlide from '@/components/EducationSlide.vue'
import MainFooter from '@/components/MainFooter.vue'
const i18n = useI18n()
console.log(i18n.tm('education'))
const content: ComputedRef<Array<{ place: string; dates: string; title: string; image: string }>> =
  computed(() => i18n.tm('education'))

const isMobile = useIsMobile()
</script>

<template>
  <PageContainer>
    <h2>Education</h2>
    <Carousel
      :direction="isMobile ? 'vertical' : 'horizontal'"
      :slides="content"
      :slide-component="EducationSlide"
    >
    </Carousel>
  </PageContainer>
</template>
