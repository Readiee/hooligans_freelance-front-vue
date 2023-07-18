<template>
  <div class="container">
    <header>
      <router-link to="/profile">
        <span>Назад в профиль</span>
      </router-link>
    </header>

    <section class="content-block">
      <AppVerticalTabs :names="tabs"
                       :selectedTab="selectedTab"
                       @changeTab="changeTab">
      </AppVerticalTabs>

      <div class="content-block__right">
        <div class="tab-content">

          <div id="main-information" v-if="selectedTab === 'mainInformation'">
            <AppForm>
              <div class="form__inputs">
                <div class="form__inputs__avatar" style="margin-right: 20px;">
                  <label for="avatar">
                    <InteractiveImage :src="previewImage"
                                      :interactiveText="'Загрузить фото'"
                                      class="avatar__image" />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    @change=uploadImage
                    style="display: none">
                </div>

                <InputRows>
                  <div class="input-row">
                    <AppInput v-model="forms.mainInformation.texts.name"
                              :type="`text`"
                              :name="`name`"
                              :rules="`required|min:4`"
                              :placeholder="`Имя`">
                    </AppInput>
                  </div>
                  <!--                  <div class="input-row">-->
                  <!--                    <AppInput v-model="form.texts.email"-->
                  <!--                              :type="`text`"-->
                  <!--                              :name="`email`"-->
                  <!--                              :rules="`required|email`"-->
                  <!--                              :placeholder="`Email`">-->
                  <!--                    </AppInput>-->
                  <!--                  </div>-->
                </InputRows>
              </div>
            </AppForm>
          </div>

          <div v-if="selectedTab === 'aboutMe'">
            <AppForm>
              <div class="form__inputs">
                <InputRows>
                  <div class="input-row">
                    <AppInput v-model="forms.aboutMe.texts.section"
                              :type="`text`"
                              :name="`section`"
                              :rules="`required|min:4`"
                              :placeholder="`Название раздела`">
                    </AppInput>
                  </div>
                </InputRows>
              </div>
            </AppForm>
          </div>

          <div v-if="selectedTab === 'url'">
            Здесь могут быть отзывы о вас.
          </div>

          <div v-if="selectedTab === 'exp'">
            Здесь могут быть клиенты для которых вы выполняли работу.
          </div>

          <div v-if="selectedTab === 'account'">
            Здесь могут быть клиенты для которых вы выполняли работу.
          </div>
        </div>

        <div class="form__btns" style="margin-top: 20px;">
          <AppPrimaryBtn
            @click="saveProfile"
            :disabled="!profileIsChanged"
            :class="{ disabled: !profileIsChanged }"
          >Отправить
          </AppPrimaryBtn>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppImage from '@/components/UI/InteractiveImage.vue'
import { updateProfileMainInfoAvatarApi, updateProfileMainInfoTextsApi } from '@/services/users_service'
import store from '@/store'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import AppForm from '@/components/AppForm.vue'
import AppVerticalTabs from '@/components/UI/AppVerticalTabs.vue'
import AppInput from '@/components/UI/AppInput.vue'
import InputRows from '@/components/UI/InputRows.vue'

const formTextsAreDifferent = (form, defaultForm) => {
  return Object.keys(form.texts).some(field => form.texts[field] !== defaultForm.texts[field])
}

export default {
  name: 'EditProfile',
  components: { InputRows, AppInput, AppVerticalTabs, AppForm, AppPrimaryBtn, InteractiveImage: AppImage },
  data () {
    return {
      tabs: [
        { name: 'mainInformation', label: 'Основная информация' },
        { name: 'aboutMe', label: 'Обо мне' },
        { name: 'url', label: 'В интернете' },
        { name: 'exp', label: 'Опыт работы' },
        { name: 'account', label: 'Управление аккаунтом' }
      ],
      selectedTab: 'mainInformation',
      forms: {
        mainInformation: {
          texts: {
            name: store.getters['auth/getUserProfile'].name,
            email: store.getters['auth/getUserProfile'].email
          },
          image: null
        },
        aboutMe: {
          texts: {
            section: 'Название раздела 1',
            desc: 'Описание 1'
          }
        }
      },
      changesSubmitted: false,
      previewImage: store.getters['auth/getUserProfile'].image
    }
  },
  computed: {
    ...mapGetters('auth', ['getUserProfile']),
    defaultForms () {
      return {
        mainInformation: {
          texts: {
            name: store.getters['auth/getUserProfile'].name,
            email: store.getters['auth/getUserProfile'].email
          },
          image: store.getters['auth/getUserProfile'].image
        },
        aboutMe: {
          texts: {
            section: 'Название раздела 1',
            desc: 'Описание 1'
          }
        }
      }
    },
    profileIsChanged () {
      return this.mainInformationAvatarIsChanged || this.mainInformationTextAreChanged ||
        this.aboutMeChanged
    },
    mainInformationAvatarIsChanged () {
      return this.forms.mainInformation.image !== null
    },
    mainInformationTextAreChanged () {
      return formTextsAreDifferent(this.forms.mainInformation, this.defaultForms.mainInformation)
    },
    aboutMeChanged () {
      return formTextsAreDifferent(this.forms.aboutMe, this.defaultForms.aboutMe)
    }
  },
  mounted () {
  },
  methods: {
    saveProfile () {
      if (this.mainInformationTextAreChanged) {
        updateProfileMainInfoTextsApi(JSON.stringify(this.forms.mainInformation.texts))
      }
      if (this.mainInformationAvatarIsChanged) {
        const formData = new FormData()
        formData.append('picture', this.forms.mainInformation.image)
        updateProfileMainInfoAvatarApi(formData)
        this.forms.mainInformation.image = null
      }
      if (this.aboutMeChanged) {
        console.log('Тут должна быть логика обновления AboutMe')
      }
    },
    changeTab (tabName) {
      this.selectedTab = tabName
    },
    uploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.previewImage = e.target.result
      }
      this.forms.mainInformation.image = image
    }
  }
}
</script>

<style scoped lang="less">
.content-block {
  width: 100%;
  display: flex;
  grid-template-columns: 450px 1fr;
  margin-top: 50px;
}

.content-block__right{
  width: 100%;
}

.tab-content {
  padding: 40px;
  width: 100%;
  height: 400px;
  border-radius: @border-radius;
  background: white;
  box-shadow: @box-shadow;
}

.avatar__image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.mainInformation {
  padding: 40px;
  width: 100%;
  height: fit-content;
  flex-shrink: 0;
  border-radius: 20px;
  background: white;
  box-shadow: 1px 1px 37px 1px rgba(0, 0, 0, 0.08);
}

.input-rows {
  width: 100%;

  * {
    width: 100%;
  }

  > * {
    margin-top: 20px;
  }
}

.input-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.line-input__field {
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(1, 1, 1, 0.20);
}

.form__inputs {
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.form__btns {
  width: 100%;
  display: flex;
  justify-content: end;

  button {
    width: 200px;
  }
}

</style>
