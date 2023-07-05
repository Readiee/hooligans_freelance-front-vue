<!--<template>-->
<!--  <div class="container">-->
<!--    <div>-->
<!--      <h2>Username: {{ getUserProfile.name }}</h2>-->
<!--      <h2>Email: {{ getUserProfile.email }}</h2>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<template>
  <div class="profile__container">
  <aside class="profile__card">
    <div class="profile__img">
      <img src="http://1001goroskop.ru/img/gadanie/derevo_zh/_derevo.jpg" class="img" />
      <!--- Выше требуется реализация фото профиля пользователя ---->
    </div>
    <div class="profile__description">
      <div>{{getUserProfile.name}}</div>
      <div class="hobby">UI/UX , Графический дизайнер</div>
      <div class="location">Российская федерация</div>
    </div>
    <!--- Ещё будет работа над этим --->
    <div class="edit__profile">
      <app-primary-btn>Редактировать профиль</app-primary-btn>
    </div>
    <!--- Edit profile, требуется логика редактирования профиля пользователя --->
    <div class="profile__infr">
      <div class="profile__email">
        Почта
        {{getUserProfile.email}}
      </div>
      <div class="profile__name">
        Компания
        {{getUserProfile.name}}
      </div>
    </div>
  </aside>
  <div class="tab-nav">
  <AppTabs
      :names="tabs"
      :selectedTab="selectedTab"
      @changeTab="changeTab">
    <div v-if="selectedTab === 'jobs'">
      Lorem ipsum dolor sit amet.
    </div>
    <div v-if="selectedTab === 'services'">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, id.
    </div>
    <div v-if="selectedTab === 'reviews'">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, atque. Laborum iusto odit minus incidunt.
    </div>
    <div v-if="selectedTab === 'clients'">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, atque. Laborum iusto odit minus incidunt.
    </div>
  </AppTabs>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton'
import AppTabs from '@/components/UI/AppTabs.vue'
import { ref } from 'vue'

export default {
  name: 'ProfilePage',
  data () {
    return {
      tabs: [
        { name: 'jobs', label: 'Портфолио' },
        { name: 'services', label: 'Услуги' },
        { name: 'reviews', label: 'Отзывы' },
        { name: 'clients', label: 'Клиенты' }
      ]
    }
  },
  setup (){
    const selectedTab = ref('Vue')

    const changeTab = (tabName) => {
      selectedTab.value = tabName
    }
    return {
      selectedTab,
      changeTab
    }
  },
  methods: {
  },
  components: { AppTabs, AppPrimaryBtn },
  computed: {
    ...mapGetters('auth', {
      getUserProfile: 'getUserProfile'
    })
  },
  mounted () {
  }
}
</script>

<style scoped>
.profile__container{
  width: 1440px;
  height: 900px;
}
.profile__card{
  width: 447px;
  border: 2px none rgba(120, 120, 120, 0.4);
  height: 750px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: #FFF;
  box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.10);
}
.edit__profile{
  gap: 10px;
  top: 466px;
  left: 42px;
  width: 363px;
  display: flex;
  position: absolute;
  margin-bottom: 229px;
}
.profile__infr{
  top: 548px;
  color: black;
  height: auto;
  position: absolute;
  font-size: 18px;
  font-style: normal;
  text-align: left;
  padding: 10px;
}
.profile__email{
  left: 42px;
  color: black;
  height: auto;
  position: absolute;
  font-size: 18px;
  font-style: normal;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.profile__name{
  left: 42px;
  top: 58px;
  color: black;
  height: auto;
  position: absolute;
  font-size: 18px;
  font-style: normal;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
  margin-top: 25px;
}
.profile__img{
  top: 28px;
  left: 92px;
  width: 263px;
  height: 246px;
  display: flex;
  overflow: hidden;
  position: absolute;
  flex-shrink: 0;
  border-radius: 400px;
  justify-content: center;
  align-items: center;
}
.profile__description{
  top: 306px;
  left: 119px;
  height: auto;
  position: absolute;
  color: black;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.hobby{
  top: 75px;
  left: 97px;
  color: black;
  margin-top: 10px;
  height: auto;
  font-size: 18px;
  font-style: normal;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
  justify-content: center;
  align-items: center;
}
.location{
  margin-top: 27px;
  left: 28px;
  color: black;
  height: auto;
  position: absolute;
  font-size: 18px;
  font-style: normal;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.img {
  top: -12px;
  left: -17px;
  width: 263px;
  height: 246px;
  flex-shrink: 0;
}
.profile__buttons {
  display: flex;
  margin-top: 30px;
  margin-right: 60px;
}

.profile__buttons button {
  margin-right: 15px;
  background-color: #f2f2f2;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
}

.profile__buttons button.active {
  background-color: #8554d8;
}

</style>
