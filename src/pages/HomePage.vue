<template>
  <div class="container">
    <header>
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
