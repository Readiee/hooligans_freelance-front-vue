<template>
  <div class="input-rows">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'input-rows'
}
</script>

<style lang="less">
.input-rows {
  width: 100%;

  > * {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  > :last-child {
    //margin-bottom: 0;
  }
}
</style>
