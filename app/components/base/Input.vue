<script lang="ts" setup>
defineProps<{
  label?: string
  placeholder?: string
  type?: string
  textarea?: boolean
  modelValue?: string
  name?: string
  invalid?: boolean
  describedby?: string
  autocomplete?: string
}>()

const emit = defineEmits(['update:modelValue', 'blur'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const onBlur = (e: Event) => {
  emit('blur', e)
}
</script>

<template>
  <label class="text-strong font-semibold">
    {{ label }}
    <textarea
      v-if="textarea"
      :name="name"
      :placeholder="placeholder"
      :rows="3"
      :value="modelValue"
      :aria-describedby="describedby"
      :aria-invalid="invalid || undefined"
      :autocomplete="autocomplete"
      class="BasicInput p-3 flex flex-col rounded-md font-normal"
      @blur="onBlur"
      @input="onInput"
    />
    <input
      v-else
      :name="name"
      :placeholder="placeholder"
      :type="type || 'text'"
      :value="modelValue"
      :aria-describedby="describedby"
      :aria-invalid="invalid || undefined"
      :autocomplete="autocomplete"
      class="BasicInput px-2 flex flex-col rounded-md font-normal"
      @blur="onBlur"
      @input="onInput"
    />
  </label>
</template>
