import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import HomePage from '@/pages/HomePage'
import ClientsPage from '@/pages/ClientsPage'
import ServicesPage from '@/pages/ServicesPage'

import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: RegisterPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/clients',
    component: ClientsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    component: ServicesPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await store.dispatch('auth/accessApi')
    if (store.getters['auth/getLoggedIn']) {
      return next()
    } else {
      return next({ path: '/login' })
    }
  }
  return next()
})

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     let userProfile = store.getters['auth/getUserProfile']
//     if (userProfile.id === 0) {
//       await store.dispatch('auth/userProfile')
//       userProfile = store.getters['auth/getUserProfile']
//       if (userProfile.id === 0) {
//         return next({ path: '/login' })
//       } else {
//         return next()
//       }
//     }
//   }
//   return next()
// })

export default router
