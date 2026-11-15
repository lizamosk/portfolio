<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import AboutMe from '@/views/AboutMe.vue'
import ExperiencePage from '@/views/ExperiencePage.vue'
import MainFooter from '@/components/MainFooter.vue'
import ContactPage from '@/views/ContactPage.vue'
import { nextTick, onMounted } from 'vue'
import EducationPage from '@/views/EducationPage.vue'
import { useReveal } from '@/composables/useReveal'
import { useSiteSeo } from '@/composables/useSiteSeo'
import { scrollToContactPageAfterLayout } from '@/util/scroll'

useSiteSeo()

const scrollToLastPage = () => {
  void nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToContactPageAfterLayout()
      })
    })
  })
}

const { observeElements } = useReveal()

onMounted(() => {
  observeElements('reveal-container')
})
</script>

<template>
  <!--   78px-->
  <NavBar @contact:click="scrollToLastPage" />
  <main id="main-container">
    <WelcomePage @contact:click="scrollToLastPage" />
    <AboutMe />
    <ExperiencePage />
    <EducationPage />
    <ContactPage>
      <MainFooter />
    </ContactPage>
  </main>
</template>
