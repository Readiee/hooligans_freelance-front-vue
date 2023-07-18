<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-red-btn'
}
</script>

<style scoped lang="less">
.btn {
  color: white;
  width: 100%;
  padding: 14px 20px;
  background: @red;
  border: none;
  border-radius: @border-radius;
  font-weight: 700;
  font-size: @font-size-small;
  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
  //&:focus{
  //  filter: brightness(0.8);
  //}
}

</style>
