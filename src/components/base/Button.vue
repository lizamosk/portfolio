<script lang="ts" setup>
import { computed, type ButtonHTMLAttributes, type PropType } from 'vue'
import GlitterIcon from '@/assets/icons/glitter.svg'
import LoadingSpinnerIcon from '@/assets/icons/loading-spinner.svg'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => {
      return ['primary', 'default', 'outlined'].includes(value)
    },
  },
  shine: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  nativeType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
  },
})

const isPrimary = computed(() => props.type === 'primary')
const isSecondary = computed(() => props.type === 'outlined')
</script>
<template>
  <button
    :class="[
      isPrimary &&
        'bg-accent-solid border-accent-solid text-on-accent hover:bg-accent-solid-hover ' +
          'hover:border-accent-solid-hover active:bg-accent-solid-active active:border-accent-solid-active',
      isSecondary &&
        'bg-transparent border-accent text-accent hover:bg-tint hover:border-accent-hover ' +
          'hover:text-accent-hover active:bg-tint',
    ]"
    :disabled="disabled || loading"
    :type="nativeType"
    class="inline-flex relative items-center justify-center rounded-[10px] px-10 min-h-11 max-h-fit py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-2 transition-colors duration-200"
  >
    <div v-if="shine" class="absolute left-4">
      <GlitterIcon class="svg--shine" />
    </div>
    <div v-if="loading"><LoadingSpinnerIcon /></div>
    <slot v-else />
  </button>
</template>
