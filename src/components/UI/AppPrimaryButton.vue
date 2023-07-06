<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-primary-btn'
}
</script>

<style scoped lang="less">
.btn {
  display: inline-block;
  min-width: fit-content;
  padding: 14px 18px;
  background: @primary-color;
  color: black;
  border: none;
  border-radius: @border-radius;
  font-weight: 700;
  font-size: @font-size-small;
}
</style>
