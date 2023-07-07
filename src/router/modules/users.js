import ProfilePage from '@/pages/ProfilePage'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      middleware: true // Приватная
    }
  }
]
