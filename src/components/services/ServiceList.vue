<template>
  <div v-if="serviceCards.length > 0" class="card-container">
    <service-item
      v-for="card in serviceCards"
      :service="card"
      :key="card.id"
    />
  </div>
</template>

<script>
import ServiceItem from '@/components/services/ServiceItem.vue'

export default {
  name: 'service-list',
  components: {
    ServiceItem
  },
  props: {
    serviceCards: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.card-container {
  margin: 0;
  width: fit-content;
}
</style>
