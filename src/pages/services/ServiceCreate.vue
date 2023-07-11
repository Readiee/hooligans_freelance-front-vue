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
import router from '@/router/router'
import { createServiceApi } from '@/services/services_service'
import AppForm from '@/components/AppForm.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import { ref } from 'vue'

export default {
  components: { AppPrimaryBtn, AppInput, InputRows, AppForm },
  setup () {
    const form = ref({
      title: '',
      cost: '',
      desc: '',
      places: '',
      category: '',
      duration: ''
    })

    const submitForm = async () => {
      const payload = {
        title: form.value.title,
        cost: form.value.cost,
        description: form.value.desc,
        places: form.value.places,
        category: form.value.category,
        duration: form.value.duration
      }
      try {
        const responseData = await createServiceApi(payload)
        await router.push('/services/' + responseData.id)
      } catch (err) {
        console.log(err)
      }
    }
    return {
      form,
      submitForm
    }
  }
}
</script>

<style scoped lang="less">
.card {
  width: fit-content;

  form {
    width: 350px;
  }
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}

</style>
