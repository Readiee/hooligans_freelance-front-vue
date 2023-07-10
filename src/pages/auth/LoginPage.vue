<template>
  <div class="container">
    <div class="card">
      <AppForm @submit="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Авторизация</h1>

        <InputRows>
          <div class="input-row">
            <AppInput v-model="form.email"
                      :type="`text`"
                      :name="`email`"
                      :rules="`required|email`"
                      :placeholder="`Email`">
            </AppInput>
          </div>

          <div class="input-row">
            <AppInput v-model="form.password"
                      :type="`password`"
                      :name="`password`"
                      :rules="`required|min:6`"
                      :placeholder="`Пароль`">
            </AppInput>
          </div>
        </InputRows>

        <AppPrimaryBtn
          style="margin-top: 15px;"
          type="submit">
          Войти
        </AppPrimaryBtn>

        <p style="text-align: center; margin-top: 40px;">Нет аккаунта?
          <router-link class="colored-link" to="/register">Зарегистрируйтесь</router-link>
        </p>

      </AppForm>

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
import AppInput from '@/components/UI/AppInput.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import AppForm from '@/components/AppForm.vue'
import InputRows from '@/components/UI/InputRows.vue'

export default {
  components: { InputRows, AppForm, AppPrimaryBtn, AppInput },
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

form {
  width: 350px;
}

</style>
