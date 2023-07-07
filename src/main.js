import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI'
import router from '@/router/router'
import directives from '@/directives'
import store from '@/store'
import VueCookies from 'vue3-cookies'
import setupVeeValidate from '@/plugins/vee-validate'

// import './assets/css/main.css'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(directive => {
  app.directive(directive.name, directive)
})

setupVeeValidate(app)

app
  .use(router)
  .use(store)
  .use(VueCookies)
  .mount('#app')
