<template>
  <div class="container">
    <div class="card">
      <AppForm @submit="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Регистрация</h1>

        <InputRows>
          <div class="input-row">
            <AppInput v-model="form.name"
                      :type="`text`"
                      :name="`name`"
                      :rules="`required|max:35`"
                      :placeholder="`Имя`">
            </AppInput>
          </div>

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

          <div class="input-row">
            <AppInput v-model="form.password_confirm"
                      :type="`password`"
                      :name="`password_confirm`"
                      :rules="`required|confirmed:@password`"
                      :placeholder="`Потверждение пароля`">
            </AppInput>
          </div>
        </InputRows>

        <AppPrimaryBtn
          style="margin-top: 15px;"
          type="submit">
          Зарегистрироваться
        </AppPrimaryBtn>
        <p style="text-align: center; margin-top: 40px;">Уже есть аккаунт?
          <router-link class="colored-link" to="/login">Войдите</router-link>
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
import AppForm from '@/components/AppForm.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import InputRows from '@/components/UI/InputRows.vue'

export default {
  components: { InputRows, AppPrimaryBtn, AppForm, AppInput },
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
form {
  width: 350px;
}
</style>
