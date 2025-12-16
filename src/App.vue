<script setup>
import "./styles/main.css";
import NavBar from "@/components/NavBar.vue";
import WelcomePage from "@/views/WelcomePage.vue";
import AboutMe from "@/views/AboutMe.vue";
import ExperiencePage from '@/views/ExperiencePage.vue'
import EducationPage from '@/views/EducationPage.vue'
import MainFooter from '@/components/MainFooter.vue'
import ContactPage from '@/views/ContactPage.vue'
</script>

<template>
  <!--   96px-->
  <NavBar />
  <main id="main-container" class="snap-y mt-[78px]">
    <WelcomePage />
    <AboutMe />
    <ExperiencePage />
    <EducationPage />
    <ContactPage />
    <MainFooter />
  </main>
</template>
