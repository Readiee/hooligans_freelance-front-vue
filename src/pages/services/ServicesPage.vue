<template>
  <div class="container">
    <div class="content-block header">
      <div class="header__title">
        <h2>Список услуг</h2>
      </div>
      <div class="header__btns">
        <router-link to="/services/create">
          <AppPrimaryBtn class="header__btns_btn">Создать свою услугу</AppPrimaryBtn>
        </router-link>
      </div>
    </div>

    <div v-if="this.serviceCards.length > 0"
         class="content-block">
      <service-list class="services-list"
                    :serviceCards="this.serviceCards">
      </service-list>
    </div>
    <p v-else>Пока что на сайте нет ни одной услуги.</p>
  </div>

</template>

<script>

import { getServicesApi } from '@/services/services_service'
import ServiceList from '@/components/services/ServiceList.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'

export default {
  components: { AppPrimaryBtn, ServiceList },
  data () {
    return {
      serviceCards: []
    }
  },
  mounted () {
    this.fetchServices()
  },
  methods: {
    async fetchServices () {
      console.log(this.serviceCards)
      this.serviceCards = await getServicesApi()
    }
  }
}
</script>

<style scoped>
.content-block {
  display: flex;
  justify-content: center;
}

.header{
  border-bottom: 1px #cccccc solid;
  padding: 0 0 20px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 20px;
}

.header__title{
  display: flex;
  justify-content: start;
  align-items: center;
}

.header__btns {
  //width: 100%;
  display: flex;
  justify-content: end;

  .header__btns_btn {
    width: 200px;
  }
}

.services-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
