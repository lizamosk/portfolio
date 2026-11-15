const rasterImages: Record<string, string> = import.meta.glob(
  '../assets/**/*.{png,jpg,jpeg,webp}',
  {
    eager: true,
    import: 'default',
  }
)

const svgUrls: Record<string, string> = import.meta.glob('../assets/**/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

const images: Record<string, string> = {
  ...rasterImages,
  ...svgUrls,
}

/** URL of a file under `app/assets/`; pass the path relative to that folder. */
export const getRelativeImageUrl = (pathToImage: string): string | undefined => {
  const normalized = pathToImage.replace(/^\/+/, '')
  return images[`../assets/${normalized}`]
}

/**
 * Same as getRelativeImageUrl, but prefers the lightweight `.webp` sibling
 * (same name, same folder) when there is one. Falls back to the original file.
 */
export const getOptimizedImageUrl = (pathToImage: string): string | undefined => {
  const webp = pathToImage.replace(/\.(png|jpe?g)$/i, '.webp')
  return getRelativeImageUrl(webp) ?? getRelativeImageUrl(pathToImage)
}
