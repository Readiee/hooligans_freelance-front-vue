<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="content-block header">-->
<!--      <div class="header__title">-->
<!--        <h2>Список услуг</h2>-->
<!--      </div>-->
<!--      <div class="header__btns">-->
<!--        <router-link to="/services/create">-->
<!--          <AppPrimaryBtn class="header__btns_btn">Создать свою услугу</AppPrimaryBtn>-->
<!--        </router-link>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div v-if="this.serviceCards.length > 0"-->
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
      <AppTabs style="margin-top: 40px"
               :names="tabs"
               :selectedTab="selectedTab"
               @changeTab="changeTab"
               :class="`tab-nav-fit-content`">
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
          <SearchInput
            placeholder="Поиск..."
            v-model="searchQuery"
            @keydown.enter="performSearch"
            class="search-input"
          ></SearchInput>
      </div>
    </div>
    <div class="content-block">
      <div v-if="serviceCards.length > 0" class="content-block__list">
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
import SearchInput from '@/components/UI/SearchInput.vue'
import router from '@/router/router'
export default {
  components: { SearchInput, ServiceList, AppTabs },
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

    const searchQuery = ref('')

    const performSearch = () => {
      if (searchQuery.value !== '') {
        router.push({ name: 'services_search', query: { search: searchQuery.value } })
      }
    }

    return {
      tabs,
      selectedTab,
      changeTab,
      searchQuery,
      performSearch
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

<style scoped lang="less">

.content-block {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.services-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.tab-content {
  margin-top: 60px;
  width: 100%;
  height: fit-content;
  background: none;
}
.content_title{
  text-align: center;
  color: #010101;
  font-size: @font-size-extra-large;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  overflow: auto;
  justify-content: center;
  display: flex;

  p {
    width: 500px;
  }
}
.content_sdsc{
  margin-top: 20px;
  color: #010101;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  overflow: auto;
}
.search{
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: fit-content;
  background: none;
  .search-input {
    margin: 50px auto 0;
    width: 60%;
  }
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
