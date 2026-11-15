import svgLoader from 'vite-svg-loader'

// Public origin of the deployed site (no trailing slash). Needed for absolute URLs in
// canonical / Open Graph tags, robots.txt and sitemap.xml.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')

// Runs in <head> before first paint so the right theme is there without a flash.
// Keep in sync with app/composables/useTheme.ts
const themeInitScript = `(function () {
  var theme = 'light'
  try {
    var stored = localStorage.getItem('theme')
    theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme)
  var setMeta = function () {
    var meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1b3c53' : '#eef3f6')
    return !!meta
  }
  if (!setMeta()) document.addEventListener('DOMContentLoaded', setMeta)
})()`

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  ssr: true,
  devtools: { enabled: false },

  css: ['~/styles/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      siteUrl,
      // Same variable names as before the Nuxt migration, so existing .env files and
      // hosting settings keep working. These are public (browser-side) EmailJS identifiers.
      emailjs: {
        publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || '',
        serviceId: process.env.VITE_EMAILJS_SERVICE_ID || '',
        contactTemplateId: process.env.VITE_EMAILJS_CONTACT_US_ID || '',
      },
    },
  },

  app: {
    rootAttrs: { id: 'app' },
    head: {
      htmlAttrs: { lang: 'en-GB' },
      viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#eef3f6' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      script: [{ key: 'theme-init', innerHTML: themeInitScript, tagPosition: 'head' }],
    },
  },

  // The whole site is one page: render it on the server at build time so it is served
  // as ready HTML from the CDN. Remove the rule to render on every request instead.
  routeRules: {
    '/': { prerender: true },
  },

  nitro: {
    prerender: {
      // without a known public origin the sitemap would contain a wrong URL
      routes: ['/', '/robots.txt', ...(siteUrl ? ['/sitemap.xml'] : [])],
    },
  },

  hooks: {
    // Nuxt adds <link rel="prefetch"> for every asset the entry chunk references. Here that
    // is every image on the site plus the hero video and the full-size certificate scans,
    // which would compete with what the page actually shows. The page's own <img>/<video>
    // tags (and the poster preload in WelcomePage.vue) already request what is needed.
    'build:manifest': (manifest) => {
      for (const item of Object.values(manifest)) {
        item.assets = []
      }
    },
  },

  // vue-i18n ships a bundler build that expects these compile-time flags; bundling it
  // (instead of loading it from node_modules at runtime) lets them apply on the server too.
  build: {
    transpile: ['vue-i18n', '@intlify/core-base', '@intlify/shared', '@intlify/message-compiler'],
  },

  vite: {
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      // messages are plain JSON compiled in the browser/server at runtime
      __INTLIFY_DROP_MESSAGE_COMPILER__: false,
      __INTLIFY_JIT_COMPILATION__: true,
    },
    optimizeDeps: {
      include: [
        '@emailjs/browser',
        '@vueuse/core',
        'animejs',
        'dompurify',
        'radix-vue',
        'vee-validate',
        'vue-easy-lightbox',
        'yup',
      ],
    },
    plugins: [
      // SVGs imported as modules become Vue components (`?url` still gives a URL)
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // keep paths separate: the hero pencil circle and the glitter icon animate per path
                  mergePaths: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },
})
