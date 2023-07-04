import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, email, min, confirmed, max } from '@vee-validate/rules'
// import ru from '@vee-validate/i18n/dist/locale/ru.json'

export default function setupVeeValidate (app) {
  app.component('VeeField', Field)
  app.component('VeeForm', Form)
  app.component('VeeErrorMessage', ErrorMessage)

  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('confirmed', confirmed)

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
            return 'Поля не совпадают'
          }
        }
      }
    ),
    validateOnInput: false, // Валидация при вводе
    validateOnBlur: false, // Валидация при снятии фокуса
    validateOnChange: false, // Валидация при изменении значения
    validateOnModelUpdate: true // Валидация при обновлении модели
  })

  setLocale('ru')
}
