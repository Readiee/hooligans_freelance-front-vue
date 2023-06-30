<template>
  <div class="container">
    {{ getUserProfile.id }}
    {{ getUserProfile.username }}
    {{ getUserProfile.email }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfilePage',
  computed: {
    ...mapGetters('auth', {
      getUserProfile: 'getUserProfile'
    })
  },
  mounted () {
  }
}
</script>
