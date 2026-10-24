# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — build, then serve the build locally

- `npm run lint` / `npm run lint:fix` — ESLint (flat config in `eslint.config.js`: `@eslint/js` + `eslint-plugin-vue` recommended + `@vue/eslint-config-typescript`, with `eslint-config-prettier` last to disable formatting rules)
- `npm run format` — Prettier over `src/`

Node >= 20 (`.nvmrc`: 20). There is no test runner. A husky pre-commit hook (`.husky/pre-commit`) runs `lint-staged`, which lints staged `*.{js,ts,vue}` files with ESLint. Format with Prettier (`.prettierrc`: no semicolons, single quotes, 2-space indent, `trailingComma: es5`, `printWidth: 100`).

## Architecture

Single-page personal portfolio built with Vue 3 (`<script setup lang="ts">`) + Vite + Tailwind 3. There is no router: `src/App.vue` stacks the section views from `src/views/` (Welcome → About → Experience → Education → Contact) inside `<main>`, with `NavBar` on top. Each section wraps its content in `components/base/PageContainer.vue`, which renders a `section.Page` — the `.Page` class is what `util/scroll.ts` uses to find sections for "scroll to next page".

**Content / i18n.** All user-facing text and most structured data (work experience entries, education, personal facts) live in `src/copy/en_GB.json`, loaded via `vue-i18n` (composition mode, `globalInjection`, so templates use `$t`). `main.ts` `provide`s the current locale as `'locale'`; some views (e.g. `ExperiencePage.vue`) `inject` it and dynamically `import(\`@/copy/${locale}.json\`)` to read arrays of objects directly rather than through `$t`. Add/edit content in the JSON, not in components. The `@intlify/unplugin-vue-i18n` plugin in `vite.config.js` points at `src/locales/**`, which does not exist — locale files are actually in `src/copy/`.

**Assets.** Images referenced by name from the JSON (e.g. company logos) are resolved through `util/url.ts#getRelativeImageUrl`, which eager-globs everything under `src/assets/` — pass a path relative to `src/assets/`. SVGs imported directly as modules become Vue components via `vite-svg-loader` (`mergePaths` disabled to keep paths intact). Technology badge icons map through `util/technologies.ts`. Static files served as-is (CV PDF, favicons) are in `public/`; the CV path constant is in `src/contants.ts` (filename is misspelled — import it as `@/contants`).

**Animations.** Reveal-on-scroll uses `composables/useReveal.ts` (IntersectionObserver + anime.js): elements with class `reveal-container` animate in. Views that render content asynchronously must call `observeElements('reveal-container')` again after `nextTick`, since `App.vue` only observes what exists on mount.

**Scrolling.** `util/scroll.ts` contains deliberate iOS Safari workarounds (manual `scrollRestoration`, repeated scroll-to-top on load, `window.scrollTo` instead of `scrollIntoView`, double `requestAnimationFrame` + delayed re-check when scrolling to `#contact-page`). Nav height offset (~78px) is assumed in several places. Preserve these behaviors when touching scroll code.

**Contact form.** `views/ContactPage.vue` uses vee-validate + yup (error messages from i18n), sanitizes the message with DOMPurify, and sends via EmailJS. EmailJS is initialized in `main.ts`; credentials come from `.env`: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_US_ID`.

**Styling.** Global CSS is in `src/styles/` (imported once via `styles/main.css` in `App.vue`). Colors are CSS variables in `styles/vars/color.css`, exposed to Tailwind as named colors in `tailwind.config.js` (`purple`, `brand-blue`, `neutral-grey`, etc.) — use those names rather than raw hex values. Path alias `@` → `src/`.
