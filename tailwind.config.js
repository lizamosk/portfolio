// tailwind.config.js
/** @type {import('tailwindcss').Config} */ // Это хорошая практика для автодополнения
module.exports = {
    darkMode: true,
    plugins: [], // or 'media' or 'class'
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'purple': {
                    DEFAULT: 'var(--purple)'
                },
                'neutral-base': {
                    DEFAULT: 'var(--neutral-base)'
                },
                'neutral-base-darker': {
                    DEFAULT: 'var(--neutral-base-darker)'
                },
                'brand-blue': {
                    DEFAULT: 'var(--brand-blue)'
                },
                'brand-blue-2': {
                    DEFAULT: 'var(--brand-blue-2)'
                },
                'dust-blue': {
                    DEFAULT: 'var(--dust-blue)'
                },
                'primary-dark': {
                    DEFAULT: 'var(--primary-dark)'
                },
                'sky-blue': {
                    DEFAULT: 'var(--sky-blue)'
                }
            },
            fontSize: {
              "text-32": "32px"
            },
            fontFamily: {
                sans: ['Nunito Sans', 'sans-serif']
            }
        },
    }
}
