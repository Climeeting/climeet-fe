type ThumbnailType = 'large' | 'small'
type ThumbnailNumber = 1 | 2 | 3 | 4 | 5

export const getThumbnailUrl = (type: ThumbnailType = 'large', number: ThumbnailNumber) => {
  const base = import.meta.env.VITE_DEFAULT_THUMBNAIL_URL
  return `${base}/default_${type}_0${number}.png`
}

export const getRandomThumbnailUrl = (type: ThumbnailType = 'large') => {
  const number = Math.floor(Math.random() * 5) + 1
  return getThumbnailUrl(type, number as ThumbnailNumber)
}
