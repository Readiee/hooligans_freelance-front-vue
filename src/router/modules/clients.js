import ClientsPage from '@/pages/ClientsPage'

export default [
  {
    path: '/clients',
    component: ClientsPage,
    name: 'clients',
    meta: {
      middleware: true // Приватная
    }
  }
]
