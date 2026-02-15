export const getRelativeImageUrl = (pathToImage: string) => {
  const path = `../assets/${pathToImage}`
  return new URL(path, import.meta.url).href
}
