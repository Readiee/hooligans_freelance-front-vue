<template>
  <div class="container">
    <div class="content-block header">
      <div class="header__title">
        <h2>Мои заказы</h2>
      </div>
    </div>

    <div v-if="this.recordCards.length > 0"
         class="content-block">
      <record-list class="records-list"
                   :recordCards="this.recordCards"
                   @cancelRecord="cancelRecord">
      </record-list>
    </div>
    <p v-else>Пока что у вас нет заказов.</p>
  </div>
</template>

<script>
import RecordList from '@/components/records/RecordList.vue'
import { cancelRecordApi, getRecordsApi } from '@/services/plans_service'
import store from '@/store'

export default {
  components: {
    RecordList
  },
  data () {
    return {
      recordCards: []
    }
  },
  mounted () {
    this.fetchRecords()
  },
  methods: {
    async fetchRecords () {
      console.log(this.recordCards)
      const userId = store.getters['auth/getUserProfile'].id
      this.recordCards = await getRecordsApi(userId)
    },
    async cancelRecord (record) {
      await cancelRecordApi(record.id)
      await this.fetchRecords()
    }
  }
}
</script>

<style scoped>
.content-block {
  display: flex;
  justify-content: center;
}

.header {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
  border-bottom: 1px #cccccc solid;
  padding: 0 0 20px;
}

.header__title{
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.records-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
