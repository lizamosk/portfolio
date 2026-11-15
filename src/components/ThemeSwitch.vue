<script lang="ts" setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <button
    :aria-checked="isDark"
    :aria-label="$t('a11y.theme_switch')"
    class="ThemeSwitch"
    role="switch"
    type="button"
    @click="toggleTheme"
  >
    <svg
      aria-hidden="true"
      class="ThemeSwitch__hint ThemeSwitch__hint--left"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
    <svg
      aria-hidden="true"
      class="ThemeSwitch__hint ThemeSwitch__hint--right"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
    <span class="ThemeSwitch__thumb">
      <svg
        v-if="!isDark"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.ThemeSwitch {
  position: relative;
  flex: none;
  width: 64px;
  height: 34px;
  padding: 0;
  cursor: pointer;
  background: var(--field-bg);
  border: 2px solid var(--ui-border);
  border-radius: 999px;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

/* 44px-tall hit area while the visual track stays 34px (WCAG 2.2 target size) */
.ThemeSwitch::after {
  content: '';
  position: absolute;
  inset: -6px -4px;
}

.ThemeSwitch:hover {
  border-color: var(--accent);
}

.ThemeSwitch__hint {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  color: var(--muted);
  translate: 0 -50%;
}

.ThemeSwitch__hint--left {
  left: 8px;
}

.ThemeSwitch__hint--right {
  right: 8px;
}

.ThemeSwitch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  color: var(--on-accent);
  background: var(--accent-solid);
  border-radius: 50%;
  transition:
    translate 0.22s cubic-bezier(0.3, 0.9, 0.4, 1),
    background-color 0.2s ease;
}

.ThemeSwitch__thumb svg {
  width: 16px;
  height: 16px;
}

.ThemeSwitch[aria-checked='true'] .ThemeSwitch__thumb {
  translate: 30px 0;
}
</style>
