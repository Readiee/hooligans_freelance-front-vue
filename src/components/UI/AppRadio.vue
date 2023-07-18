<template>
  <div class="input-group">
    <input type="radio"
           :id="value"
           :value="value"
           :checked="isChecked"
           @change="$emit('update:modelValue', $event.target.value)"/>
    <label :for="value">{{ label }}</label>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'app-radio',
  props: {
    label: String,
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

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}
input[type="checkbox"],
input[type="radio"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
label {
  position: relative;
  margin-right: 1em;
  padding-left: 2em;
  padding-right: 1em;
  line-height: 2;
  cursor: pointer;
  &:before {
    box-sizing: border-box;
    content: " ";
    position: absolute;
    top: 0.3em;
    left: 0;
    display: block;
    width: 1.4em;
    height: 1.4em;
    border: 1px solid black;
    border-radius: .25em;
    z-index: -1;
  }
}
input[type="radio"] + label::before {
  border-radius: 1em;
}
/* Checked */
input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  &:before {
    border: 7px solid @secondary-color;
    //background: @secondary-color;
  }
}

/* Transition */
//label,
//label::before {
//  -webkit-transition: .2s ease-in;
//  -o-transition: .2s ease-in;
//  transition: .2s ease-in;
//}
</style>
