<script lang="ts" setup>
import PageContainer from '@/components/base/PageContainer.vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const topics = i18n.tm('about_me.personal.topics')
</script>

<template>
  <PageContainer>
    <h2 class="reveal-container">{{ $t('about_me.header') }}</h2>
    <div class="flex sm:flex-row flex-col gap-10 md:gap-20 lg:mx-20 justify-center">
      <section
        class="PersonalThings reveal-container lg:w-1/3 py-4 px-6 text-white rounded-2xl bg-dust-blue border-4 border-white"
      >
        <p class="italic text-xl mb-4">{{ $t('about_me.personal.header') }}</p>
        <div class="PersonalThings__items">
          <div v-for="topic of topics" class="flex gap-1">
            <span> {{ $rt(topic[0]) }} </span>
            <p>{{ $rt(topic[1]) }}</p>
          </div>
        </div>
      </section>
      <section class="AboutMe__content flex flex-col lg:w-2/3 text-lg">
        <div class="reveal-container">
          <h3 class="mb-4 font-bold" v-html="i18n.t('about_me.my_name')"></h3>
          <div class="AboutMe__content__domains" v-html="i18n.t('about_me.domains')" />
        </div>

        <p class="reveal-container" v-html="i18n.t('about_me.where_skilled')"></p>

        <p class="reveal-container" v-html="i18n.t('about_me.strong_side')"></p>

        <p class="reveal-container" v-html="i18n.t('about_me.education')"></p>
      </section>
    </div>
  </PageContainer>
</template>
