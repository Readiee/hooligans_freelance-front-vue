import ProfilePage from '@/pages/ProfilePage'
import ProfilePageExtended from '@/pages/ProfilePageExtended.vue'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      middleware: true // Приватная
    }
  },
  {
    path: '/exprofile',
    name: 'exprofile',
    component: ProfilePageExtended,
    meta: {
      middleware: false // Приватная
    }
  }
]
