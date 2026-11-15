import { useI18n } from 'vue-i18n'

const SOCIAL_PROFILES = [
  'https://github.com/lizamosk',
  'https://linkedin.com/in/limoskk',
  'https://instagram.com/limoskk',
]

/** Title, description, social cards, canonical URL and structured data for the page. */
export function useSiteSeo() {
  const { t } = useI18n()
  const { siteUrl } = useRuntimeConfig().public

  const title = t('seo.title')
  const description = t('seo.description')
  const pageUrl = siteUrl ? `${siteUrl}/` : undefined
  // Social crawlers need an absolute image URL
  const image = siteUrl ? `${siteUrl}/og-image.png` : undefined

  useSeoMeta({
    title,
    description,
    robots: 'index, follow, max-image-preview:large',
    author: 'Liza Moskalenko',
    ogType: 'profile',
    ogSiteName: 'Liza Moskalenko',
    ogLocale: 'en_GB',
    ogTitle: title,
    ogDescription: t('seo.og_description'),
    ogUrl: pageUrl,
    ogImage: image,
    ogImageWidth: image ? 1200 : undefined,
    ogImageHeight: image ? 630 : undefined,
    ogImageAlt: image ? t('seo.og_image_alt') : undefined,
    twitterCard: image ? 'summary_large_image' : 'summary',
    twitterTitle: title,
    twitterDescription: t('seo.og_description'),
    twitterImage: image,
  })

  const person = {
    '@type': 'Person',
    '@id': pageUrl ? `${pageUrl}#person` : undefined,
    name: 'Liza Moskalenko',
    givenName: 'Liza',
    familyName: 'Moskalenko',
    jobTitle: 'Frontend Engineer',
    description,
    url: pageUrl,
    image,
    address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
    knowsAbout: ['TypeScript', 'React', 'Vue3', 'SQL', 'Node.js', 'Figma'],
    knowsLanguage: ['English', 'Spanish', 'Russian'],
    sameAs: SOCIAL_PROFILES,
  }

  useHead({
    link: pageUrl ? [{ rel: 'canonical', href: pageUrl }] : [],
    script: [
      {
        key: 'ld-json',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              name: title,
              description,
              url: pageUrl,
              inLanguage: 'en-GB',
              mainEntity: person,
            },
          ],
        }),
      },
    ],
  })
}
