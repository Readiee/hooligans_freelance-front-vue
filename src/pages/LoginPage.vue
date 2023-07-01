<template>
  <div class="container">
    <div class="card">
      <form @submit.prevent="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Авторизация</h1>

        <div class="form-group">
          <input
            id="email"
            type="email"
            placeholder="Email"
            v-model.trim="form.email"
            :class="{'is-invalid': formErrors.email}"
          />
          <div v-if="formErrors.email" class="error-feedback">{{ formErrors.email }}</div>
        </div>

        <div class="form-group">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            v-model="form.password"
            :class="{'is-invalid': formErrors.password}"
          />
          <div v-if="formErrors.password" class="error-feedback">{{ formErrors.password }}</div>
        </div>

        <app-primary-btn style="margin-top: 10px;" type="submit">Войти</app-primary-btn>
        <p style="text-align: center; margin-top: 40px;">Нет аккаунта?
          <router-link class=colored-link to="/register">Зарегистрироваться</router-link>
        </p>
      </form>
      <img
        class="card-img"
        src="@/assets/images/reg_form_img.png"
        alt="SignInImage">

    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      formErrors: {},
      loading: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters('auth', {
      getLoggedIn: 'getLoggedIn'
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions('auth', {
      actionLoginApi: 'loginApi'
    }),

    submitForm () {
      this.formErrors = {}

      if (!this.form.email) {
        this.formErrors.email = 'Введите email.'
      }

      if (!this.form.password) {
        this.formErrors.password = 'Введите пароль.'
      }

      if (Object.keys(this.formErrors).length === 0) {
        this.handleLogin()
      }
    },
    async handleLogin () {
      const payload = {
        email: this.form.email,
        password: this.form.password
      }
      await this.actionLoginApi(payload)
      if (this.getLoggedIn){
        this.$router.push('/home')
      } else {
        alert('Login Error')
      }
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
  width: 300px;
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
