import { onMounted, readonly, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const META_COLOR: Record<Theme, string> = { light: '#eef3f6', dark: '#1b3c53' }

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// The server cannot know the visitor's theme, so the markup is always rendered as
// 'light' and this ref is only synced with the DOM after hydration (see init()).
// Anything that must look right before that is styled off <html data-theme> in CSS.
const theme = ref<Theme>('light')

const apply = (value: Theme) => {
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[value])
}

let initialised = false

const init = () => {
  if (initialised) {
    return
  }
  initialised = true

  // The inline script in <head> (nuxt.config.ts) sets data-theme before first paint,
  // so the DOM is the source of truth.
  apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')

  // Follow the OS setting until the visitor makes an explicit choice.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!readStored()) {
      apply(event.matches ? 'dark' : 'light')
    }
  })
}

export function useTheme() {
  onMounted(init)

  const setTheme = (value: Theme) => {
    apply(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // storage unavailable (private mode): the choice simply isn't remembered
    }
  }

  const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  return { theme: readonly(theme), setTheme, toggleTheme }
}
