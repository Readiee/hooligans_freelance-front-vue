<template>
  <div>
    PlansPage
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getRecordsApi } from '@/services/plans_service'

export default {
  setup () {
    const records = ref([])
    const fetchRecords = async () => {
      records.value = await getRecordsApi()
    }

    onMounted(fetchRecords)
    return {
      records
    }
  }
}
</script>

<style lang="less" scoped>

</style>
