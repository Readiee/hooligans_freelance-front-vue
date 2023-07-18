<template>
  <div class="navbar">
<!--    <div class="container">-->
<!--      <a href="/">Logo</a>-->
<!--      <div class="navbar__items">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/home" class="nav-link">-->
<!--            Главная-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>-->
<!--        </li>-->
<!--      </div>-->

<!--      <div v-if="!currentUser" class="navbar__items">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/register" class="nav-link">-->
<!--            Регистрация-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/login" class="nav-link">-->
<!--            Войти-->
<!--          </router-link>-->
<!--        </li>-->
<!--      </div>-->

<!--      <div v-if="currentUser" class="navbar__items">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/profile" class="nav-link">-->
<!--            {{ currentUser.name }} {{ currentUser.surname }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" @click.prevent="logOut">-->
<!--            Выход-->
<!--          </a>-->
<!--        </li>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>

</script>

<style>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
}

.navbar__items {
}
</style>
