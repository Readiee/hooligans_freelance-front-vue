<template>
  <div v-if="recordCards.length > 0" class="card-container">
    <record-item
      v-for="card in recordCards"
      :record="card"
      :key="card.id"
      @cancelRecord="$emit('cancelRecord', card)"
    />
  </div>
</template>

<script>
import RecordItem from '@/components/records/RecordItem.vue'

export default {
  name: 'record-list',
  components: {
    RecordItem
  },
  props: {
    recordCards: {
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
