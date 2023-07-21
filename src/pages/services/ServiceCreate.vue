<template>
  <div class="container">
    <header>
      <router-link to="/profile" style="align-items: center">
        <i class="icon pi pi-arrow-left" style="margin-right: 8px;"></i>
        Назад в профиль
      </router-link>
    </header>
    <div class="content-block">
      <AppTabs :names="tabs"
               @changeTab="selectedTab = $event"
               :selected-tab="selectedTab"
               class="tab-nav-fit-content"
               style="margin-bottom: 20px;"
      ></AppTabs>
      <AppForm @submit="submitForm">

<!--        <component :is="selectedTab.component" style="margin-top: 20px;"></component>-->

        <!--Первый таб-->
        <div v-show="selectedTab.number === 1" class="card tab-block">
          <div class="tab-block__start">
            <h2>Начнём с названия вашей работы</h2>
            <p>Это поможет вашей работе найти подходящих клиентов</p>
          </div>
          <div class="tab-block__end">
            <InputRows>
              <AppInput v-model="form.title" placeholder="Название услуги" rules="required|max:50" name="title"
                        type="text" />
              <AppTextarea v-model="form.description" placeholder="Описание" rules="required|max:400" name="desc"
                           type="textarea" />
            </InputRows>
            <div class="inputs-examples" style="margin-top: 30px;">
              <h4 style="margin-bottom: 10px;">Например:</h4>
              <ul class="inputs-examples__list">
                <li v-for="example in inputsExamples" :key="example">{{ example }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!--Второй таб-->
        <div v-show="selectedTab.number === 2" class="card tab-block">
          <div class="tab-block__start">
            <h2>Режим работы и местоположение</h2>
            <p>Когда клиенты знают, где вы находитесь, они доверяют вашим услугам больше</p>
          </div>
          <div class="tab-block__end">
            <InputRows>
<!--              <AppInput v-model="form.format" placeholder="Формат" rules="required|max:50" name="format" type="text" />-->
              <h4 style="margin-bottom: 20px;">Выберите формат:</h4>
              <AppTabs :names="formats"
                       @changeTab="form.format = $event"
                       :selected-tab="form.format"
                       class="tab-nav-fit-content small-tabs tab-nav-wrap"
                       style="margin-bottom: 40px;"
              ></AppTabs>
              <AppInput v-model="form.places" placeholder="Место" rules="required|max:50" name="places" type="text" />
            </InputRows>
          </div>
        </div>

        <!--Третий таб-->
        <div v-show="selectedTab.number === 3" class="card tab-block">
          <div class="tab-block__start">
            <h2>Категория и описание продукта</h2>
            <p>Категория работы помогает клиентам в поиске подходящей услуги</p>
          </div>
          <div class="tab-block__end">
            <InputRows>
              <!--                <AppInput v-model="form.category" placeholder="Категория" rules="required|max:50" name="category" type="text"/>-->
              <AppInput v-model="form.cost" placeholder="Цена" rules="required|integer" name="cost" type="text" />
              <AppInput v-model="form.duration" placeholder="Длительность" rules="required|max:50" name="duration" type="text" />
            </InputRows>

            <h4 style="margin: 40px 0 20px;">Выберите категорию:</h4>
            <AppTabs :names="categories"
                     @changeTab="form.category = $event"
                     :selected-tab="form.category"
                     class="tab-nav-fit-content small-tabs tab-nav-wrap"
                     style="margin-bottom: 20px;"
            ></AppTabs>
          </div>
        </div>

        <AppPrimaryBtn v-if="selectedTab.name !== tabs[tabs.length - 1].name"
                       class="btn"
                       @click.prevent="selectedTab = tabs.find(tab => tab.number === selectedTab.number + 1)">Далее
        </AppPrimaryBtn>
        <ValidatorButton v-if="selectedTab.name === tabs[tabs.length - 1].name"
                         class="btn"
                         type="submit">
          <AppPrimaryBtn>Отправить</AppPrimaryBtn>
        </ValidatorButton>

      </AppForm>
    </div>
  </div>
</template>

<script>
import AppTabs from '@/components/UI/AppTabs.vue'
import { ref } from 'vue'
import TitleTab from '@/components/services/createService/TitleTab.vue'
import AppForm from '@/components/AppForm.vue'
import router from '@/router/router'
import { createServiceApi } from '@/services/services_service'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
// import TheTab from '@/components/services/createService/TheTab.vue'
import AppTextarea from '@/components/UI/AppTextarea.vue'
import AppInput from '@/components/UI/AppInput.vue'
import InputRows from '@/components/UI/InputRows.vue'
import useCategories from '@/hooks/useCategories'
import formatAndLocationTab from '@/components/services/createService/FormatAndLocationTab.vue'
import ValidatorButton from '@/components/UI/ValidatorButton.vue'

export default {
  components: {
    ValidatorButton,
    InputRows,
    AppInput,
    AppTextarea,
    AppPrimaryBtn,
    AppForm,
    AppTabs
  },
  setup () {
    const tabs = [
      {
        number: 1,
        name: 'TitleTab',
        label: 'Название',
        component: TitleTab
      },
      {
        number: 2,
        name: 'FormatAndLocationTab',
        label: 'Режим работы и местоположение',
        component: formatAndLocationTab
      },
      {
        number: 3,
        name: 'DescAndDurationTab',
        label: 'Категория и время работы',
        component: TitleTab
      }
    ]
    const selectedTab = ref(tabs[0])
    const { categories } = useCategories()

    const formats = ref([
      { id: 1, name: 'online', label: 'Онлайн' },
      { id: 2, name: 'offline', label: 'Оффлайн' }
    ])

    const form = ref({
      title: '',
      description: '',
      places: '',
      format: formats.value[0], // хуй
      category: { id: 1, name: 'Other', label: 'Другое' },
      duration: '',
      cost: ''
    })

    const inputsExamples = [
      'Перевод текстов с английского языка на русский. Осуществляется с помощью технологий SmartCat, YandexПереводчик.',
      'Разработка мобильного приложения. IOS, Android.',
      'Веб-дизайн. Лендинги и многостраничные сайты.'
    ]

    // const form1 = ref({
    //   title: '',
    //   description: ''
    // })
    // const form2 = ref({
    //   format: '',
    //   places: ''
    // })
    // const form3 = ref({
    //   category: '',
    //   duration: '',
    //   cost: ''
    // })

    // const currentProps = computed(() => {
    //   if (selectedTab.value.number === 1) {
    //     return function setTitleAndDesc (data) {
    //       form.value.title = data.title
    //       form.value.description = data.description
    //     }
    //   }
    //   if (selectedTab.value.number === 2) {
    //     return function setFormatAndLocation (data) {
    //       form.value.format = data.format
    //       form.value.places = data.places
    //     }
    //   }
    //   if (selectedTab.value.number === 3) {
    //     return function setCategoryAndDurationAndCost (data) {
    //       form.value.category = data.category
    //       form.value.duration = data.duration
    //       form.value.cost = data.cost
    //     }
    //   }
    //   return false
    // })
    const submitForm = async () => {
      // const payload = JSON.stringify(form.value)
      const payload = {
        title: form.value.title,
        description: form.value.description,
        // format: form.value.places,
        places: form.value.places,
        categoryId: form.value.category.id,
        duration: form.value.duration,
        cost: form.value.cost
      }
      console.log(payload)
      try {
        const responseData = await createServiceApi(payload)
        await router.push('/services/' + responseData.id)
      } catch (err) {
        console.log(err)
      }
    }

    return {
      tabs,
      selectedTab,
      submitForm,
      inputsExamples,
      form,
      categories,
      formats
    }
  }
}
</script>

<style lang="less" scoped>
.content-block {
  margin-top: 30px;
}

form {
  display: flex;
  flex-direction: column;

  .btn {
    margin-top: 20px;
    width: 200px;
    margin-left: auto;
  }
}

.tab-block {
  padding: 45px;
  width: 100%;
  height: 440px;
  justify-content: space-between;

  .tab-block__start {
    width: 40%;
    margin-right: 150px;

    p {
      margin-top: 10px;
      color: @non-active-color
    }
  }

  .tab-block__end {
    margin-left: auto;
    width: 100%;
  }
}

.inputs-examples {
  .inputs-examples__list {
    li {
      color: @non-active-color;
    }
  }
}
</style>
