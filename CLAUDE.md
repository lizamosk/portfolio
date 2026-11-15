# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Nuxt dev server with HMR (http://localhost:3000)
- `npm run build` — production build (SSR + prerender) to `.output/`
- `npm run preview` — build, then serve the build locally
- `npm run generate` — fully static build (no server), if ever needed

- `npm run lint` / `npm run lint:fix` — ESLint (flat config in `eslint.config.js`: `@eslint/js` + `eslint-plugin-vue` recommended + `@vue/eslint-config-typescript`, with `eslint-config-prettier` last to disable formatting rules)
- `npm run format` — Prettier over `app/` and `server/`

Node >= 22.22 (`.nvmrc`: 22; required by Nuxt 4.6). There is no test runner. A husky pre-commit hook (`.husky/pre-commit`) runs `lint-staged`, which lints staged `*.{js,ts,vue}` files with ESLint. Format with Prettier (`.prettierrc`: no semicolons, single quotes, 2-space indent, `trailingComma: es5`, `printWidth: 100`).

## Architecture

Single-page personal portfolio built with Nuxt 4 (Vue 3 `<script setup lang="ts">`, Vite, Nitro) + Tailwind 3. Source lives in `app/` (Nuxt 4 `srcDir`); server routes in `server/`. There is no `pages/` directory and therefore no router: `app/app.vue` stacks the section views from `app/views/` (Welcome → About → Experience → Education → Contact) inside `<main>`, with `NavBar` on top. Each section wraps its content in `components/base/PageContainer.vue`, which renders a `section.Page` — the `.Page` class is what `util/scroll.ts` uses to find sections for "scroll to next page". Components, composables and utils are imported explicitly (`@/…`), not relied on via Nuxt auto-import (note the folder is `util/`, which Nuxt does not scan).

**Rendering (SSR).** `ssr: true`, and `routeRules` prerenders `/` at build time, so the page is server-rendered once per build and served as static HTML (`robots.txt` and `sitemap.xml` are prerendered too). Everything in the page must therefore render on the server and hydrate without mismatches:

- No `window` / `document` / `localStorage` at module top level or in `setup` — use `onMounted`, `import.meta.client`, or a `*.client.ts` plugin.
- Anything the server cannot know (theme, viewport width) must render a fixed default and switch only after mount: `useTheme` starts as `'light'` and syncs in `onMounted`; `useIsMobile`/`useIsTablet` return `false` until mounted. Visuals that must be right before hydration are driven by CSS off `<html data-theme>` (see `ThemeSwitch.vue`).
- Data shown on the page is read synchronously (`useI18n().tm(...)`), never fetched in `onMounted`, so it is part of the HTML.
- Browser-only widgets go inside `<ClientOnly>` (the certificate lightbox).
- Check the browser console in `npm run dev` for "Hydration … mismatch" warnings after touching templates — in production Vue does **not** repair them.

**Plugins** (`app/plugins/`): `i18n.ts` (vue-i18n instance + `provide('locale')`), `scroll.client.ts` (`initScrollToTopOnHardLoad`), `emailjs.client.ts`, `lightbox.client.ts`.

**SEO.** `composables/useSiteSeo.ts` (called from `app.vue`) sets title/description, Open Graph + Twitter tags, the canonical link and JSON-LD (`ProfilePage` → `Person`); its texts are under `seo` in the copy JSON. Static head tags (lang, icons, theme-color, the theme init script) are in `nuxt.config.ts` → `app.head`. Absolute URLs (canonical, `og:url`, `og:image`, sitemap) need `NUXT_PUBLIC_SITE_URL`; without it they are omitted. `public/og-image.png` is the 1200×630 social preview. `server/routes/robots.txt.ts` and `sitemap.xml.ts` generate those files. `base/Accordion.vue` keeps a `hidden` copy of each closed panel's content in the server HTML (removed on mount) so the work-experience bullet points are crawlable.

**Content / i18n.** All user-facing text and most structured data (work experience entries, education, personal facts) live in `app/copy/en_GB.json`, loaded via `vue-i18n` (composition mode, `globalInjection`, so templates use `$t`). Views that need arrays of objects read them with `tm()` (e.g. `ExperiencePage.vue`, `EducationPage.vue`). Add/edit content in the JSON, not in components. `vue-i18n` is listed in `build.transpile` with its feature flags in `vite.define` — it must be bundled for SSR, do not remove these.

