<template>
  <div class="date-picker">
    <input
      type="date"
      :value="selectedDate"
      @input="updateSelectedDate($event.target.value)"
      :min="minDate"
      maxlength="8"
    >
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppDatePicker',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    minDate: {
      type: String
    }
  },
  setup (props, { emit }) {
    const selectedDate = ref(props.modelValue)

    const updateSelectedDate = (date) => {
      if (date > 8) {
        selectedDate.value = date.slice(0, 8)
      } else selectedDate.value = date
      emit('update:modelValue', date)
    }

    return {
      selectedDate,
      updateSelectedDate
    }
  }
}
</script>

<style scoped lang="less">
.date-picker input[type="date"] {
  width: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;

  border-radius: 8px;

  &::-webkit-datetime-edit-fields-wrapper {
    width: 100%;
    display: flex;
    gap: 2px;
  }

  &::-webkit-datetime-edit-day-field {
    width: 20px;
    flex: 1;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
  }

  &::-webkit-datetime-edit-month-field {
    width: 20px;
    flex: 1;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
  }

  &::-webkit-datetime-edit-year-field {
    width: 30px;
    margin-right: 10px;
    flex: 1;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
  }
}
</style>
