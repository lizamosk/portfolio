<script setup lang="ts">
import PageContainer from '@/components/base/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <h2>About me</h2>
    <div class="flex sm:flex-row flex-col gap-10 md:gap-20">
      <section class="PersonalThings py-4 px-6 text-white rounded-2xl bg-dust-blue border-4 border-white">
        <p class="italic text-xl mb-4">Something personal...</p>
        <div class="PersonalThings__items">
          <p> <span> &#128205 </span> Valencia, Spain </p>
          <p> <span> &#128187 </span> Commercial experience since 2020 </p>
          <p> <span> &#128105;&#127995;&#8205;&#127891;</span> Diploma in Software Engineering & UI/UX </p>
          <p> <span> &#128218 </span> Book worm (absolute Murakami and Dostoevsky fan!) </p>
          <p> <span> &#127912; </span> Love art, paint and crocheting </p>
          <p> <span> &#129367; </span> Addicted to healthy lifestyle. Gym, cycling, no-sugar meals is something that I truly love! </p>
        </div>
      </section>
      <section class="AboutMe__content flex flex-col">
        <h3 class="mb-4 font-bold">My name is E<span class="text-purple">liza</span>veta Moskalenko.</h3>
        <p>
          <strong> Frontend Engineer </strong> with 4+ years of hands-on
          experience delivering robust and scalable web applications tailored to
          real-world user & business needs.
        </p>
        <p>I’ve worked across different domains such as:</p>
        <ul class="list-inside">
          <li>Healthcare</li>
          <li>Cartography & maps</li>
          <li>Education</li>
        </ul>

        <p>
          I’m skilled in modern JavaScript frameworks & libraries (Vue 3, React)
          and micro-frontend architecture, with a focus on page performance and
          clean code.
        </p>

        <p>
          Strong cross-functional collaborator, comfortable working across
          product, design, and engineering to drive impactful solutions.
        </p>

        <p>
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
