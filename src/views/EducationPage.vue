<script lang="ts" setup>
import PageContainer from '@/components/base/PageContainer.vue'
import Carousel from '@/components/base/Carousel.vue'
import { useI18n } from 'vue-i18n'
import { computed, ComputedRef } from 'vue'
import { useIsTablet } from '@/composables/useIsMobile'
import EducationSlide from '@/components/EducationSlide.vue'

const i18n = useI18n()
const content: ComputedRef<Array<{ place: string; dates: string; title: string; image: string }>> =
  computed(() => i18n.tm('education.places'))

const isTablet = useIsTablet()
</script>

<template>
  <PageContainer>
    <h2 class="reveal-container">{{ $t('education.header') }}</h2>
    <Carousel
      :direction="isTablet ? 'vertical' : 'horizontal'"
      :slide-component="EducationSlide"
      :slides="content"
      class="reveal-container"
    >
    </Carousel>
  </PageContainer>
</template>
