<template>
  <div class="input-group">
    <VeeField as="input"
              type="time"
              :value="selectedTime"
              @input="updateSelectedTime($event.target.value)"
              :name="name"
              :rules="`required`"
    >
    </VeeField>
    <VeeErrorMessage :name="name" class="error-feedback"></VeeErrorMessage>
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
    name: String
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
.input-group{
  display: flex;
  flex-direction: column;
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
