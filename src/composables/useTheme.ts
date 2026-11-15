import { readonly, ref } from 'vue'

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

// index.html sets data-theme before first paint, so the DOM is the source of truth.
const initial: Theme =
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
const theme = ref<Theme>(initial)

const apply = (value: Theme) => {
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[value])
}

// Follow the OS setting until the visitor makes an explicit choice.
const media = window.matchMedia('(prefers-color-scheme: dark)')
media.addEventListener('change', (event) => {
  if (!readStored()) {
    apply(event.matches ? 'dark' : 'light')
  }
})

export function useTheme() {
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
