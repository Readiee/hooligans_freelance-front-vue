<template>
  <div>
    <div class="search">
      <search-input
        placeholder="Поиск..."
        v-model="search"
        class="search-input"
      ></search-input>
    </div>
    <div>
      <div style="margin-top: 96px;" v-if="filteredList.length > 0" class="content-block">
        <service-list class="services-list" :serviceCards="filteredList"></service-list>
      </div>
      <div v-else class="service-notfound">
        <p>По запросу "{{ this.search }}" ничего не найдено.</p>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceList from '@/components/services/ServiceList.vue'
import { getServicesApi } from '@/services/services_service'
import SearchInput from '@/components/UI/SearchInput.vue'

export default {
  components: { SearchInput, ServiceList },
  data () {
    return {
      search: '',
      serviceCards: []
    }
  },

  mounted () {
    const searchParam = this.$route.query.search || ''
    this.search = searchParam.toString()
    this.fetchServices()
  },

  methods: {
    async fetchServices () {
      this.serviceCards = await getServicesApi()
    }
  },

  computed: {
    filteredList () {
      return this.serviceCards.filter(service => {
        return service.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped lang="less">
.search {
  display: inline-flex;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  height: fit-content;
  background: none;
  justify-content: center;
  .search-input {
    margin: 0 auto;
    width: 60%;
  }
}

.content-block {
  display: flex;
  justify-content: center;
}

.services-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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

  p {
    font-size: @font-size-medium;
  }
}
</style>
