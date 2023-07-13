<template>
  <div>
    <div class="search">
      <input v-model="search" placeholder="Search..." class="search_input">
    </div>
    <div>
      <div v-for="serviceCard in filteredList" :key="serviceCard.id">
        <a :href="serviceCard.link" target="_blank">
          <div style="margin-top: 96px;" v-if="serviceCards.length > 0" class="content-block">
            <service-list class="services-list" :serviceCards="serviceCards"></service-list>
          </div>
          <div v-else class="service-notfound">
          <p>No services available on the website yet.</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceList from '@/components/services/ServiceList.vue'
import { getServicesApi } from '@/services/services_service'

export default {
  components: { ServiceList },
  data () {
    return {
      search: '',
      serviceCards: []
    }
  },

  mounted () {
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

<style scoped>
.search {
  display: inline-flex;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  height: fit-content;
  background: none;
  justify-content: center;
}

.search_input {
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

.content-block {
  display: flex;
  justify-content: center;
}

.services-list {
  margin-left: 65px;
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
}
</style>
