<template>
  <div class="employee-group">
    <UserItem :image-url="getImageUrl(employee.avatar)"
              :main="employee.email"
              :desc="employee.name"/>
    <div class="btns">
      <app-red-btn @click="$emit('fireEmployee', employee)">Уволить</app-red-btn>
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/users/UserItem.vue'
import { getImageUrl } from '@/hooks/imageUrl'
import AppRedBtn from '@/components/UI/AppRedButton.vue'

export default {
  components: { AppRedBtn, UserItem },
  methods: { getImageUrl },
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {}
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
