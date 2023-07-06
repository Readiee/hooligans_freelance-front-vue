<!--<template>-->
<!--  <div class="container">-->
<!--    <div>-->
<!--      <h2>Username: {{ getUserProfile.name }}</h2>-->
<!--      <h2>Email: {{ getUserProfile.email }}</h2>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->
<!-- Нужно основной контейнер реализовать с карточкой и добавить бордер, а для табов сделать другой контейнер который будет накладываться на основной. -->
<template>
  <div class="profile__container">
    <div class="profile__card">
      <div class="profile__img">
        <img :src="userProfile.image" class="img"  alt=""/>
      </div>
      <div class="profile__description">
        <div>{{ userProfile.name }}</div>
        <div class="hobby">{{ userProfile.hobby }}</div>
        <div class="location">{{ userProfile.location }}</div>
      </div>
      <div class="edit__profile">
        <router-link to="/edit_profile">
          <app-primary-btn>Редактировать профиль</app-primary-btn>
        </router-link>
      </div>
      <div class="profile__infr">
        <div class="profile__email">
          Почта: {{ userProfile.email }}
        </div>
        <div class="profile__name" style="margin-top: 58px;">
          Компания: {{ userProfile.company }}
        </div>
      </div>
    </div>
    <div class="tabs-container">
      <AppTabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
        <div v-if="selectedTab === 'jobs'">
          Здесь могут быть ваши работы.
        </div>
        <div v-if="selectedTab === 'services'">
          Здесь может быть список ваших услуг.
        </div>
        <div v-if="selectedTab === 'reviews'">
          Здесь могут быть отзывы о вас.
        </div>
        <div v-if="selectedTab === 'clients'">
          Здесь могут быть клиенты для которых вы выполняли работу.
        </div>
      </AppTabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton'
import AppTabs from '@/components/UI/AppTabs.vue'

export default {
  name: 'ProfilePage',
  components: { AppTabs, AppPrimaryBtn },
  data () {
    return {
      tabs: [
        { name: 'jobs', label: 'Портфолио' },
        { name: 'services', label: 'Услуги' },
        { name: 'reviews', label: 'Отзывы' },
        { name: 'clients', label: 'Клиенты' }
      ],
      selectedTab: 'jobs'
    }
  },
  computed: {
    ...mapState('auth', ['userProfile']),
    ...mapGetters('auth', ['getUserProfile'])
  },
  methods: {
    ...mapActions('auth', ['editProfile']),
    changeTab (tabName) {
      this.selectedTab = tabName
    }
  }
}
</script>

<style scoped>
.profile__container {
  width: 1440px;
  height: 900px;
  position: relative;
}

.profile__card {
  width: 447px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
}

.profile__img {
  width: 263px;
  height: 246px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 28px;
}

.profile__description {
  margin-top: 24px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.hobby {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
}

.location {
  margin-top: 27px;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
}

.edit__profile {
  margin-top: 30px;
}

.profile__infr {
  margin-left: 42px;
  margin-right: 354px;
  margin-top: 27px;
  font-size: 18px;
}

.profile__email,
.profile__name {
  margin-top: 8px;
  font-weight: 300;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
