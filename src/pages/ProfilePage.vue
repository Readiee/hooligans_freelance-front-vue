<template>
  <div class="container">
    <div>
      <h2>Username: {{ getUserProfile.name }}</h2>
      <h2>Email: {{ getUserProfile.email }}</h2>
    </div>

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
