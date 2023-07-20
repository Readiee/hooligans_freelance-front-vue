<template>
  <div>
    <PlanList
        class="current-entries__list"
        :plans="currentEntries"
        :can-be-deleted="false"
        @editPlan="openUpdateDialog"
    ></PlanList>
    <p v-if="currentEntries.length === 0" style="text-align: center">Нет записавшихся клиентов.</p>
    <div class="tab-content__footer">
      <!-- Здесь может быть дополнительный контент для блока текущих записей -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import PlanList from '@/components/plans/Planslist.vue'

export default {
  components: { PlanList },
  data () {
    return {
    }
  },
  props: {
    currentEntries: {
      type: Array,
      required: true
    }
  },
  setup () {
    const dialogVisibleCreate = ref(false)

    return {
      dialogVisibleCreate
    }
  },
  methods: {
    openUpdateDialog (plan) {
      this.$emit('openUpdateDialog', plan)
    }
  }
}
</script>

<style>
.current-entries__list{
  margin-top: 30px;
}
.tab-content__footer {
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  * {
    color: #8554D8;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>
