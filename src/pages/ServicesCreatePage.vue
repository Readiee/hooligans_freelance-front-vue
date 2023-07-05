<template>
  <div>
    <div class="buttons-container">
      <button
          v-for="(button, index) in buttons"
          :key="index"
          :class="{ active: activeButton === index }"
          @click="setActiveButton(index)"
      >
        {{ button }}
      </button>
    </div>
    <div v-show="activeButton === 0" class="container__step1">
      <!-- Код для первой вкладки -->
      <div class="addwork__head">
        <span class="text_type1">Начнём с названия вашей работы.</span>
        <span class="text_type2">Это поможет вашей работе найти подходящих клиентов.</span>
      </div>
      <div class="addwork__example">
        <h4>Например:</h4>
        <ul class="text_type2">
          <li>Перевод текстов с английского языка на русский. Осуществляется с помощью технологий SmartCat, YandexПереводчик.</li>
          <li>Разработка мобильного приложения. IOS, Android.</li>
          <li>Веб-дизайн. Лендинги и многостраничные сайты.</li>
        </ul>
      </div>
      <form>
        <div class="form-group">
          <input placeholder="Название работы:" class="line-input__field" type="text" id="title" v-model.trim="service.title" required>
          <div class="line-input"></div>
        </div>
        <div class="form-group" style="margin-top: 51px;">
          <input placeholder="Краткое описание:" class="line-input__field"  id="shortDescription" v-model.trim="service.shortDescription" required>
          <div class="line-input"></div>
        </div>
        <app-primary-btn
            style="
            position: absolute;
            top: 280px;
            left: 1000px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            padding: 15px 60px;
            gap: 10px;
          "
            type="button"
            @click="nextStep"
        >
          Далее
        </app-primary-btn>
      </form>
    </div>
    <div v-show="activeButton === 1" class="container__step2">
      <div class="addwork__head">
        <span class="text_type1">Местоположение и языки клиентов.</span>
        <span class="text_type2">Указав различные языки, вас найдут больше клиентов из других стран.</span>
      </div>
      <form>
        <div class="form-group">
          <div class="radio-button">
            <input
                type="radio"
                id="russia"
                value="russia"
                v-model="selectedCountry"
            >
            <label for="russia">Россия</label>
          </div>
          <div class="radio-button">
            <input
                type="radio"
                id="world"
                value="world"
                v-model="selectedCountry"
            >
            <label for="world">Мир</label>
          </div>
        </div>
        <app-primary-btn
            style="
        position: absolute;
        top: 240px;
        left: 1000px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 15px 60px;
        gap: 10px;
      "
            type="button"
            @click="nextStep"
        >
          Далее
        </app-primary-btn>
      </form>
    </div>
    <div v-show="activeButton === 2" class="container__step3">
      <!-- Код для второй вкладки -->
      <div class="addwork__head">
        <span class="text_type1">Категория и описание работы.</span>
        <span class="text_type2">Категория работы помогает клиентам в поиске подходящей услуги.</span>
      </div>
      <form>
        <div class="form-group">
          <input placeholder="Полное описание:" class="line-input__field"  id="description" v-model.trim="service.description" required>
          <div class="line-input"></div>
        </div>
        <div class="form-group" style="margin-top: 51px;">
          <input placeholder="Город" class="line-input__field"  id="city" v-model.trim="service.city" required>
          <div class="line-input"></div>
        </div>
        <app-primary-btn
            style="
            position: absolute;
            top: 280px;
            left: 1000px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            padding: 15px 60px;
            gap: 10px;
          "
            type="button"
            @click="nextStep"
        >
          Далее
        </app-primary-btn>
      </form>
    </div>
    <!-- Добавьте код для третьей вкладки здесь -->
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      buttons: ['Название', 'Местоположение', 'Описание работы']
    }
  },

  setup () {
    const activeButton = ref(0)
    const service = ref({
      title: '',
      shortDescription: '',
      description: '',
      selectedCountry: ''
    })

    function setActiveButton (index) {
      activeButton.value = index
    }

    const selectedCountry = ref('russia')
    service.value.selectedCountry = selectedCountry.value
    function nextStep () {
      activeButton.value += 1
      console.log(service.value)
    }

    return {
      activeButton,
      service,
      setActiveButton,
      nextStep,
      selectedCountry
    }
  }
}
</script>

<style scoped>
.container__step1 {
  top: 244px;
  width: 1230px;
  height: 358px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.10000000149011612) ;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
}
.container__step2{
  width: 1230px;
  height: 300px;
  top: 244px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.10000000149011612) ;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
}
.container__step3{
  width: 1230px;
  height: 511px;
  top: 244px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.10000000149011612) ;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
}
.form-group {
  top: 44px;
  left: 547px;
  width: 628px;
  height: 31px;
  display: flex;
  position: absolute;
  align-items: flex-start;
}
.addwork__head{
  top: 40px;
  left: 55px;
  width: 343px;
  height: 116.4000015258789px;
  display: flex;
  position: absolute;
  align-items: flex-start;
}
.text_type1{
  color: black;
  width: 285px;
  height: auto;
  position: absolute;
  font-size: 25px;
  text-align: left;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.text_type2{
  color: rgba(1, 1, 1, 0.30000001192092896);
  width: 343px;
  bottom: 0px;
  height: auto;
  position: absolute;
  font-size: 14px;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.line-input__field{
  border: none;
  outline: none;
  width: 100%;
  border-bottom: 1px solid rgba(1, 1, 1, 0.20);
}
.addwork__example{
  top: 183px;
  left: 547px;
  width: 628px;
  height: 138px;
  display: flex;
  position: absolute;
  align-items: flex-start;
}
.buttons-container {
  margin-top: 30px;
  height: 54px;
  display: flex;
}
button {
  border: 1px solid;
  padding: 22px 30px;
  background-color: #fff;
  margin-right: 15px;
  font-size: 16px;
  flex-shrink: 0;
  border-radius: 10px;
  height: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.active {
  background-color: #8554D8;
  color: #fff;
}
.radio-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
input[type="radio"] {
  display: none;
}

label {
  width: 311px;
  height: 116px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(1, 1, 1, 0.30);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
}
input[type="radio"]:checked + label {
  background-color: #8554D8;
  color: #fff;
}
</style>
