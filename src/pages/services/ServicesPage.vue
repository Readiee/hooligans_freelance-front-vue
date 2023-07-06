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
      try {
        this.serviceCards = await getServicesApi()
      } catch (err){
        alert('Не удалось получить услуги.')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
