import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import HomePage from '@/pages/HomePage'
import ClientsPage from '@/pages/ClientsPage'
import ServicesPage from '@/pages/ServicesPage'
import NotFoundPage from '@/pages/NotFoundPage'

import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      middleware: true // Требуется авторизация
    }
  },
  {
    path: '/home',
    component: HomePage,
    meta: {
      middleware: true // Требуется авторизация
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      middleware: true // Доступно только неавторизованным пользователям
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      middleware: true // Доступно только неавторизованным пользователям
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      middleware: true // Требуется авторизация
    }
  },
  {
    path: '/clients',
    component: ClientsPage,
    meta: {
      middleware: true // Требуется авторизация
    }
  },
  {
    path: '/services',
    component: ServicesPage,
    meta: {
      middleware: true // Требуется авторизация
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/accessApi')
  const loggedIn = store.getters['auth/getLoggedIn']

  if (!to.meta.middleware) {
    return next()
  }
  if (to.name !== 'login' && to.name !== 'register' && !loggedIn) next({ name: 'login' })
  else if ((to.name === 'login' || to.name === 'register') && loggedIn) next({ name: 'home' })
  else next()
})

export default router
