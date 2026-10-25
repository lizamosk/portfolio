# Liza Moskalenko — Frontend Engineer Portfolio

A single-page personal website that presents my professional work experience as a Frontend Engineer: roles and achievements, technologies used, education and certifications, and a contact form for collaboration.

## What's on the site

- **Welcome** — introduction, a "Contact me" button and a downloadable CV.
- **About me** — background, domains I've worked in (healthcare, cartography & maps, education), core skills and a few personal facts.
- **Work experience** — an accordion of roles with company logos, timelines, key achievements and technology badges.
- **Education** — degrees, UI/UX qualification and certifications, with diploma images.
- **Contact** — a validated form that sends messages straight to my inbox.

Sections reveal with a subtle scroll animation, and the layout adapts to phones, tablets and desktops.

## Tech stack

- [Vue 3](https://vuejs.org/) (`<script setup>`) with [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling, with brand colours defined as CSS variables
- [vue-i18n](https://vue-i18n.intlify.dev/) for all user-facing copy and structured content
- [vee-validate](https://vee-validate.logaski.com/) + [yup](https://github.com/jquense/yup) for form validation
- [DOMPurify](https://github.com/cure53/DOMPurify) to sanitise contact-form messages
- [EmailJS](https://www.emailjs.com/) to deliver contact-form messages
- [anime.js](https://animejs.com/) for scroll-reveal animations
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) for SVGs as Vue components
- ESLint (flat config) and Prettier for code quality

## Getting started

Requires Node.js 20 or newer (see `.nvmrc`).

```sh
npm install
```

## Updating the content

Most of the text on the site lives in [`src/copy/en_GB.json`](src/copy/en_GB.json). To update my experience, education or personal details, edit that file rather than the components:

- `work_experience.places` — companies, roles, timelines, achievements and technologies. Company logos are looked up by the `icon` name under `src/assets/images/logos/`.
- `education.places` — qualifications and their diploma images (stored under `src/assets/images/education/`).
- `about_me`, `intro`, `contact` — biography, headline and form copy.

To replace the CV, put the new PDF in `public/` under the same name, or update `CV_PATH` in `src/contants.ts` to point to the new file.

## Deployment

Run `npm run build` and deploy the generated `dist/` folder to any static hosting provider.

### Environment variables

The contact form uses EmailJS. Copy `.env.example` to `.env` and fill in `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID` and `VITE_EMAILJS_CONTACT_US_ID`. `.env` is git-ignored. In production, set the same variables in Cloudflare Pages (Settings → Variables and Secrets).
