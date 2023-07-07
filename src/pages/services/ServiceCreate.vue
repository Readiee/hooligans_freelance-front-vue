<template>
  <div class="container">
    <div class="card">
      <VeeForm @submit="submitForm">
        <h1 style="margin-bottom: 40px;">Создание услуги</h1>

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
import router from '@/router/router'
import { createServiceApi } from '@/services/services_service'

export default {
  setup () {
    const { errors } = useForm()

    const form = {
      title: '',
      cost: '',
      desc: ''
    }

    const submitForm = async () => {
      if (Object.keys(errors.value).length === 0) {
        const payload = {
          title: form.title,
          cost: form.cost,
          description: form.desc
        }
        try {
          await createServiceApi(payload)
          alert('Услуга создана')
          await router.push('/services')
        } catch (err) {
          alert('Не удалось создать услугу.')
          console.log(err)
        }
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
