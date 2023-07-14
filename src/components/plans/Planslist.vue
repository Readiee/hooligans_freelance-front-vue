<template>
    <div v-if="plans.length > 0" class="card-container">
      <plan-item
        v-for="(plan, index) in plans"
        :plan="plan"
        :number="index"
        :key="plan.id"
        :canBeDeleted="canBeDeleted"
        @remove="$emit('remove', plan)"
        @update="$emit('update', plan)"
      />
    </div>
</template>

<script>
import PlanItem from '@/components/plans/PlanItem.vue'
export default {
  name: 'PlanList',
  components: {
    PlanItem
  },
  props: {
    plans: {
      type: Array,
      required: true
    },
    canBeDeleted: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  margin: 0;
  > *:not(:first-child) {
    margin-top: 10px;
  }
}
</style>
