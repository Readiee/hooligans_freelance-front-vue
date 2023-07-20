import ServicesPage from '@/pages/services/ServicesPage'
import ServiceCreate from '@/pages/services/ServiceCreate.vue'
import ServiceByIdPage from '@/pages/services/ServiceByIdPage.vue'
import ServiceEdit from '@/pages/services/ServiceEdit.vue'
import ServiceSearch from '@/pages/services/ServiceSearch.vue'
import ServiceByIdPageExtended from '@/pages/services/ServiceByIdPageExtended.vue'

export default [
  {
    path: '/services',
    component: ServicesPage,
    name: 'services',
    meta: {
      middleware: false // Публичная
    }
  },
  {
    path: '/services/create',
    component: ServiceCreate,
    name: 'create_service',
    meta: {
      middleware: true // Приватная
    }
  },
  {
    path: '/services/:id',
    component: ServiceByIdPage,
    name: 'service_by_id',
    meta: {
      middleware: false // Публичная
    }
  },
  {
    path: '/services/:id/edit',
    component: ServiceEdit,
    name: 'service_by_id_edit',
    meta: {
      middleware: true // Приватная
    }
  },
  {
    path: '/services/search',
    component: ServiceSearch,
    name: 'services_search',
    meta: {
      middleware: false
    }
  },
  {
    path: '/servicesx/:id',
    component: ServiceByIdPageExtended,
    name: 'service_by_idx',
    meta: {
      middleware: false // Публичная
    }
  }
]
