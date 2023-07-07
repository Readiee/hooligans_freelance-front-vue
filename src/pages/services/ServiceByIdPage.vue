<template>
  <div v-if="isLoaded">
    <p>Creator: {{serviceItem.author.name}}</p>
    <p>Email: {{serviceItem.author.email}}</p>
    <p>Title: {{serviceItem.service.title}}</p>
    <p>Cost: {{serviceItem.service.cost}}</p>
    <p>Desc: {{serviceItem.service.description}}</p>
    <div
      v-if="store.getters['auth/getUserProfile'].id === this.serviceItem.author.id || store.getters['auth/getUserProfile'].role === 'Admin'"
      class="btns"
      style="width: 300px;">
        <app-primary-btn
          style="margin-top: 15px;"
          @click="this.$router.push('/services/' + this.serviceItem.service.id  + '/edit')">
          Редактировать заказ
        </app-primary-btn>
        <app-primary-btn
          @click="deleteService"
          style="margin-top: 15px; background-color: red; color: white">
          Удалить услугу
        </app-primary-btn>
    </div>

  </div>
</template>

<script>

import { deleteServiceApi, getServiceByIdApi } from '@/services/services_service'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import store from '@/store'

console.log(store.getters)

export default {
  computed: {
    store () {
      return store
    }
  },
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
  methods: {
    async fetchServiceById (){
      try {
        const id = this.$route.params.id
        this.serviceItem = await getServiceByIdApi(id)
        this.isLoaded = true
      } catch (err){
        alert('Не удалось получить услугу.')
        this.$router.push('/notfound')
        console.log(err)
      }
    },
    async deleteService () {
      try {
        const id = Number(this.$route.params.id)
        const payload = {
          productId: id
        }
        await deleteServiceApi(payload)
        this.$router.push('/services')
      } catch (err){
        alert('Не удалось удалить услугу.')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
