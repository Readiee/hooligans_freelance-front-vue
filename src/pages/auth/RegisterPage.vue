<template>
  <TheCard image-name="reg_form_img.png">
      <AppForm @submit="submitForm">
        <h3>RECORDUM</h3>
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

          <div class="input-row" style="margin-top: 40px;">
            <AppSwitch v-model="form.isCompany" id="isCompany">
              Зарегистрироваться как компания</AppSwitch>
          </div>

        </InputRows>

        <AppPrimaryBtn
          style="margin-top: 30px;"
          type="submit">
          Зарегистрироваться
        </AppPrimaryBtn>
        <p style="text-align: center; margin-top: 40px;">Уже есть аккаунт?
          <router-link class="colored-link" to="/login">Войдите</router-link>
        </p>
      </AppForm>
  </TheCard>

</template>

<script>
import { useStore } from 'vuex'
import AppInput from '@/components/UI/AppInput.vue'
import AppForm from '@/components/AppForm.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import InputRows from '@/components/UI/InputRows.vue'
import TheCard from '@/components/TheCard.vue'
import { ref } from 'vue'
import AppSwitch from '@/components/UI/AppSwitch.vue'

export default {
  components: { AppSwitch, TheCard, InputRows, AppPrimaryBtn, AppForm, AppInput },
  setup () {
    const store = useStore()

    const selectedChecks = ref([])

    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      isCompany: false
    })

    const submitForm = () => {
      const payload = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        isCompany: form.value.isCompany
      }
      store.dispatch('auth/register', payload)
    }

    return {
      selectedChecks,
      form,
      submitForm
    }
  }
}
</script>

<style scoped lang="less">
form {
  width: 400px;
}
</style>
