<template>
  <div>
    <div class="search_content">
      <AppTabs style="margin-top: 40px"
               :names="categories"
               :selectedTab="selectedTab"
               @changeTab="changeTab"
               :class="`tab-nav-fit-content tab-nav-centered`">
      </AppTabs>
      <ServiceBanner :category="selectedTab"/>
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
      <div v-if="filteredServiceCards.length > 0" class="content-block__list">
        <service-list class="services-list" :serviceCards="filteredServiceCards"></service-list>
      </div>
      <div v-else class="service-notfound">
        <p>Пока что здесь нет услуг.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductsByCategoryApi } from '@/services/services_service'
import ServiceList from '@/components/services/ServiceList.vue'
import AppTabs from '@/components/UI/AppTabs.vue'
import { onMounted, ref } from 'vue'
import SearchInput from '@/components/UI/SearchInput.vue'
import router from '@/router/router'
import useCategories from '@/hooks/useCategories'
import ServiceBanner from '@/components/services/ServiceBanner.vue'
export default {
  components: { ServiceBanner, SearchInput, ServiceList, AppTabs },
  setup () {
    const { categories } = useCategories()
    // const selectedTab = ref(categories[0])
    const selectedTab = ref({
      id: 1,
      name: 'Copywriting',
      label: 'Копирайтинг',
      description: 'Создание продающих текстов и контента. Уникальные и убедительные сообщения для продвижения продуктов и услуг.'
    })

    const serviceCards = ref('')
    const filteredServiceCards = ref([])
    // const fetchServices = async () => {
    //   serviceCards.value = await getServicesApi()
    // }
    const changeTab = async (tab) => {
      console.log(tab)
      selectedTab.value = tab
      filteredServiceCards.value = await getProductsByCategoryApi(selectedTab.value)
    }

    onMounted(async () => {
      await changeTab(selectedTab.value)
    })

    const searchQuery = ref('')
    const performSearch = () => {
      if (searchQuery.value !== '') {
        router.push({ name: 'services_search', query: { search: searchQuery.value } })
      }
    }

    return {
      serviceCards,
      filteredServiceCards,
      categories,
      selectedTab,
      searchQuery,
      performSearch,
      changeTab
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

  P {
    color: @non-active-color;
    font-size: @font-size-small;
  }
}
</style>
