<template>
  <div
    class="image-container"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false">
      <div
        class="overlay"
        :class="{ active: isHovered }">
        {{ interactiveText }}
      </div>
      <img :src="src" :alt="alt" class="image" />
  </div>
</template>

<script>
export default {
  name: 'interactive-image',
  data () {
    return {
      isHovered: false
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    interactiveText: {
      type: String,
      required: true
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  opacity:0;
  transition: opacity 0.3s ease;
}
.overlay.active{
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
