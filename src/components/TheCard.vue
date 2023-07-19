<template>
  <div class="container">
    <div class="card">
      <slot></slot>
      <img
        :src="require('@/assets/images/' + imageName + '')"
        alt="RegistrationImage">
    </div>
  </div>
</template>

<script>

export default {
  props: {
    imageName: {
      type: String,
      default: 'reg_form_img.png'
    }
  },
  setup (props) {
  }
}
</script>

<style lang="less" scoped>

.card {
  margin: 0 auto;
  width: 1000px;
  display: flex;
  background-color: white;
  padding: 50px;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  justify-content: space-between;
}

img {
  height: 490px;
}
</style>
