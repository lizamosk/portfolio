import { createI18n } from 'vue-i18n'
import en_GB from '@/copy/en_GB.json'

export default defineNuxtPlugin((nuxtApp) => {
  // One instance per app (i.e. per request on the server)
  const i18n = createI18n({
    legacy: false,
    locale: 'en_GB',
    fallbackLocale: 'en_GB',
    globalInjection: true,
    messages: {
      en_GB,
    },
  })
  nuxtApp.vueApp.use(i18n)
  nuxtApp.vueApp.provide('locale', i18n.global.locale)
})
