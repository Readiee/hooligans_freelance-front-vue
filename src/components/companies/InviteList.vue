<template>
  <div v-if="invites.length > 0" class="list-container">
    <invite-item
      v-for="invite in invites"
      :email="invite.email"
      :key="invite.id"
    />
  </div>
</template>

<script>

import InviteItem from '@/components/companies/InviteItem.vue'

export default {
  name: 'invite-list',
  components: {
    InviteItem
  },
  props: {
    invites: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.list-container {
  width: 100%;
  margin: 0;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
