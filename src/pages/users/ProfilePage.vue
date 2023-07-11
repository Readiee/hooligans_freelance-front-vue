<template>
  <div class="profile__container">
    <div class="profile__card">
      <div class="profile__img">
        <img :src="userProfile.image" class="img" alt="ava" />
      </div>
      <div class="profile__description">
        <h2>{{ userProfile.name }}</h2>
        <p class="hobby">{{ userProfile.hobby }} Графический дизайнер</p>
        <p class="location">{{ userProfile.location }} Красноярск</p>
      </div>
      <div class="edit__profile">
        <router-link to="/edit_profile">
          <app-secondary-btn>Редактировать профиль</app-secondary-btn>
        </router-link>
      </div>
      <div class="profile__infr">
        <div class="profile__position">
          <p>Почта</p>
          <h4>{{ userProfile.email }}</h4>
        </div>

        <div class="profile__position">
          <p>Почта</p>
          <h4>{{ userProfile.email }}</h4>
        </div>

        <div class="profile__position">
          <p>Почта</p>
          <h4>{{ userProfile.email }}</h4>
        </div>
<!--        <div class="profile__position">-->
<!--          <p>Компания</p>-->
<!--          <h4>{{ userProfile.company }}</h4>-->
<!--        </div>-->
      </div>
    </div>
    <div class="profile__tabs-container">
      <AppTabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      </AppTabs>

      <div class="tab-content">
        <div v-if="selectedTab === 'jobs'">
          <p>Здесь могут быть ваши работы</p>
        </div>
        <div v-if="selectedTab === 'services'" class="tab-content__services">
          <div v-if="this.serviceCards.length > 0"
               class="content-block">
            <service-list class="services-list" :serviceCards="serviceCards"></service-list>
          </div>
          <p v-else>Здесь могут быть ваши услуги</p>
        </div>

        <div v-if="selectedTab === 'reviews'">
          <p>Здесь могут быть отзывы о вас.</p>
        </div>

        <div v-if="selectedTab === 'clients'">
          <p>Здесь могут быть клиенты для которых вы выполняли работу.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTabs from '@/components/UI/AppTabs.vue'
import AppSecondaryBtn from '@/components/UI/AppSecondaryButton.vue'
import ServiceList from '@/components/services/ServiceList.vue'
import { ref } from 'vue'
import store from '@/store'
import { getUserServicesApi } from '@/services/users_service'

export default {
  name: 'ProfilePage',
  components: { ServiceList, AppSecondaryBtn, AppTabs },
  setup () {
    const tabs = [
      { name: 'jobs', label: 'Портфолио' },
      { name: 'services', label: 'Услуги' },
      { name: 'reviews', label: 'Отзывы' },
      { name: 'clients', label: 'Клиенты' }
    ]
    const selectedTab = ref('jobs')

    const userProfile = store.getters['auth/getUserProfile']

    const serviceCards = ref([])

    const fetchUserServices = async () => {
      const data = await getUserServicesApi(userProfile.id)
      console.log(data)
      serviceCards.value = data
      console.log(serviceCards)
      console.log(serviceCards.value)
    }

    const changeTab = (tabName) => {
      selectedTab.value = tabName
      if (tabName === 'services') {
        fetchUserServices()
        console.log(serviceCards.value)
      }
    }

    return {
      tabs,
      selectedTab,
      userProfile,
      changeTab,
      serviceCards
    }
  }
}
</script>

<style lang="less" scoped>
.profile__container {
  display: grid;
  grid-template-columns: 450px 1fr;
}

.profile__card {
  height: fit-content;
  margin-right: 40px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: @border-radius;
  background-color: #fff;
  box-shadow: @box-shadow;
  * {
    width: 100%;
  }
  .profile__img {
    margin: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}

p{
  font-size: @font-size-medium;
  color: @non-active-color
}

.profile__description {
  margin-top: 20px;
  text-align: center;
  > * {
    margin-bottom: 8px;
  }
}

.edit__profile {
  margin-top: 30px;
}

.profile__infr {
  margin-top: 20px;
  width: 100%;
  justify-content: start;
  font-size: 18px;
}

.profile__position {
    margin-top: 30px;
    h4{
      margin-top: 5px;
    }
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile__tabs-container{
  width: 100%;
}

.tab-content {
  margin-top: 20px;
  width: 100%;
  height: fit-content;
  background: none;

  > div {
    p {
      padding: 30px;
      background-color: white;
      box-shadow: @box-shadow;
    }
  }
}

.services-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

</style>
