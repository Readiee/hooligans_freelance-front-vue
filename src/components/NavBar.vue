<template>
  <div class="navbar">
    <div @click="$router.push('/')">Logo</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/')">Вкладка</my-button>
      <my-button @click="$router.push('/')" style="margin-left: 15px;">Вкладка</my-button>
      <my-button @click="$router.push('/')" style="margin-left: 15px;">Вкладка</my-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {}

}
</script>

<style>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
}

.navbar__btns {
}
</style>
