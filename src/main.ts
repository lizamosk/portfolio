import { createApp } from "vue";
import App from "./App.vue";
import { setupLocale } from '@/i18n'

const app = createApp(App)
const i18n = setupLocale('en_GB')
app.use(i18n)
app.provide('locale', i18n.global.locale)
app.mount("#app");
