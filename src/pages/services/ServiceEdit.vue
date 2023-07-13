<template>
  <div class="container">
    <div v-if="isLoaded" class="card">
      <AppForm @submit="submitForm">
        <h1 style="margin-bottom: 40px;">Изменение услуги</h1>

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
            <AppInput v-model.trim="form.cost"
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

        <app-primary-btn style="margin-top: 10px;" type="submit">Отправить</app-primary-btn>

      </AppForm>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import router from '@/router/router'
import { updateServiceApi, getServiceByIdApi } from '@/services/services_service'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import AppInput from '@/components/UI/AppInput.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppForm from '@/components/AppForm.vue'
import { getCreatorId } from '@/hooks/getServiceCreatorId'

export default {
  components: { AppForm, InputRows, AppInput },
  setup () {
    const route = useRoute()
    const store = useStore()

    const id = Number(route.params.id)

    let creatorId = 0
    const setCreatorId = async () => {
      creatorId = await getCreatorId(id)
    }

    const form = reactive({
      title: '',
      cost: '',
      desc: '',
      category: '',
      places: '',
      duration: ''
    })

    const isLoaded = ref(false)

    onMounted(async () => {
      await setCreatorId()
      console.log(creatorId)
      if (store.getters['auth/getUserProfile'].id === creatorId || store.getters['auth/getUserProfile'].role === 'Admin') {
        const data = await getServiceByIdApi(id)
        console.log(data)
        form.title = data.title
        form.cost = data.cost
        form.desc = data.description
        form.category = data.category
        form.places = data.places
        form.duration = data.duration
        isLoaded.value = true
      } else await router.push('/services/' + id)
    })

    const submitForm = async () => {
      const payload = {
        title: form.title,
        cost: form.cost,
        description: form.desc,
        category: form.category,
        places: form.places,
        duration: form.duration
      }
      console.log(payload)
      try {
        await updateServiceApi(id, payload)
        await router.push('/services/' + id)
      } catch (err) {
        alert('Не удалось изменить услугу.')
        console.log(err)
      }
    }
    return {
      form,
      submitForm,
      isLoaded
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
