const rasterImages: Record<string, string> = import.meta.glob('@/assets/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const svgUrls: Record<string, string> = import.meta.glob('@/assets/**/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

const images: Record<string, string> = {
  ...rasterImages,
  ...svgUrls,
}

export const getRelativeImageUrl = (pathToImage: string): string | undefined => {
  const normalized = pathToImage.replace(/^\/+/, '')
  const fullPath = `/src/assets/${normalized}`
  return images[fullPath] as string
}
