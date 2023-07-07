<template>
  <div>
    <service-list :serviceCards="this.serviceCards"></service-list>
  </div>
</template>

<script>

import { getServicesApi } from '@/services/services_service'
import ServiceList from '@/components/services/ServiceList.vue'

export default {
  components: { ServiceList },
  data () {
    return {
      serviceCards: []
    }
  },
  mounted () {
    this.fetchServices()
  },
  methods: {
    async fetchServices (){
      this.serviceCards = await getServicesApi()
    }
  }
}
</script>

<style scoped>

</style>
