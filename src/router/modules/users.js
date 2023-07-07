import ProfilePage from '@/pages/users/ProfilePage.vue'
import EditProfilePageExtended from '@/pages/users/EditProfilePageExtended.vue'

export default [
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      middleware: false // Приватная
    }
  },
  {
    path: '/edit_profile',
    name: 'edit_profile',
    component: EditProfilePageExtended,
    meta: {
      middleware: false // Приватная
    }
  }

]
