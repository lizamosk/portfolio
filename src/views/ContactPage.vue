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

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^(?!\s+$)[\p{L}\s]+$/u, 'Name must contain only letters'),
  email: yup.string().required('Email is required').email('Wrong email format'),
  message: yup.string().required('Message is required'),
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
    const response = await emailjs
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
          <h2>Have some exciting projects to collaborate?</h2>
          <p class="pb-3">Message me, and I will get back to you ASAP!</p>
          <CatImage class="hidden md:block" />
        </div>
        <section class="bg-sky-blue rounded-xl p-8 pb-10">
          <form class="ContactForm flex-col flex gap-3" @submit.prevent="onSubmit">
            <div class="gap-1">
              <Input
                v-model="name"
                label="Name"
                name="name"
                placeholder="Please enter your name"
                @blur="nameBlur"
              />
              <span v-if="displayedNameError" class="error"> {{ displayedNameError }}</span>
            </div>
            <div class="gap-1">
              <Input
                v-model="email"
                label="Email"
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
                label="Your message"
                name="message"
                placeholder="Hi Liza, I would like to collaborate..."
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
              Send
            </Button>
          </form>
          <p v-if="displaySuccessMessage">{{ $t('contact.message_sent') }}</p>
        </section>
      </div>
    </PageContainer>
    <slot />
  </div>
</template>
