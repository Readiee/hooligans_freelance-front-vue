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
    <AppForm @submit="submitForm">
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
        <div class="form-group">
          <InputRows>
            <div class="input-row">
          <AppInput v-model="form.title"
                    type="text"
                    name="title"
                    rules="required|max:50"
                    :placeholder="`Название`">
          </AppInput>
              </div>
            <div class="input-row">
            <AppInput v-model="form.shrtDesc"
                      type="text"
                      name="shrtDesc"
                      rules="required|max:50"
                      :placeholder="`Краткое описание`">
            </AppInput>
            </div>
          </InputRows>
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
      </div>
      <div v-show="activeButton === 1" class="container__step2">
        <div class="addwork__head">
          <span class="text_type1">Местоположение и языки клиентов.</span>
          <span class="text_type2">Указав различные языки, вас найдут больше клиентов из других стран.</span>
        </div>
        <div>
          <div class="typeWork">
            <button
                :class="{ active2: selectedType === 'online' }"
                class="work_type"
                @click="selectType('online')"
            >
              <label class="workContent">Онлайн
                <p style="color: rgba(1, 1, 1, 0.3); font-size: 14px;">Вы работаете удалённо</p>
              </label>
            </button>
            <button
                :class="{ active2: selectedType === 'offline' }"
                class="work_type"
                @click="selectType('offline')"
            >
              <label class="workContent">Офлайн
                <p style="color: rgba(1, 1, 1, 0.3); font-size: 14px;">Вы работаете в офисе</p>
              </label>
            </button>
          </div>
          <div style="margin-top: 40px; margin-left: 533px;" v-show="selectedType === 'online'">
            <div class="input-row">
              <AppInput v-model="form.desc"
                        type="text"
                        name="location"
                        rules="required|max:50"
                        :placeholder="`Страна`">
              </AppInput>
            </div>
          </div>

          <div style="margin-top: 40px; margin-left: 533px;" v-show="selectedType === 'offline'">
            <div class="input-row">
              <AppInput v-model="form.desc"
                        type="text"
                        name="location"
                        rules="required|max:50"
                        :placeholder="`Страна`">
              </AppInput>
            </div>
            <div style="padding-top: 8px;" class="input-row">
              <AppInput v-model="form.desc"
                        type="text"
                        name="location"
                        rules="required|max:50"
                        :placeholder="`Город`">
              </AppInput>
            </div>
          </div>
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
      </div>
      <div v-show="activeButton === 2" class="container__step3">
        <!-- Код для второй вкладки -->
        <div class="addwork__head">
          <span class="text_type1">Категория и описание работы.</span>
          <span class="text_type2">Категория работы помогает клиентам в поиске подходящей услуги.</span>
        </div>
          <div class="form-group">
            <InputRows>
              <div class="input-row">
                <AppInput v-model="form.desc"
                          type="text"
                          name="desc"
                          rules="required|max:1000"
                          :placeholder="`Описание`">
                </AppInput>
              </div>
              <div class="input-row">
                <AppInput v-model="form.cost"
                          type="text"
                          name="cost"
                          rules="required|integer"
                          :placeholder="`Введите цену`">
                </AppInput>
              </div>
              <div class="input-row">
                <AppInput v-model="form.times"
                          type="text"
                          name="time"
                          rules="required|max:30"
                          :placeholder="`Длительность выполнения (Например: 1 час 20 минут)`">
                </AppInput>
              </div>
              <h2>Выберите категории:</h2>
              <div class="checkbox-container">
                <div v-for="(option, index) in options" :key="index">
                  <AppCheckBox v-model="form.category" :value="option">
                    <span>{{ option }}</span>
                  </AppCheckBox>
                </div>
              </div>
            </InputRows>
          </div>
        <app-primary-btn
            style="
              position: absolute;
              top: 380px;
              left: 1000px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: fit-content;
              padding: 15px 60px;
              gap: 10px;
            "
            type="submit"
        >
          Отправить
        </app-primary-btn>
      </div>
    </AppForm>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import router from '@/router/router'
import { createServiceApi } from '@/services/services_service'
import AppInput from '@/components/UI/AppInput.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppForm from '@/components/AppForm.vue'
import AppCheckBox from '@/components/UI/AppCheckBox.vue'

export default {
  components: { AppForm, AppInput, InputRows, AppCheckBox },
  data () {
    return {
      buttons: ['Название', 'Местоположение', 'Описание работы'],
      typebtn: ['Онлайн', 'Офлайн'],
      options: ['Копирайтинг', 'Веб-дизайн', 'Перевод', 'Иллюстрации', 'Мобильная разработка', 'Перевод', 'Другое']
    }
  },

  setup () {
    const activeButton = ref(0)
    const selectedType = ref('')
    const { errors } = useForm()

    const selectType = (type) => {
      selectedType.value = type
    }

    const form = {
      title: '',
      cost: '',
      desc: '',
      shrtDesc: '',
      typeWork: '',
      times: '',
      category: []
    }

    const submitForm = async () => {
      if (Object.keys(errors.value).length === 0) {
        const payload = {
          title: form.title,
          cost: form.cost,
          description: form.desc,
          shrtDesc: form.shrtDesc,
          typeWork: form.typeWork,
          times: form.times,
          category: form.category
        }
        try {
          await createServiceApi(payload)
          alert('Услуга создана')
          await router.push('/services')
        } catch (err) {
          alert('Не удалось создать услугу.')
          console.log(err)
        }
      }
    }

    function setActiveButton (index) {
      activeButton.value = index
    }
    function nextStep () {
      activeButton.value += 1
      console.log(form.value)
    }

    return {
      activeButton,
      setActiveButton,
      nextStep,
      form,
      submitForm,
      selectedType,
      selectType
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
  height: 339px;
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
  font-size: 14px;
  bottom: 0px;
  height: auto;
  position: absolute;
  text-align: left;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
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
input[type="radio"] {
  display: none;
}
button.active2 {
  border-radius: 10px;
  border: 1px solid #8554D8;
  background: rgba(133, 84, 216, 0.10);
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
.input-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.checkbox-container {
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
}
.typeWork{
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-left: 533px;
}
.work_type {
  width: 311px;
  height: 116px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(1, 1, 1, 0.30);
}

.work_type .workContent {
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 47px;
  padding-left: 20px;
}
</style>
