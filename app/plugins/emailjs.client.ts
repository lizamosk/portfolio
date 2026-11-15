import emailjs from '@emailjs/browser'

export default defineNuxtPlugin(() => {
  const { emailjs: config } = useRuntimeConfig().public
  emailjs.init({ publicKey: config.publicKey, blockHeadless: true })
})
