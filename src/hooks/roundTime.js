export const roundTime = (time) => { // HH:mm
  const [hours, minutes] = time.split(':')
  let roundedHours = parseInt(hours, 10)
  let roundedMinutes = parseInt(minutes, 10)

  roundedMinutes = Math.ceil(roundedMinutes / 30) * 30

  if (roundedMinutes === 60) {
    roundedHours++
    roundedMinutes = 0
  }

  const formattedTime = `${roundedHours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`
  console.log(formattedTime)
  return formattedTime
}
