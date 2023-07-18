<template>
  <TheTab :info="info">
    <InputRows>
      <div class="input-row">
        <AppInput placeholder="Название услуги" rules="required|max:30" name="title" type="text"/>
      </div>
      <div class="input-row">
        <AppTextarea placeholder="Описание" rules="required|max:400" name="desc" type="textarea"/>
      </div>
    </InputRows>
    <div class="inputs-examples" style="margin-top: 30px;">
      <h4 style="margin-bottom: 10px;">Например:</h4>
      <ul class="inputs-examples__list">
        <li v-for="example in inputsExamples" :key="example">{{ example }}</li>
      </ul>
    </div>
  </TheTab>
</template>

<script>

import TheTab from '@/components/services/createService/TheTab.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppTextarea from '@/components/UI/AppTextarea.vue'
import { ref } from 'vue'
import store from '@/store'

export default {
  computed: {
    store () {
      return store
    }
  },
  components: { AppTextarea, AppInput, InputRows, TheTab },

  setup () {
    const info = {
      title: 'Начнём с названия вашей работы',
      desc: 'Это поможет вашей работе найти подходящих клиентов'
    }

    const inputsExamples = [
      'Перевод текстов с английского языка на русский. Осуществляется с помощью технологий SmartCat, YandexПереводчик.',
      'Разработка мобильного приложения. IOS, Android.',
      'Веб-дизайн. Лендинги и многостраничные сайты.'
    ]

    const form = ref({
      title: '',
      description: ''
    })

    return {
      info,
      inputsExamples,
      form
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
