import HomePage from '@/pages/HomePage.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      middleware: false // Публичная
    }
  },
  {
    path: '/home',
    component: HomePage,
    meta: {
      middleware: false // Публичная
    }
  }
]
