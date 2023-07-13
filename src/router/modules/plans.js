import PlansPage from '@/pages/PlansPage.vue'

export default [
  {
    path: '/my-records',
    name: 'my-records',
    component: PlansPage,
    meta: {
      middleware: true
    }
  }
]
