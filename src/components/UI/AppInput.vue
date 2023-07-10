<template>
  <div class="input-group">
    <VeeField
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :name="name"
      :rules="rules"
      :placeholder="placeholder">
    </VeeField>
    <VeeErrorMessage name="name" class="error-feedback" />
  </div>

</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.input-group{
  width: 100%;
}

input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;

  &:focus {
    outline: none;
    border-bottom-color: #888;
  }
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}
</style>
