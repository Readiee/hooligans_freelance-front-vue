<template>
  <div class="content">
    <div style="display: flex; flex-wrap: wrap; justify-content: start; margin-top: 48px;">
      <img :src="store.getters['auth/getUserProfile'].image" class="avatar__image">
      <div style="margin-left: 36px;">
        <span class="text_type1" style="margin-right: 10px;">{{ service.author.name }}</span>
        <span class="text_type2">{{ service.email }}</span>
        <div style="margin-top:15px;">
          <h2>{{ service.title }}</h2>
        </div>
        <div style="margin-top: 10px;">
          <span class="text_type2">{{ service.description }}</span>
        </div>
        <div class="service-card__content__cost">
          <p>{{service.cost}} ₽</p>
        </div>
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
    </div>
    <div class="block__mainInformation">
      <div class="rightInf">
        <label class="text_type2">Местоположение</label>
        <span class="text_type3">Lorem ipsum{{ serviceItem.service.location }}</span>
        <label class="text_type2">Под вопросом</label>
        <span class="text_type3">Lorem ipsum</span>
        <label class="text_type2">Услуги</label>
        <span class="text_type3">Мобильная разработка, Веб-разработка, UI/UX, Дизайн интерьеров</span>
      </div>
      <div class="leftInfr">
        <label class="text_type2">Последнее посещение</label>
        <span class="text_type3">Lorem ipsum</span>
        <label class="text_type2">Что-нибудь придумаем</label>
        <span class="text_type3">Lorem ipsum</span>
        <label class="text_type2">Длительность</label>
        <span class="text_type3">1 час 20 минут{{ service.times }}</span>
      </div>
    </div>
    <div class="description">
      <span>{{ service.description }}</span>
    </div>
  </div>
</template>

<script>

import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import store from '@/store'
import { deleteServiceApi, getServiceByIdApi } from '@/services/services_service'

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
      this.service = await getServiceByIdApi(this.serviceId)
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
.content {
  width: 1440px;
  height: 2046px;
  background: #FFF;
}
.details{
  display: flex;
  flex-direction: row;
  margin-right: 36px;
}
.description{
  margin-top: 35px;
  margin-left: 40px;
  display: flex;
  width: 1140px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 1px 1px 37px 1px red;
}
.block__mainInformation{
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 50px;
  width: 1229px;
  height: 249px;
  flex-shrink: 0;
  border-radius: 20px;
  background: white;
  box-shadow: 1px 1px 37px 1px rgba(0, 0, 0, 0.08);
}
.avatar__image{
  width: 67px;
  height: 67px;
  flex-shrink: 0;
}
.text_type1{
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.text_type2{
  color: rgba(1, 1, 1, 0.30);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.text_type3{
  color: #010101;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.rightInf{
  margin-top: 25px;
  margin-left: 44px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  white-space: nowrap;
}
.leftInfr{
  margin-top: 25px;
  margin-right: 435px;
  margin-left: 47px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  white-space: nowrap;
}
.service-card__content__cost {
  margin-top: auto;
  padding: 8px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;

  P {
    color: @secondary-color;
  }
}
.btns{
  margin-top: 40px;
  width: 300px;
}
</style>
