<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style>
.btn {
  display: inline-block;
  width: fit-content;
  padding: 10px 15px;
  background: none;
  color: rgb(187, 84, 32);
  border: 2px solid rgb(187, 84, 32);
}
</style>
