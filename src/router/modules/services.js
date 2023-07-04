import ServicesPage from '@/pages/ServicesPage'

export default [
  {
    path: '/services',
    component: ServicesPage,
    name: 'services',
    meta: {
      middleware: false // Публичная
    }
  }
]
