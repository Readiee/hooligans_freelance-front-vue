import homeRoutes from '@/router/modules/home'
import authRoutes from '@/router/modules/auth'
import userRoutes from '@/router/modules/users'
import clientsRoutes from '@/router/modules/clients'
import servicesRoutes from '@/router/modules/services'
import errorRoutes from '@/router/modules/errors'
import plansRoutes from '@/router/modules/plans'

import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  ...homeRoutes,
  ...authRoutes,
  ...userRoutes,
  ...clientsRoutes,
  ...servicesRoutes,
  ...errorRoutes,
  ...plansRoutes
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/auth')
  const loggedIn = store.getters['auth/getLoggedIn']

  if (!to.meta.middleware) {
    return next()
  }
  if (to.name !== 'login' && to.name !== 'register' && !loggedIn) return next({ name: 'login' })
  else if ((to.name === 'login' || to.name === 'register') && loggedIn) return next({ name: 'home' })
  else return next()
})

export default router
