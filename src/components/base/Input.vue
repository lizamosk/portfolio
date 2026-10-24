<script lang="ts" setup>
defineProps<{
  label?: string
  placeholder?: string
  type?: string
  textarea?: boolean,
  modelValue?: string,
  name?: string
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
  <label>
    {{ label }}
    <textarea
      v-if="textarea"
      :name="name"
      :placeholder="placeholder"
      :rows="3"
      :value="modelValue"
      class="BasicInput p-3 flex flex-col rounded-md"
      @blur="onBlur"
      @input="onInput"
    />
    <input
      v-else
      :name="name"
      :placeholder="placeholder"
      :type="type || 'text'"
      :value="modelValue"
      class="BasicInput px-2 flex flex-col rounded-md"
      @blur="onBlur"
      @input="onInput"
    />
  </label>
</template>
