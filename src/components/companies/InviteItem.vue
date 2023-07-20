<template>
  <div class="invite-group">
    <div class="invite-group__start">
      <UserItem :main="email"
                :image-url="getImageUrl('./images/unused-profile-preview.jpg')"/>
    </div>
    <div class="invite-group__end">
      <p>Приглашение отправлено</p>
    </div>

  </div>
</template>

<script>
import UserItem from '@/components/users/UserItem.vue'
import { getImageUrl } from '@/hooks/imageUrl'

export default {
  methods: { getImageUrl },
  components: { UserItem },
  props: {
    email: {
      type: String,
      required: true
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.invite-group {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .invite-group__end{
    p {
      color: @non-active-color
    }
  }
}
</style>
