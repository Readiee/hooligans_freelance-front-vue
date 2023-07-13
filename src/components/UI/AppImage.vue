<template>
  <div class="image-container">
      <img :src="src" :alt="alt" class="image" />
  </div>
</template>

<script>
export default {
  name: 'app-image',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.image-container {
  margin: 0;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
