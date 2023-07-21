<template>
  <button :disabled="isDisabled"
          :class="{ disabled: isDisabled }">
    <slot></slot>
  </button>
</template>

<script>
import { useIsFormDirty, useIsFormValid } from 'vee-validate'
import { computed } from 'vue'
export default {
  setup () {
    const isDirty = useIsFormDirty()
    const isValid = useIsFormValid()

    const isDisabled = computed(() => {
      return !isDirty.value || !isValid.value
    })

    return {
      isDisabled
    }
  }
}
</script>

<style lang="less" scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;

  &:hover {
    filter: brightness(1);
  }
}
</style>
