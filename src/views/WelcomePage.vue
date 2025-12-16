<script setup lang="ts">
import Button from "@/components/base/Button.vue";
import ScrollDownButton from "@/components/ScrollDownButton.vue";
import PageContainer from '@/components/base/PageContainer.vue'
import { useTemplateRef } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const pageRef = useTemplateRef<HTMLElement>('page')
const isPageVisible = useElementVisibility(pageRef)
</script>

<template>
  <PageContainer>
    <div ref="page">
      <h2 class="has-text-brand-blue md:mb-12"> {{ $t('intro.greeting')}}</h2>
      <h1 class="tracking-widest mb-12">
        {{ $t('intro.header.role')}} <br />
        {{ $t('intro.header.of_your')}} <span>{{ $t('intro.header.dreams')}} </span>
      </h1>
      <div class="flex flex-col gap-6 min-w-2xs sm:w-1/2 lg:w-1/3 md:mt-12">
        <Button shine class="px-16"> {{ $t('intro.contact_me')}} </Button>
        <Button type="outlined" class="px-16"> {{ $t('intro.download_cv')}} </Button>
      </div>
    </div>
    <ScrollDownButton v-if="isPageVisible"/>
  </PageContainer>
</template>

