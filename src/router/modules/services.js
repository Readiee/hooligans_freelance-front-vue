import ServicesPage from '@/pages/ServicesPage'
import ServicesCreatePage from '@/pages/ServicesCreatePage.vue'

export default [
  {
    path: '/services',
    component: ServicesPage,
    name: 'services',
    meta: {
      middleware: false // Публичная
    }
  },
  {
    path: '/services/create',
    component: ServicesCreatePage,
    name: 'servicesCreate',
    meta: {
      middleware: false // Публичная
    }
  }
]
