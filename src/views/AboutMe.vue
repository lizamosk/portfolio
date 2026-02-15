<script lang="ts" setup>
import PageContainer from '@/components/base/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <h2 class="reveal-container">{{ $t('about_me.header')}}</h2>
    <div class="flex sm:flex-row flex-col gap-10 md:gap-20 lg:mx-32 justify-center">
      <section class="PersonalThings reveal-container lg:w-1/3 py-4 px-6 text-white rounded-2xl bg-dust-blue border-4 border-white">
        <p class="italic text-xl mb-4"> {{ $t('about_me.personal.header') }}</p>
        <div class="PersonalThings__items">
          <p> <span> &#128205 </span> {{ $t('about_me.personal.topics[0]') }} </p>
          <p> <span> &#128187 </span> {{ $t('about_me.personal.topics[1]') }} </p>
          <p> <span> &#128105;&#127995;&#8205;&#127891;</span> {{ $t('about_me.personal.topics[2]') }} </p>
          <p> <span> &#128218 </span> {{ $t('about_me.personal.topics[3]') }} </p>
          <p> <span> &#127912; </span> {{ $t('about_me.personal.topics[4]') }} </p>
          <p> <span> &#129367; </span> {{ $t('about_me.personal.topics[5]') }}</p>
        </div>
      </section>
      <section class="AboutMe__content flex flex-col lg:w-2/3 text-lg">
        <div class="reveal-container">
        <h3 class="mb-4 font-bold">My name is E<span class="text-purple">liza</span>veta Moskalenko.</h3>
        <p>
          <strong> Frontend Engineer </strong> with 4+ years of hands-on
          experience delivering robust and scalable web applications tailored to
          real-world user & business needs.
        </p>
          <br/>
        <p>I’ve worked across different domains such as:</p>
        <ul class="list-inside">
          <li>Healthcare</li>
          <li>Cartography & maps</li>
          <li>Education</li>
        </ul>
        </div>

        <p class="reveal-container">
          I’m skilled in modern JavaScript frameworks & libraries (Vue 3, React)
          and micro-frontend architecture, with a focus on page performance and
          clean code.
        </p>

        <p class="reveal-container">
          Strong cross-functional collaborator, comfortable working across
          product, design, and engineering to drive impactful solutions.
        </p>

        <p class="reveal-container">
          I have a Bachelor's degree in Software engineering, certification in
          UI & UX design <span class="text-purple"> (currently continue to learn it) </span> and
          some teaching background: led practical classes on Object-Oriented
          Programming at the university level and private IT lessons for
          schoolchildren.
        </p>
      </section>
    </div>
  </PageContainer>
</template>
