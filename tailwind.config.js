// tailwind.config.js
/** @type {import('tailwindcss').Config} */ // Это хорошая практика для автодополнения
module.exports = {
  darkMode: true,
  plugins: [], // or 'media' or 'class'
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: 'var(--purple)',
        },
        'neutral-base': {
          DEFAULT: 'var(--neutral-base)',
        },
        'neutral-base-darker': {
          DEFAULT: 'var(--neutral-base-darker)',
        },
        'neutral-grey': {
          DEFAULT: 'var(--neutral-grey)',
        },
        'brand-blue': {
          DEFAULT: 'var(--brand-blue)',
        },
        'brand-blue-2': {
          DEFAULT: 'var(--brand-blue-2)',
        },
        'dust-blue': {
          DEFAULT: 'var(--dust-blue)',
        },
        'primary-dark': {
          DEFAULT: 'var(--primary-dark)',
        },
        'sky-blue': {
          DEFAULT: 'var(--sky-blue)',
        },
        'error-red': {
          DEFAULT: 'var(--error-red)',
        },
        'error-dark': {
          DEFAULT: 'var(--error-dark)',
        },
      },
      fontSize: {
        'text-32': '32px',
        'text-22': '22px'
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
}
