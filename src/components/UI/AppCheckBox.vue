<template>
  <div class="checkbox" :class="{ checked: isChecked }" @click="toggleChecked">
    <slot></slot>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    checkedValues: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const isChecked = ref(props.checkedValues.includes(props.value))

    watch(
      () => props.checkedValues,
      () => {
        isChecked.value = props.checkedValues.includes(props.value)
      }
    )

    const toggleChecked = () => {
      isChecked.value = !isChecked.value

      const updatedValues = [...props.checkedValues]

      if (isChecked.value) {
        updatedValues.push(props.value)
      } else {
        const index = updatedValues.indexOf(props.value)
        if (index !== -1) {
          updatedValues.splice(index, 1)
        }
      }

      emit('update:modelValue', updatedValues)
    }

    return {
      isChecked,
      toggleChecked
    }
  }
}
</script>

<style scoped>
.checkbox {
  display: flex;
  padding: 4px 10px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #010101;
  cursor: pointer;
}

.checkbox.checked {
  background-color: #8554D8;
  color: white;
}
</style>
