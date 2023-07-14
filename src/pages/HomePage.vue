<template>
  <div class="container">
    <header>
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>

import router from '@/router/router'

export default {
  name: 'HomePage',
  data () {
    return {
      content: 'Hello'
    }
  },
  mounted () {
    router.push('/services')
  }
}
</script>
