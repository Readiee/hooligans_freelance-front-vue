import RecordsPage from '@/pages/records/RecordsPage.vue'

export default [
  {
    path: '/records',
    name: 'records',
    component: RecordsPage,
    meta: {
      middleware: true
    }
  }
]
