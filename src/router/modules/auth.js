import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

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
