// Prerendered at build time when NUXT_PUBLIC_SITE_URL is set (see nuxt.config.ts)
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const origin = siteUrl || getRequestURL(event).origin
  const lastmod = new Date().toISOString().slice(0, 10)
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
})
