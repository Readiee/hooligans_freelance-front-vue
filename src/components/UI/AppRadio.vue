<template>
  <div class="input-group">
    <input type="radio"
           :id="value"
           :value="value"
           :checked="isChecked"
           @change="$emit('update:modelValue', $event.target.value)"/>
    <label :for="value">{{ value }}</label>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'app-radio',
  props: {
    value: String,
    modelValue: String
  },
  setup (props) {
    const isChecked = computed(() => {
      return props.modelValue === props.value
    })
    return {
      isChecked
    }
  }
}
</script>

<style lang="less" scoped>
.input-group {
  width: 100%;
  display: flex;
  align-items: center;
}

input {
  display: block;
  margin-right: 5px;
  height: 20px;
  width: 20px;
}

label{
  font-size: @font-size-medium;
  margin-left: 8px;
}
</style>
