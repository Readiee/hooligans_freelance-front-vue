<template>
  <div class="container">
    <div class="card">
      <AppForm @submit="submitForm">
        <h1 style="margin-bottom: 40px;">Создание услуги</h1>

        <InputRows>
          <div class="input-row">
            <AppInput v-model="form.title"
                      :type="`text`"
                      :name="`title`"
                      :rules="`required|max:50`"
                      :placeholder="`Название`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput v-model="form.cost"
                      :type="`text`"
                      :name="`cost`"
                      :rules="`required|integer`"
                      :placeholder="`Стоимость`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput v-model="form.category"
                      :type="`text`"
                      :name="`category`"
                      :rules="`required|max:400`"
                      :placeholder="`Категория`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput v-model="form.duration"
                      :type="`text`"
                      :name="`duration`"
                      :rules="`required|max:400`"
                      :placeholder="`Длительность`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput v-model="form.places"
                      :type="`text`"
                      :name="`places`"
                      :rules="`required|max:60`"
                      :placeholder="`Место`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput :as="`textarea`"
                      v-model="form.desc"
                      :type="`text`"
                      :name="`desc`"
                      :rules="`required|max:400`"
                      :placeholder="`Описание`">
            </AppInput>
          </div>

        </InputRows>

        <AppPrimaryBtn style="margin-top: 10px;" type="submit">Отправить</AppPrimaryBtn>

      </AppForm>
    </div>

  </div>
</template>

<script>
import AppForm from '@/components/AppForm.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppInput from '@/components/UI/AppInput.vue'

export default {
  components: { AppInput, InputRows, AppPrimaryBtn, AppForm },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>

</style>
