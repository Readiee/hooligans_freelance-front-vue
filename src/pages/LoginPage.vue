<template>
  <div class="container">
    <div class="card">
      <VeeForm @submit="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Авторизация</h1>

        <div class="form-group">
          <VeeField v-model="form.email" type="text" name="email" rules="required|email" :placeholder="`Email`">
          </VeeField>
          <VeeErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField v-model="form.password" type="password" name="password" rules="required" :placeholder="`Пароль`">
          </VeeField>
          <VeeErrorMessage name="password" class="error-feedback" />
        </div>

        <app-primary-btn style="margin-top: 10px;" type="submit">Войти</app-primary-btn>
        <p style="text-align: center; margin-top: 40px;">Нет аккаунта?
          <router-link class="colored-link" to="/register">Зарегистрируйтесь</router-link>
        </p>

      </VeeForm>

      <img
        class="card-img"
        src="@/assets/images/reg_form_img.png"
        alt="RegistrationImage">
    </div>
  </div>
</template>

<script>
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const { resetForm, errors } = useForm()

    const form = {
      email: '',
      password: ''
    }

    const submitForm = () => {
      if (Object.keys(errors.value).length === 0) {
        const payload = {
          email: form.email,
          password: form.password
        }
        store.dispatch('auth/login', payload)
        resetForm()
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

label {
  display: block;
  margin-top: 10px;
}

.form-group {
  width: 350px;
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
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}

</style>
