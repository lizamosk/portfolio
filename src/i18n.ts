import { createI18n } from 'vue-i18n'
import en_GB from './copy/en_GB.json'

export const setupLocale = (locale: string) => {
  return createI18n({
    locale,
    compositionOnly: true,
    fallbackLocale: 'en_GB',
    globalInjection: true,
    messages: {
      en_GB,
    },
  })
}
