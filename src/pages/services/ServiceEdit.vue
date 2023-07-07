<template>
  <div class="container">
    <div v-if="isLoaded" class="card">
      <VeeForm @submit="submitForm">
        <h1 style="margin-bottom: 40px;">Изменение услуги</h1>

        <div class="form-group">
          <VeeField v-model="form.title"
                    type="text"
                    name="title"
                    rules="required|max:50"
                    :placeholder="`Название`">
          </VeeField>
          <VeeErrorMessage name="title" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField v-model.trim="form.cost"
                    type="text"
                    name="cost"
                    rules="required|integer"
                    :placeholder="`Стоимость (в рублях, братик)`">
          </VeeField>
          <VeeErrorMessage name="cost" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField as="textarea"
                    v-model="form.desc"
                    type="textarea"
                    name="desc"
                    rules="required|max:500"
                    :placeholder="`Описание`">
          </VeeField>
          <VeeErrorMessage name="desc" class="error-feedback" />
        </div>

        <app-primary-btn style="margin-top: 10px;" type="submit">Отправить</app-primary-btn>

      </VeeForm>
    </div>
  </div>
</template>

<script>
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import router from '@/router/router'
import { updateServiceApi, getServiceByIdApi } from '@/services/services_service'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const { resetForm, errors } = useForm()
    const route = useRoute()
    const store = useStore()

    const id = route.params.id
    const getCreatorId = async () => {
      const serviceItem = await getServiceByIdApi(id)
      try {
        return serviceItem.author.id
      } catch (err){
        console.log(err)
        await router.push('/services')
      }
    }

    const form = reactive({
      title: '',
      cost: '',
      desc: ''
    })

    const isLoaded = ref(false)

    onMounted(async () => {
      const creatorId = await getCreatorId()
      if (store.getters['auth/getUserProfile'].id === creatorId || store.getters['auth/getUserProfile'].role === 'Admin') {
        const data = await getServiceByIdApi(id)
        form.title = data.service.title
        form.cost = data.service.cost
        form.desc = data.service.description
        isLoaded.value = true
      } else await router.push('/services')
    })

    const submitForm = async () => {
      if (Object.keys(errors.value).length === 0) {
        const payload = {
          productId: Number(id),
          title: form.title,
          cost: form.cost,
          description: form.desc
        }
        try {
          await updateServiceApi(payload)
          alert('Услуга изменена')
          resetForm()
          await router.push('/services/' + id)
        } catch (err) {
          alert('Не удалось создать услугу.')
          console.log(err)
        }
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
.card{
  width: fit-content;
}

label {
  display: block;
  margin-top: 10px;
}

.form-group {
  width: 400px;
  margin-bottom: 30px;

  input {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    width: 100%;

    &:focus {
      outline: none;
      border-bottom-color: #888;
    }
  }

  textarea {
    width: 100%;
    height: 200px;
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
    color: #999;
  }
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}

</style>
