import { createApp } from 'vue'
import App from './App.vue'
import { setupLocale } from '@/i18n'
import VueEasyLightbox from 'vue-easy-lightbox'
import emailjs from '@emailjs/browser'
import { initScrollToTopOnHardLoad } from '@/util/scroll'

initScrollToTopOnHardLoad()

const app = createApp(App)
const i18n = setupLocale('en_GB')
app.use(i18n)
app.provide('locale', i18n.global.locale)
app.use(VueEasyLightbox)
app.mount('#app')
emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY, blockHeadless: true })
