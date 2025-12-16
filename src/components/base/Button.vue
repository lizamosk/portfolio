<script setup lang="ts">
import { computed } from "vue";
import GlitterIcon from "@/assets/icons/glitter.svg";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (value: string) => {
      return ["primary", "default", "outlined"].includes(value);
    },
  },
  shine: {
    type: Boolean,
  },
  nativeType: {
    type: String
  }
});

const isPrimary = computed(() => props.type === "primary");
const isSecondary = computed(() => props.type === "outlined");
</script>
<template>
  <button
    :type="nativeType"
    class="inline-flex relative items-center justify-center rounded-lg px-10 max-h-fit
     py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-s border-4 border-brand-blue"
    :class="[
      isPrimary &&
        'border-transparent outline-none text-white has-background-brand-blue hover:bg-brand-blue-2 ' +
          'focus:bg-primary-dark',
      isSecondary &&
        'bg-white has-text-brand-blue hover:bg-neutral-base focus:bg-neutral-base-darker',
    ]"
  >
    <div v-if="shine" class="absolute left-4">
      <GlitterIcon />
    </div>
    <slot />
  </button>
</template>
