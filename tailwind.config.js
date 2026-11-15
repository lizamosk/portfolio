// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [],
  content: ['./app/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // All colours are semantic tokens defined in app/styles/vars/color.css
      // and swap automatically with the theme.
      colors: {
        page: 'var(--bg)',
        surface: 'var(--surface)',
        tint: 'var(--tint)',
        field: 'var(--field-bg)',
        feature: 'var(--feature)',
        'on-feature': 'var(--on-feature)',
        'site-footer': 'var(--footer)',
        'on-footer': 'var(--on-footer)',
        strong: 'var(--text-strong)',
        body: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-solid': 'var(--accent-solid)',
        'accent-solid-hover': 'var(--accent-solid-hover)',
        'accent-solid-active': 'var(--accent-solid-active)',
        'on-accent': 'var(--on-accent)',
        highlight: 'var(--highlight)',
        line: 'var(--border)',
        'ui-line': 'var(--ui-border)',
        focus: 'var(--focus)',
        danger: 'var(--error)',
        chip: 'var(--chip)',
      },
      fontSize: {
        'text-32': '32px',
        'text-22': '22px',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        // Bricolage Grotesque has no Cyrillic glyphs; Onest covers them for the Russian locale.
        display: [
          'Bricolage Grotesque Variable',
          'Onest Variable',
          'Nunito Sans',
          'sans-serif',
        ],
      },
    },
  },
}
