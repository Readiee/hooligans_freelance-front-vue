<template>
  <div class="employee-group">
    <UserItem :image-url="getImageUrl(employee.avatar)"
              :main="employee.email"
              :desc="employee.name"/>
    <div class="btns">
      <app-red-btn @click="fireEmployee">Уволить</app-red-btn>
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/users/UserItem.vue'
import { getImageUrl } from '@/hooks/imageUrl'
import AppRedBtn from '@/components/UI/AppRedButton.vue'
import { fireEmployeeApi } from '@/services/companies_service'

export default {
  components: { AppRedBtn, UserItem },
  methods: { getImageUrl },
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const fireEmployee = async () => {
      const employeeId = props.employee.id
      const companyId = props.employee.company.id
      try {
        await fireEmployeeApi(companyId, employeeId)
      } catch (err) {
        console.log(err)
      } finally {
        emit('employeeFired')
      }
    }
    return { fireEmployee }
  }
}
</script>

<style lang="less" scoped>
.employee-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
