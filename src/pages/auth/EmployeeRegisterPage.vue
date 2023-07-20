<template>
  <TheCard image-name="reg_form_img.png">
    <AppForm @submit="submitForm">
      <h3>Logo</h3>
      <h1 style="margin: 30px 0 10px;">Регистрация</h1>
      <p style="margin-bottom: 10px;">Вы были приглашены компанией <strong>{{ company.name }}</strong>.</p>
      <p style="margin-bottom: 30px;">Зарегистрируйтесь, чтобы стать сотрудником компании.</p>

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
import AppInput from '@/components/UI/AppInput.vue'
import AppForm from '@/components/AppForm.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import InputRows from '@/components/UI/InputRows.vue'
import TheCard from '@/components/TheCard.vue'
import { onMounted, ref } from 'vue'
import { checkHashApi, registerEmployeeApi } from '@/services/companies_service'
import router from '@/router/router'
import { loginApi } from '@/services/auth_service'
import { useRoute } from 'vue-router'
import store from '@/store'

export default {
  components: { TheCard, InputRows, AppPrimaryBtn, AppForm, AppInput },
  setup () {
    const form = ref({
      name: '',
      password: ''
    })

    const route = useRoute()
    const hash = route.query.hash
    // const hash = getHashFromUrl(window.location.href)
    const company = ref('')

    onMounted(async () => {
      if (store.getters['auth/getLoggedIn']) {
        await router.push({ name: 'home' })
      } else {
        console.log(hash)
        const payload = { hash }
        console.log(payload)
        try {
          console.log('checkingHash')
          const responseData = await checkHashApi(payload)
          company.value = responseData.company
          console.log(responseData)
        } catch (err) {
          console.log(err)
          // await router.push({ name: 'login' })
        }
      }
    })

    const submitForm = async () => {
      const payload = {
        hash,
        name: form.value.name,
        password: form.value.password
      }
      try {
        console.log(payload)
        const responseData = await registerEmployeeApi(payload)
        console.log(responseData)
        const loginPayload = {
          email: responseData.email,
          password: form.value.password
        }
        await loginApi(loginPayload)
        await router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
    }

    return {
      form,
      submitForm,
      company
    }
  }
}
</script>

<style scoped lang="less">
p {
  color: @non-active-color
}
strong {
  //color: black;
}
form {
  width: 400px;
}
</style>
