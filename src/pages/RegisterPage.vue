<template>
  <div class="container">
    <div class="card">
      <VeeForm @submit="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Регистрация</h1>

        <div class="form-group">
          <VeeField v-model="form.name" type="text" name="name" rules="required|max:35" :placeholder="`Имя`">
          </VeeField>
          <VeeErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField v-model="form.email" type="text" name="email" rules="required|email" :placeholder="`Email`">
          </VeeField>
          <VeeErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField v-model="form.password" type="password" name="password" rules="required|min:6" :placeholder="`Пароль`">
          </VeeField>
          <VeeErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <VeeField v-model="form.password_confirm" type="password" name="password_confirm" rules="required|confirmed:@password" :placeholder="`Потверждение пароля`">
          </VeeField>
          <VeeErrorMessage name="password_confirm" class="error-feedback" />
        </div>

        <app-primary-btn style="margin-top: 10px;" type="submit">Зарегистрироваться</app-primary-btn>
        <p style="text-align: center; margin-top: 40px;">Уже есть аккаунт?
          <router-link class="colored-link" to="/login">Войдите</router-link>
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
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }

    const submitForm = () => {
      if (Object.keys(errors.value).length === 0) {
        const payload = {
          name: form.name,
          email: form.email,
          password: form.password
        }
        store.dispatch('auth/register', payload)
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
