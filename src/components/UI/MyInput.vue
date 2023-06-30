<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style>
.input {
  width: 100%;
  border: 2px solid rgb(187, 84, 32);
  padding: 10px 15px;
  margin-right: 15px;
  margin-top: 15px;
}
</style>
