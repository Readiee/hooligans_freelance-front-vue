<template>
  <div class="tab-content__header">
    <div class="header__title">
      <slot name="start"></slot>
    </div>
    <div class="header__btns">
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>

export default {
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>

.tab-content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
}

</style>
