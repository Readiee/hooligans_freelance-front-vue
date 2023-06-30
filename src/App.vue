<template>
  <div>
    <div v-if="getUserProfile.id !== 0" class="navbar">
      <div class="container content-distributed">

        <ul class="navbar__items">
          <li class="nav-item">
            <router-link to="/clients" class="nav-link">
              Клиенты
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">
              Услуги
            </router-link>
          </li>
        </ul>

        <a href="/">Logo</a>

        <ul v-if="getUserProfile.id === 0" class="navbar__items">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Войти
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <app-primary-btn>Регистрация</app-primary-btn>
            </router-link>
          </li>
        </ul>

        <ul v-else class="navbar__items">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              {{ getUserProfile.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">
              Выход
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="app">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', {
      getUserProfile: 'getUserProfile',
      getLoggedIn: 'getLoggedIn'
    })
  },
  methods: {
    ...mapActions('auth', {
      userLogout: 'userLogout'
    }),
    ...mapActions('auth', {
      actionUserLogout: 'userLogout'
    }),
    async logout () {
      await this.actionUserLogout()
      if (!this.getLoggedIn) {
        this.$router.push('/login')
      }
    }
  }
}

</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: @font-family;
}

html {
  height: 100%;
}

body {
  height: 100%;
  background: white;
  font-weight: 400;
  font-family: @font-family;
  font-size: @font-size-small;
}

.app {
}

a, a:visited, a:hover {
  color: black;
  text-decoration: none;
}

.container {
  margin: 0 auto;
  width: 1170px;
}

.content-distributed {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  .content-centered;
  height: 70px;
  background-color: white;
  box-shadow: @box-shadow;
  margin-bottom: 20px;
}

.navbar__items {
  .content-distributed;

  .nav-item {
    margin-left: 30px;
    font-weight: 700;
    font-size: 14px;
  }
  .nav-link{
    text-decoration: none;
  }

  .nav-item:first-child {
    margin-left: 0;
  }

  .nav-item:last-child {
    margin-right: 0;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
}

.colored-link{
  text-decoration: none;
  color: @primary-color;
  font-weight: 700;
}

</style>
