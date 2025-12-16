<script setup lang="ts">
import PageContainer from '@/components/base/PageContainer.vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import CatImage from '@/assets/icons/vector_cat.svg'
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
  <PageContainer>
    <div class="grid md:grid-cols-2 md:gap-8">
      <div class="">
        <h2>Have some exciting projects to collaborate?</h2>
        <p>Message me, and I will get back to you ASAP!</p>
        <CatImage class="hidden md:block"/>
      </div>
      <section class="bg-sky-blue rounded-xl p-6 pb-10">
        <form class="ContactForm flex-col flex gap-3">
          <Input placeholder="Please enter your name" label="Name" />
          <Input type="email" placeholder="example@gmail.com" label="Email" />
          <Input textarea placeholder="Hi Liza, I would like to collaborate..." label="Your message" />
          <Button shine native-type="submit" class="my-4"> Send </Button>
        </form>
      </section>
    </div>
    <MainFooter />
  </PageContainer>
</template>
