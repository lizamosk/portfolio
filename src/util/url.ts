const images = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
})

export const getRelativeImageUrl = (pathToImage: string) => {
  const fullPath = `/src/assets/${pathToImage}`
  return images[fullPath] as string
}
