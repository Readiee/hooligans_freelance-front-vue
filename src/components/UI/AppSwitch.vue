<template>
  <div class="wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      :id="id"
      @input="$emit('update:modelValue', $event.target.checked);"
    >
    <label :for="id"></label>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      required: true,
      type: String
    },
    modelValue: {
      default: false,
      required: true,
      type: Boolean
    }
  },
  setup () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.slot {
  margin-left: 20px;
}

.wrapper {
  display: flex;
  width: 100%;
}

.wrapper input[type=checkbox] {
  height: 0;
  width: 0;
  visibility: hidden;
}

.wrapper label {
  --size: 50px;

  cursor: pointer;
  width: var(--size);
  height: calc(var(--size) / 2);
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}

.wrapper label:after {
  content: '';
  position: absolute;
  top: 6%;
  left: 2.5%;
  width: calc(50% - 5%);
  height: calc(100% - 11%);
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.wrapper input:checked + label {
  background: @primary-color;
}

.wrapper input:checked + label:after {
  left: calc(100% - 2.5%);
  transform: translateX(-100%);
}

.wrapper label:active:after {
  width: 55%;
}
</style>
