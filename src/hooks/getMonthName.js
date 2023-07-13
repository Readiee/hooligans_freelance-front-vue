export function getMonthName (monthNumber) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ]

  if (monthNumber >= 0 && monthNumber <= 11) {
    return months[monthNumber]
  } else {
    return 'у тебя ошибка, братик'
  }
}
