<template>
  <div class="container">
    <div class="card">
      <form @submit.prevent="submitForm">
        <h3>Logo</h3>
        <h1 style="margin: 40px 0;">Регистрация</h1>

        <div class="form-group">
          <input
            id="username"
            type="text"
            placeholder="Имя"
            v-model.trim="form.username"
            :class="{'is-invalid': formErrors.username}"
          />
          <div v-if="formErrors.username" class="error-feedback">{{ formErrors.username }}</div>
        </div>

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

        <div class="form-group">
          <input
            id="password_confirm"
            type="password"
            placeholder="Подтверждение пароля"
            v-model="form.password_confirm"
            :class="{'is-invalid': formErrors.password_confirm}"
          />
          <div v-if="formErrors.password_confirm" class="error-feedback">{{ formErrors.password_confirm }}</div>
        </div>

        <app-primary-btn style="margin-top: 10px;" type="submit">Зарегистрироваться</app-primary-btn>
        <p style="text-align: center; margin-top: 40px;">Уже есть аккаунт?
          <router-link class=colored-link to="/login">Войдите</router-link>
        </p>
      </form>
      <img
        class="card-img"
        src="@/assets/images/reg_form_img.png"
        alt="RegistrationImage">

    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'RegisterPage',
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      formErrors: {},
      successful: false,
      loading: false,
      message: ''
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    ...mapActions('auth', {
      actionRegisterApi: 'registerApi'
    }),

    submitForm () {
      this.formErrors = {}

      if (!this.form.username) {
        this.formErrors.username = 'Введите имя пользователя.'
      }

      if (!this.form.email) {
        this.formErrors.email = 'Введите email.'
      }

      if (!this.form.password) {
        this.formErrors.password = 'Введите пароль.'
      }

      if (this.form.password !== this.form.password_confirm) {
        this.formErrors.password_confirm = 'Пароли не совпадают.'
      }

      if (Object.keys(this.formErrors).length === 0) {
        this.handleRegister()
      }
    },
    async handleRegister () {
      const user = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password
      }
      await this.actionRegisterApi(user)
    }
  }
}
</script>

<style scoped lang="less">

.card {
  //position: fixed;
  //top: 53%;
  //left: 50%;
  //transform: translate(-50%, -50%);
  margin: 30px auto;
  width: 1000px;
  display: flex;
  background-color: white;
  padding: 70px;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  justify-content: space-between;
}

.card-img {
  height: 480px;
}

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
