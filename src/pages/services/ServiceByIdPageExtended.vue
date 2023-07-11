<template>
  <div class="content">
    <div style="display: flex; flex-wrap: wrap; justify-content: start; margin-top: 48px;">
      <img :src="previewImage" class="avatar__image">
      <div style="margin-left: 36px;">
        <span class="text_type1" style="margin-right: 10px;">{{ serviceItem.author.name }}</span>
        <span class="text_type2">{{ serviceItem.author.email }}</span>
        <div>
          <span class="text_type2">{{ serviceItem.service.description }}</span>
        </div>
        <div class="service-card__content__cost">
          <p>{{serviceItem.service.cost}} ₽</p>
        </div>
        <app-primary-btn style="position: absolute;
              margin-top: 40px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: fit-content;
              padding: 15px 60px;
              gap: 10px;">
          Откликнуться/Редактировать
        </app-primary-btn>
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
        <span class="text_type3">1 час 20 минут{{ serviceItem.service.times }}</span>
      </div>
    </div>
    <div class="description">
      <span>{{ serviceItem.service.description }}</span>
    </div>
  </div>
</template>

<script>

import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import store from '@/store'
import { deleteServiceApi, getServiceByIdApi } from '@/services/services_service'

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
      isLoaded: false,
      previewImage: store.getters['auth/getUserProfile'].image
    }
  },
  mounted () {
    this.fetchServiceById()
    console.log(this.serviceItem)
  },
  methods: {
    async fetchServiceById (){
      const id = this.$route.params.id
      this.serviceItem = await getServiceByIdApi(id)
      this.isLoaded = true
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
  margin-top: 285px;
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
  color: black;
  font-size: 25px;
  text-align: left;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
}
.text_type2{
  color: rgba(1, 1, 1, 0.30000001192092896);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 3px;
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
</style>
