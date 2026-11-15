import VueEasyLightbox from 'vue-easy-lightbox'

// Browser-only: the lightbox is rendered inside <ClientOnly>
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueEasyLightbox)
})
