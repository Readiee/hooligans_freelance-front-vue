import ServicesPage from '@/pages/ServicesPage'
import CreateProduct from '@/pages/CreateService.vue'

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
    component: CreateProduct,
    name: 'create_service',
    meta: {
      middleware: true // Приватная
    }
  }
]
