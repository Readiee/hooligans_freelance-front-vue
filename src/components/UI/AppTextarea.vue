<template>
  <div class="input-group">
    <VeeField as="textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :name="name"
      :rules="rules"
      :placeholder="placeholder">
    </VeeField>
    <VeeErrorMessage :name="name" class="error-feedback" />
  </div>

</template>

<script>
export default {
  name: 'AppTextarea',
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

<style scoped lang="less">
.input-group{
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
}

input[type=text]{
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;

  &:focus {
    outline: none;
    border-bottom-color: #888;
  }
}

textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

textarea::placeholder {
  color: @non-active-color
}

input[type=textarea]{
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}
</style>
