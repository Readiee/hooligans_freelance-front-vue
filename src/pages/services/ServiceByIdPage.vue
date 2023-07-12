<template>
  <div v-if="isLoaded">
    <p>Creator: {{ serviceItem.author.name }}</p>
    <p>Email: {{ serviceItem.author.email }}</p>
    <p>Title: {{ serviceItem.service.title }}</p>
    <p>Cost: {{ serviceItem.service.cost }}</p>
    <p>Desc: {{ serviceItem.service.description }}</p>
    <div
      v-if="store.getters['auth/getUserProfile'].id === this.serviceItem.author.id || store.getters['auth/getUserProfile'].role === 'Admin'"
      class="btns">
      <app-primary-btn
        @click="this.$router.push('/services/' + this.serviceItem.service.id  + '/edit')">
        Редактировать заказ
      </app-primary-btn>
      <app-primary-btn
        @click="deleteService"
        style="margin-top: 15px; background-color: red; color: white">
        Удалить услугу
      </app-primary-btn>
    </div>
    <div v-else
         class="btns"
         style="width: 300px;">
      <app-primary-btn
        @click="this.$router.push('/services/' + this.serviceItem.service.id  + '/order')">
        Заказать
      </app-primary-btn>
    </div>

  </div>
</template>

<script>

import { deleteServiceApi, getServiceByIdApi } from '@/services/services_service'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import store from '@/store'

export default {
  components: { AppPrimaryBtn },
  data () {
    return {
      serviceItem: {
        service: {
          type: Object
        },
        author: {
          type: Object
        }
      },
      isLoaded: false
    }
  },
  mounted () {
    this.fetchServiceById()
    console.log(this.serviceItem)
  },
  computed: {
    store () {
      return store
    },
    serviceId () {
      return Number(this.$route.params.id)
    }
  },
  methods: {
    async fetchServiceById () {
      this.serviceItem = await getServiceByIdApi(this.serviceId)
      this.isLoaded = true
    },
    async deleteService () {
      try {
        await deleteServiceApi(this.serviceId)
        this.$router.push('/services')
      } catch (err) {
        alert('Не удалось удалить услугу.')
        this.$router.push('/services/' + this.serviceId)
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.btns{
  margin-top: 15px;
  width: 300px;
}
</style>
