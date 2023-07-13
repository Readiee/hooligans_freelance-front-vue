<!--<template>-->
<!--  <div>-->
<!--    <div class="search_content">-->
<!--    <AppTabs style="margin-top: 50px; margin-left: 35px;" :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">-->
<!--      <div class="title">-->
<!--      </div>-->
<!--    </AppTabs>-->
<!--    </div>-->
<!--    <div style="margin-top: 96px;" v-if="this.serviceCards.length > 0"-->
<!--         class="content-block">-->
<!--      <service-list class="services-list"-->
<!--                    :serviceCards="this.serviceCards">-->
<!--      </service-list>-->
<!--    </div>-->
<!--    <p v-else>Пока что на сайте нет ни одной услуги.</p>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div>
    <div class="search_content">
      <AppTabs style="margin-top: 50px; margin-left: 35px;" :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      </AppTabs>
        <div class="tab-content">
          <div v-if="selectedTab === 'Copywriting'">
            <div class="content_title">
            <p>Lorem ipsum dolor sit amet and Copywriting</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Copywriting</p>
            </div>
          </div>
          <div v-if="selectedTab === 'Webdesign'" >
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Webdesign</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Webdesign</p>
            </div>
          </div>

          <div v-if="selectedTab === 'Translation'">
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Translation</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Translation</p>
            </div>
          </div>

          <div v-if="selectedTab === 'Illustrations'">
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Illustrations</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Illustrations</p>
            </div>
          </div>

          <div v-if="selectedTab === 'Mobiledevelopment'">
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Mobiledevelopment</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Mobiledevelopment</p>
            </div>
          </div>
          <div v-if="selectedTab === 'Photo'">
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Photo</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Photo</p>
            </div>
          </div>
          <div v-if="selectedTab === 'Other'">
            <div class="content_title">
              <p>Lorem ipsum dolor sit amet and Other</p>
            </div>
            <div class="content_sdsc">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit and Other</p>
            </div>
          </div>
        </div>
      <div class="search">
        <input placeholder="Поиск..." class="search_input">
      </div>
    </div>
    <div class="content-block">
      <div v-if="serviceCards.length > 0">
        <service-list class="services-list" :serviceCards="serviceCards"></service-list>
      </div>
      <div v-else class="service-notfound">
      <span >Пока что на сайте нет ни одной услуги.</span>
      </div>
    </div>
  </div>
</template>

<script>

import { getServicesApi } from '@/services/services_service'
import ServiceList from '@/components/services/ServiceList.vue'
import AppTabs from '@/components/UI/AppTabs.vue'
import { ref } from 'vue'

export default {
  components: { ServiceList, AppTabs },
  data () {
    return {
      serviceCards: [],
      activeTab: 'Copywriting'
    }
  },
  setup () {
    const tabs = [
      { name: 'Copywriting', label: ' Копирайтинг' },
      { name: 'Webdesign', label: 'Веб-дизайн' },
      { name: 'Translation', label: 'Перевод' },
      { name: 'Illustrations', label: 'Иллюстрации' },
      { name: 'Mobiledevelopment', label: 'Мобильная разработка' },
      { name: 'Photo', label: 'Фотография' },
      { name: 'Other', label: 'Другое' }
    ]
    const selectedTab = ref('Copywriting')
    const changeTab = (tabName) => {
      selectedTab.value = tabName
    }
    return {
      tabs,
      selectedTab,
      changeTab
    }
  },
  mounted () {
    this.fetchServices()
  },
  methods: {
    async fetchServices (){
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
.services-list {
  margin-left: 65px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 94px;
}

.tab-content {
  margin-top: 75px;
  width: 100%;
  height: fit-content;
  background: none;
}
.content_title{
  text-align: center;
  color: #010101;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: auto;
}
.content_sdsc{
  color: #010101;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  overflow: auto;
}
.search{
  display: inline-flex;
  align-items: center;
  margin-top: 50px;
  margin-left: 287px;
  width: 100%;
  height: fit-content;
  background: none;
}
.search_input{
  padding: 14px 391px 15px 40px;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid rgba(1, 1, 1, 0.30);
  background-image: url("@/assets/svg/search_icon.svg");
  background-repeat: no-repeat;
  background-position: 20px center;
  background-color: #fff;
  box-shadow: none;
}
.search_input::placeholder{
  transform: translateX(10px);
}
.service-notfound{
  display: flex;
  color: rgba(1, 1, 1, 0.30);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  justify-content: center;
  margin-top: 50px;
}
</style>
