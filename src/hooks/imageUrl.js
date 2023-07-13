export function getImageUrl (imageUrl) {
  const stringImageUrl = String(imageUrl)
  const API_URL = 'http://localhost:3000'
  return `${API_URL}${stringImageUrl.substring(1)}`
}
