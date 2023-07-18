<template>
  <TheTab :info="info">
    <InputRows>
      <div class="input-row">
        <AppInput placeholder="Режим работы" rules="required" name="format" type="text"/>
      </div>
      <div class="input-row">
        <AppTextarea placeholder="Местположение" rules="required|max:50" name="location" type="text"/>
      </div>
    </InputRows>
  </TheTab>
</template>

<script>

import TheTab from '@/components/services/createService/TheTab.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppTextarea from '@/components/UI/AppTextarea.vue'

export default {
  components: { AppTextarea, AppInput, InputRows, TheTab },
  setup () {
    const info = {
      title: 'Режим работы и местоположение',
      desc: 'Когда клиенты знают, где вы находитесь, они доверяют вашим услугам больше.'
    }

    return {
      info
    }
  }
}
</script>

<style lang="less" scoped>

.inputs-examples {
  .inputs-examples__list {
    li {
      color: @non-active-color;
    }
  }
}

</style>
