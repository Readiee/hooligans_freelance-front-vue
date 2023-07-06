<template>
  <div>
    <service-list :service_cards="this.service_cards"></service-list>
  </div>
</template>

<script>

import { getServicesApi } from '@/services/services_service'
import ServiceList from '@/components/Services/ServiceList.vue'

export default {
  components: { ServiceList },
  data () {
    return {
      service_cards: []
    }
  },
  mounted () {
    this.fetchServices()
    console.log(this.service_cards)
  },
  methods: {
    async fetchServices (){
      try {
        this.service_cards = await getServicesApi()
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