**Assets.** Images referenced by name from the JSON (e.g. company logos) are resolved through `util/url.ts#getRelativeImageUrl`, which eager-globs everything under `app/assets/` — pass a path relative to `app/assets/`. `getOptimizedImageUrl` returns the `.webp` file with the same name in the same folder when one exists (logos are 128px, certificates max 1400×1000) and falls back to the original; the lightbox always uses the original. When adding a logo or certificate, add a `.webp` sibling too. Images are deliberately **not** lazy-loaded and the hero video has a poster (`assets/video/welcome-poster.webp`, preloaded with high priority) so media is visible at once. The `build:manifest` hook in `nuxt.config.ts` strips Nuxt's automatic `<link rel="prefetch">` for assets (it would otherwise prefetch the 18 MB video and every full-size scan). SVGs imported directly as modules become Vue components via `vite-svg-loader` (`mergePaths` disabled to keep paths intact). Technology badge icons map through `util/technologies.ts`. Static files served as-is (CV PDF, favicons, `og-image.png`) are in `public/`; the CV path constant is in `app/contants.ts` (filename is misspelled — import it as `@/contants`).

**Animations.** Reveal-on-scroll uses `composables/useReveal.ts` (IntersectionObserver + anime.js). Elements with class `reveal-container` are visible by default (server HTML, no-JS, crawlers); on mount `observeElements` adds `reveal-pending` (hidden) only to those still below the fold and animates them in when scrolled to. The hero has no reveal so it paints immediately. `observeElements('reveal-container')` is idempotent — call it again after rendering new elements.

**Scrolling.** `util/scroll.ts` contains deliberate iOS Safari workarounds (manual `scrollRestoration`, repeated scroll-to-top on load, `window.scrollTo` instead of `scrollIntoView`, double `requestAnimationFrame` + delayed re-check when scrolling to `#contact-page`). Nav height offset (~78px) is assumed in several places. Preserve these behaviors when touching scroll code.

**Contact form.** `views/ContactPage.vue` uses vee-validate + yup (error messages from i18n), sanitizes the message with DOMPurify, and sends via EmailJS. EmailJS is initialized in `plugins/emailjs.client.ts`; credentials come from `.env` (`VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_US_ID` — names kept from the Vite era) and reach the app through `runtimeConfig.public.emailjs`, read with `useRuntimeConfig()`; `import.meta.env.VITE_*` is not used.

**Styling & theming.** Global CSS is in `app/styles/` (loaded once via `css` in `nuxt.config.ts`; the app root element keeps the id `app` through `app.rootAttrs`). Colours are *semantic tokens* in `styles/vars/color.css` (`--bg`, `--surface`, `--text-strong`, `--accent`, …) with a light set on `:root` and a dark set on `:root[data-theme='dark']`; they are exposed to Tailwind as `bg-page`, `bg-surface`, `text-strong`, `text-accent`, `bg-accent-solid`, `border-line`, etc. (see `tailwind.config.js`). Never use raw hex or Tailwind's default palette in components, and keep every text pair ≥ 4.5:1 (UI boundaries/focus ≥ 3:1) in **both** themes. The theme is set before first paint by an inline script in `nuxt.config.ts` (`app.head.script`) and toggled by `composables/useTheme.ts` / `components/ThemeSwitch.vue` (stored in `localStorage` as `theme`, defaults to the OS preference). SVG icons must use `currentColor` or the `--logo-*` / `--footer` vars so they follow the theme. Headings use Bricolage Grotesque (`font-display`) with Onest as the Cyrillic fallback, since Bricolage has no Cyrillic glyphs; body text is Nunito Sans. Path alias `@` → `app/`.

**Accessibility conventions.** Interactive elements are real `<button>`/`<a href>`; a global `:focus-visible` ring lives in `main.css`; `prefers-reduced-motion` disables reveal/bounce/loop animations and keeps the hero video paused. Screen-reader-only strings (aria-labels) live under `a11y` in the copy JSON.
