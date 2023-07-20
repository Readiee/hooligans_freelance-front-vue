export function getHashFromUrl (url) {
  const parts = url.split('/register/')

  const partAfterRegister = parts[1]
  console.log(partAfterRegister)
  return partAfterRegister
}
