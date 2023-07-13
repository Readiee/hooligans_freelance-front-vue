<template>
  <div class="time-picker">
    <input
      type="time"
      :value="selectedTime"
      @input="updateSelectedTime($event.target.value)"
      :min="minTime"
      maxlength="4"
    >
  </div>
</template>

<script>
export default {
  name: 'AppTimePicker',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    minTime: {
      type: String
    }
  },
  data () {
    return {
      selectedTime: this.value
    }
  },
  methods: {
    updateSelectedTime (time) {
      this.selectedTime = time
      this.$emit('update:modelValue', time)
    }
  }
}
</script>

<style scoped>
.time-picker{
  display: flex;
  justify-content: end;
}
.time-picker input[type="time"] {
  height: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border-radius: 8px;
}
</style>
