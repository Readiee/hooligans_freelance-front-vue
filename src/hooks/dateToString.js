export function dateToString (string) {
  return new Date(string).toLocaleDateString() + ' - ' + new Date(string).toLocaleTimeString().slice(0, -3)
}
