<template>
  <div class="app">
    <div class="navbar">
      <div class="container content-distributed">

        <ul class="navbar__items">

          <li class="nav-item">
            <router-link to="/services"
                         class="nav-link"
                         :class="{activeBRUH: activeNavLink === 'services'}">
              Услуги
            </router-link>
          </li>

          <li v-if="getLoggedIn" class="nav-item">
            <router-link to="/clients"
                         class="nav-link"
                         :class="{activeBRUH: activeNavLink === 'clients'}">
              Клиенты
            </router-link>
          </li>

          <li v-if="getLoggedIn" class="nav-item">
            <router-link to="/records"
                         class="nav-link"
                         :class="{activeBRUH: activeNavLink === 'records'}">
              Мои заказы
            </router-link>
          </li>

        </ul>

        <router-link to="/"
                     class="nav-link"
                     :class="{activeBRUH: activeNavLink === 'home'}"
                     style="position: absolute; left: 50%; font-weight: 700;">
          Logo
        </router-link>

        <ul v-if="!getLoggedIn" class="navbar__items">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Войти
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <AppSecondaryBtn>Регистрация</AppSecondaryBtn>
            </router-link>
          </li>
        </ul>

        <ul v-else class="navbar__items">

          <li class="nav-item">
            <router-link to="/profile"
                         class="nav-link user-group"
                         :class="{activeBRUH: activeNavLink === 'profile'}">
              <div class="user-group__avatar">
                <img :src="getUserProfile.image" alt="User Avatar">
              </div>
              <div class="user-group__username">{{ getUserProfile.name }}</div>
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

    <div class="page">
      <div class="container">
        <router-view />
      </div>
    </div>

    <footer>
      <div class="container content-distributed">
        © 2023 HTTPS Hooligans. All rights almost reserved.
      </div>
    </footer>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import AppSecondaryBtn from '@/components/UI/AppSecondaryButton.vue'

export default {
  components: { AppSecondaryBtn },
  computed: {
    ...mapGetters('auth', {
      getUserProfile: 'getUserProfile',
      getLoggedIn: 'getLoggedIn'
    }),
    activeNavLink () {
      return this.$route.path.split('/')[1]
    }
  },
  methods: {
    ...mapActions('auth', {
      actionLogout: 'logout'
    }),
    async logout () {
      await this.actionLogout()
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a, a:visited, a:hover {
  color: black;
  text-decoration: none;
}

.container {
  margin: 0 auto;
  width: 1170px;
  height: 100%;
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
    .active {
      font-weight: 700;
      * {
        font-weight: 700;
      }
    }
    button {
      padding: 12px;
    }
  }
  .nav-link{
    text-decoration: none;
    font-weight: 400;
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
    cursor: pointer;
  }
}

.page{
  flex: 1
}

footer{
  border-top: 1px solid #ccc;
  align-self: center;
  margin-top: 40px;
  height:100px;
}

.colored-link{
  text-decoration: none;
  color: @primary-color;
  font-weight: 700;
}
.fixed-centered{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
}

.card {
  margin: 0 auto;
  width: 1000px;
  display: flex;
  background-color: white;
  padding: 50px;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  justify-content: space-between;
}

.card-img {
  height: 480px;
}

.user-group{
  display: flex;
  align-items: center;
  object-fit: cover;
}

.user-group__avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-group__username{
  margin-left: 10px;
  font-size: @font-size-small;
  font-weight: 400;
}

input[type=radio]{
  display: block;
}

i {
  &:hover {
    filter: brightness(0.8);
  }
}

.error-feedback {
  margin-top: 5px;
  color: red;
  font-size: 12px;
}

.disabled {
  opacity: 0.5;
  cursor: default;

  &:hover {
    filter: brightness(1);
  }
}

</style>
