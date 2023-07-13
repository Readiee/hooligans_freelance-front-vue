// import ServicesPage from '@/pages/services/ServicesPage'
import ServiceCreate from '@/pages/services/ServiceCreate.vue'
// import ServiceByIdPage from '@/pages/services/ServiceByIdPage.vue'
import ServiceEdit from '@/pages/services/ServiceEdit.vue'
import ServiceByIdPageExtended from '@/pages/services/ServiceByIdPageExtended.vue'
import ServicesCreatePage from '@/pages/services/ServicesCreatePage.vue'
import ServicesPageExtended from '@/pages/services/ServicesPageExtended.vue'
import ServiceSearch from '@/pages/services/ServiceSearch.vue'
// import ServiceEditPage from '@/pages/services/ServiceEditPage.vue'

export default [
  {
    path: '/services',
    component: ServicesPageExtended,
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
  // {
  //   path: '/services/:id',
  //   component: ServiceByIdPage,
  //   name: 'service_by_id',
  //   meta: {
  //     middleware: false // Публичная
  //   }
  // },
  // {
  //   path: '/services/:id/edit',
  //   component: ServiceEdit,
  //   name: 'service_by_id_edit',
  //   meta: {
  //     middleware: true // Приватная
  //   }
  // },
  {
    path: '/services/createx',
    component: ServicesCreatePage,
    name: 'servicecreatex',
    meta: {
      middleware: false // Приватная
    }
  },
  {
    path: '/services/:id',
    component: ServiceByIdPageExtended,
    name: 'service_by_id',
    meta: {
      middleware: false // Публичная
    }
  },
  {
    path: '/servicesx',
    component: ServicesPageExtended,
    name: 'servicex',
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
      middleware: false // Публичная
    }
  }
]
