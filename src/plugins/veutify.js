// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DateFnsAdapter from '@date-io/date-fns'
import RU from 'date-fns/locale/ru'

export default function setupVuetify (app) {
  const vuetify = createVuetify({
    date: {
      adapter: DateFnsAdapter,
      locale: {
        ru: RU
      }
    },
    components,
    directives
  })
  app.use(vuetify)
}
