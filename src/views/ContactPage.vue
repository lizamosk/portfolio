<script lang="ts" setup>
import PageContainer from '@/components/base/PageContainer.vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'
import CatImage from '@/assets/icons/vector_cat.svg'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useDebouncedError } from '@/composables/useDebouncedError'
import DOMPurify from 'dompurify'
import emailjs from '@emailjs/browser'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const schema = yup.object({
  name: yup
    .string()
    .required(i18n.t('contact.error.name_required'))
    .matches(/^(?!\s+$)[\p{L}\s]+$/u, i18n.t('contact.error.name_letters')),
  email: yup
    .string()
    .required(i18n.t('contact.error.email_required'))
    .email(i18n.t('contact.error.email_wrong')),
  message: yup.string().required(i18n.t('contact.error.message_required')),
})

const { meta, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField<string>('name')

const displayedNameError = useDebouncedError(nameError)
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const displayedEmailError = useDebouncedError(emailError)
const {
  value: message,
  errorMessage: messageError,
  handleBlur: messageBlur,
} = useField<string>('message')
const displayedMessageError = useDebouncedError(messageError)
const displaySuccessMessage = ref(false)
const submitInProcess = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    submitInProcess.value = true
    const sanitizedMessage = DOMPurify.sanitize(values.message)
    await emailjs
      .send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_CONTACT_US_ID, {
        ...values,
        message: sanitizedMessage,
      })
      .then(() => (displaySuccessMessage.value = true))
      .finally(() => (submitInProcess.value = false))

    setTimeout(() => {
      resetForm()
      displaySuccessMessage.value = false
    }, 4000)
  } catch (error) {
    // TODO send alerts directly to me
    console.warn('Request to emailjs.send failed:', error as Error)
  }
})
</script>

<template>
  <div
    id="contact-page"
    class="LastPageContainer flex flex-col justify-between relative snap-start reveal-container"
  >
    <PageContainer class="pb-12 snap-none">
      <div class="grid md:grid-cols-2 md:gap-8">
        <div>
          <h2>{{ $t('contact.header') }}</h2>
          <p class="pb-3">{{ $t('contact.message_me') }}</p>
          <CatImage class="hidden md:block" />
        </div>
        <section class="bg-sky-blue rounded-xl p-8 pb-10">
          <form class="ContactForm flex-col flex gap-3" @submit.prevent="onSubmit">
            <div class="gap-1">
              <Input
                v-model="name"
                :label="i18n.t('contact.name_label')"
                name="name"
                :placeholder="i18n.t('contact.name_placeholder')"
                @blur="nameBlur"
              />
              <span v-if="displayedNameError" class="error"> {{ displayedNameError }}</span>
            </div>
            <div class="gap-1">
              <Input
                v-model="email"
                :label="i18n.t('contact.email_label')"
                name="email"
                placeholder="example@gmail.com"
                type="email"
                @blur="emailBlur"
              />
              <span v-if="displayedEmailError" class="error"> {{ displayedEmailError }}</span>
            </div>
            <div>
              <Input
                v-model="message"
                :label="i18n.t('contact.message_label')"
                name="message"
                :placeholder="i18n.t('contact.form_placeholder')"
                textarea
                @blur="messageBlur"
              />
              <span v-if="displayedMessageError" class="error"> {{ displayedMessageError }}</span>
            </div>
            <Button
              :disabled="!meta.valid || submitInProcess || displaySuccessMessage"
              :loading="submitInProcess"
              class="my-4"
              native-type="submit"
              shine
            >
              {{ $t('contact.send_message') }}
            </Button>
          </form>
          <p v-if="displaySuccessMessage">{{ $t('contact.message_sent') }}</p>
        </section>
      </div>
    </PageContainer>
    <slot />
  </div>
</template>
