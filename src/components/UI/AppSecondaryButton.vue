<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-secondary-btn'
}
</script>

<style scoped lang="less">
.btn {
  padding: 16px 20px;
  border-radius: @border-radius;
  font-weight: 700;
  font-size: @font-size-small;
  border: 1px solid black;
  background: none;
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: @light-gray;
  }
  //&:focus{
  //  filter: brightness(0.8);
  //}
}

</style>
