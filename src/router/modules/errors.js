import NotFoundPage from '@/pages/NotFoundPage'

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFoundPage
  }
]
