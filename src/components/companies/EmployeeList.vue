<template>
  <div v-if="employees.length > 0" class="list-container">
    <template v-for="employee in employees">
      <employee-item
        v-if="employee.role !== 'Leader'"
        :employee="employee"
        :key="employee.id"
        @employeeFired="$emit('employeeFired')"
      />
    </template>
  </div>
<!--  <div v-else>У вас пока нет сотрудников</div>-->
</template>

<script>
import EmployeeItem from '@/components/companies/EmployeeItem.vue'

export default {
  name: 'employee-list',
  components: {
    EmployeeItem
  },
  props: {
    employees: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.list-container {
  margin: 0;
  width: 100%;
}
</style>
