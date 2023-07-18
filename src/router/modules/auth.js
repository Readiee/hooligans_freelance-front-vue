import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      middleware: true // Только для неавторизованных
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      middleware: true // Только для неавторизованных
    }
  }
]
