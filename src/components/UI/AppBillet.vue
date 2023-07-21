<template>
  <div class="billet">
    <p>
      <slot></slot>
    </p>
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
.billet {
  margin-top: auto;
  padding: 8px 12px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;

  p {
    color: @secondary-color;
  }
}
</style>
