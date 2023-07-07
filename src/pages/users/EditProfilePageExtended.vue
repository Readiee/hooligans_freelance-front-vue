<template>
  <div class="edit-profile__container container">
    <div class="edit-profile__content">
      <router-link to="/profile">
        <span>Назад в профиль</span>
      </router-link>
      <!-- Ваш код формы редактирования профиля -->
    </div>
    <div class="tabs">
      <app-vertical-tabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
        <div class="mainInformation" v-if="selectedTab === 'mainInformation'">
          <VeeForm @submit="saveProfile">
            <div class="form__inputs">
              <div>
                <label for="avatar">
                  <AppImage :src="previewImage" />
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  @change=uploadImage
                  style="display: none">
              </div>

              <div class="input-rows" style="margin-left: 20px; margin-top: 20px;">

                <div class="input-row">
                  <div class="form-group">
                    <VeeField placeholder="Имя"
                              class="line-input__field"
                              name="name"
                              v-model.trim="form.texts.name"
                              rules="required|min:4"
                    />
                    <VeeErrorMessage name="name" class="error-feedback" />
                  </div>

                  <!--                  <div class="form-group" style="margin-left: 30px;">-->
                  <!--                    <VeeField placeholder="Email"-->
                  <!--                              class="line-input__field"-->
                  <!--                              name="email"-->
                  <!--                              v-model.trim="form.texts.email"-->
                  <!--                              rules="required|email"-->
                  <!--                    />-->
                  <!--                    <VeeErrorMessage name="email" />-->
                  <!--                  </div>-->

                </div>

                <!--                <input-row>-->
                <!--                  <div class="form-group">-->
                <!--                    <VeeField-->
                <!--                      placeholder="Профессия"-->
                <!--                      class="line-input__field"-->
                <!--                      name="hobby"-->
                <!--                      v-model.trim="form.hobby"/>-->
                <!--                    <VeeErrorMessage name="hobby" />-->
                <!--                  </div>-->
                <!--                </input-row>-->
              </div>
            </div>

            <div class="form__btns" style="margin-top: 15px;">
              <app-primary-btn
                type="submit"
                :disabled="!avatarIsChanged & !textsAreChanged"
                :class="{ disabled: !avatarIsChanged & !textsAreChanged }"
              >Отправить
              </app-primary-btn>
            </div>

            <!-- Добавьте остальные поля информации о пользователе -->
          </VeeForm>
        </div>
        <div v-if="selectedTab === 'aboutMe'">
          Здесь может быть список ваших услуг.
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
      </app-vertical-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppVerticalTabs from '@/components/UI/AppVerticalTabs.vue'
import AppImage from '@/components/UI/AppImage.vue'
import { updateProfileAvatarApi, updateProfileTextsApi } from '@/services/users_service'
import store from '@/store'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'

export default {
  name: 'EditProfile',
  components: { AppPrimaryBtn, AppImage, AppVerticalTabs },
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
      form: {
        texts: {
          name: store.getters['auth/getUserProfile'].name,
          email: store.getters['auth/getUserProfile'].email
        },
        image: null
      },
      defaultForm: {
        texts: {
          name: store.getters['auth/getUserProfile'].name,
          email: store.getters['auth/getUserProfile'].email
        },
        image: null
      },
      previewImage: store.getters['auth/getUserProfile'].image
    }
  },
  computed: {
    ...mapGetters('auth', ['getUserProfile']),
    avatarIsChanged () {
      return this.form.image !== null
    },
    textsAreChanged () {
      return Object.keys(this.form.texts).some(field => this.form.texts[field] !== this.defaultForm.texts[field])
    }
  },
  mounted () {
  },
  methods: {
    saveProfile () {
      if (this.textsAreChanged) {
        this.updateFormTexts()
      }
      if (this.avatarIsChanged) {
        this.updateProfileAvatar()
      }
      setTimeout(() => {
        this.$router.push('/profile')
      }, 1000)
    },
    updateFormTexts () {
      const payload = {
        name: this.form.texts.name,
        email: this.form.texts.email
      }
      console.log(payload)
      updateProfileTextsApi(payload)
    },
    updateProfileAvatar () {
      const formData = new FormData()
      formData.append('picture', this.form.image)
      updateProfileAvatarApi(formData)
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
      this.form.image = image
    }
  }
}
</script>

<style scoped>
.edit-profile__container {
//width: 1440px; //height: 900px; //position: relative;
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
    width: 300px;
  }
}

.disabled {
  opacity: 0.5;
}
</style>
