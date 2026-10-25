<script lang="ts" setup>
import PageContainer from '@/components/base/PageContainer.vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n({ useScope: 'global' })
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
          <div v-for="(topic, index) of topics" :key="index" class="flex gap-1">
            <span> {{ $rt(topic[0]) }} </span>
            <p>{{ $rt(topic[1]) }}</p>
          </div>
        </div>
      </section>
      <section class="AboutMe__content flex flex-col lg:w-2/3 text-lg">
        <div class="reveal-container">
          <i18n-t keypath="about_me.my_name" tag="h3" class="mb-4 font-bold">
            <template #name>
              <span class="text-purple">{{ $t('about_me.short_name') }}</span>
            </template>
          </i18n-t>
          <div class="AboutMe__content__domains">
            <i18n-t keypath="about_me.domains">
              <template #intro>
                <p>
                  <strong class="font-bold"> {{ $t('about_me.domains_intro') }} </strong>
                </p>
              </template>

              <template #break>
                <br />
              </template>

              <template #label>
                <p>{{ $t('about_me.domains_label') }}</p>
              </template>

              <template #list>
                <ul class="list-inside list-disc">
                  <li v-for="item in $tm('about_me.domains_list')" :key="item">
                    {{ $rt(item) }}
                  </li>
                </ul>
              </template>
            </i18n-t>
          </div>
        </div>

        <i18n-t class="reveal-container" tag="p" keypath="about_me.where_skilled"></i18n-t>

        <i18n-t class="reveal-container" tag="p" keypath="about_me.strong_side"></i18n-t>

        <i18n-t class="reveal-container" tag="p" keypath="about_me.education">
          <template #note>
            <span class="text-purple"> {{ $t('about_me.education_note') }} </span>
          </template>
        </i18n-t>
      </section>
    </div>
  </PageContainer>
</template>
