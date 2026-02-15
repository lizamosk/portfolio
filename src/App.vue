<script lang="ts" setup>
import './styles/main.css'
import NavBar from '@/components/NavBar.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import AboutMe from '@/views/AboutMe.vue'
import ExperiencePage from '@/views/ExperiencePage.vue'
import MainFooter from '@/components/MainFooter.vue'
import ContactPage from '@/views/ContactPage.vue'
import { scrollToPage } from '@/util/scroll.ts'
import { onMounted, useTemplateRef } from 'vue'
import EducationPage from '@/views/EducationPage.vue'
import { useReveal } from '@/composables/useReveal'

const lastPage = useTemplateRef<HTMLElement | null>('lastPage')

const scrollToLastPage = () => {
  const el = lastPage.value?.$el
  if (el) {
    scrollToPage(el)
  }
}

const { observeElements } = useReveal()

onMounted(() => {
  observeElements('reveal-container')
})
</script>

<template>
  <!--   96px-->
  <NavBar @contact:click="scrollToLastPage" />
  <main id="main-container" class="mt-[78px]">
    <WelcomePage @contact:click="scrollToLastPage" />
    <AboutMe />
    <ExperiencePage />
    <EducationPage />
    <ContactPage ref="lastPage">
      <MainFooter />
    </ContactPage>
  </main>
</template>
