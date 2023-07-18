import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import AllRules from '@vee-validate/rules'

// import ru from '@vee-validate/i18n/dist/locale/ru.json'

export default function setupVeeValidate (app) {
  app.component('VeeField', Field)
  app.component('VeeForm', Form)
  app.component('VeeErrorMessage', ErrorMessage)

  Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule])
  })

  defineRule('date_format', value => {
    if (!value || !value.length) {
      return true
    }

    const regexPattern = /^(0[1-9]|1\d|2\d|3[01]):(0[1-9]|1[0-2]):(19|20)\d{2}$/
    if (regexPattern.test(String(value)) || value.length !== 10) {
      return 'Поле должно иметь формат DD:MM:YYYY.' + value.length
    }
    return true
  })

  configure({
    generateMessage: localize(
      'ru', {
        messages: {
          required: 'Заполните поле.',
          email: 'Неверный формат почты.',
          min: (field) => {
            return `Поле должно содержать не менее ${field.rule.params[0]} символа(-ов).`
          },
          max: (field) => {
            return `Поле должно содержать не более ${field.rule.params[0]} символа(-ов).`
          },
          confirmed: (field) => {
            console.log(field)
            return 'Поля не совпадают.'
          },
          integer: 'Введите целое число.'
        }
      }
    ),
    validateOnInput: false, // Валидация при вводе
    validateOnBlur: false, // Валидация при снятии фокуса
    validateOnChange: true, // Валидация при изменении значения
    validateOnModelUpdate: true // Валидация при обновлении модели
  })

  setLocale('ru')
}
