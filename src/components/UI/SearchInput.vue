<template>
  <input placeholder="Поиск..."
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         type="text"
         class="search_input">
</template>

<script>

export default {
  props: {
    modelValue: {
      type: String
    }
  },
  name: 'SearchInput',
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.search_input{
  width: 100%;
  padding: 18px 40px;
  padding-inline-start: 54px;
  border-radius: 10px;
  border: 1px solid rgba(1, 1, 1, 0.30);
  background-image: url("@/assets/svg/search_icon.svg");
  background-repeat: no-repeat;
  background-position: 20px center;
  background-color: #fff;
  box-shadow: none;

  &:focus {
    border: 1px solid black;
    outline: none
  }
}
</style>
