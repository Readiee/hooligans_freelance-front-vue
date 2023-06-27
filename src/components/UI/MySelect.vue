<template>
    <select @change="changeOptions">
        <option selected disabled value="">Выберите из списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
<style></style>
