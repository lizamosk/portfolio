<script setup lang="ts">
const props = defineProps<{
  label?: string;
  placeholder?: string
  type?: string
  textarea?: boolean
}>()
</script>

<template>
  <label>
    {{ label }}
    <textarea v-if="textarea" class="p-3 flex flex-col rounded-md" :placeholder="placeholder" />
    <input v-else :type="type || 'text'" class="BasicInput px-2 flex flex-col rounded-md" :placeholder="placeholder" />
  </label>
</template>

