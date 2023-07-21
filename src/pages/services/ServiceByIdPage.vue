<template>
  <div class="container">

    <section class="content-block">
      <div class="user-avatar">
        <AppImage class="user-avatar"
                  :src="avatarUrl"></AppImage>
      </div>
      <div class="user-group__text">
        <div class="user-group__text__level">
          <h3>{{ service.author.name }}</h3>
          <p>{{ service.author.email }}</p>
        </div>
        <div class="user-group__text__level">
          <h2>{{ service.title }}</h2>
        </div>
        <div class="user-group__text__level">
          <p>{{ service.description }}</p>
        </div>
        <div class="user-group__text__level">
          <p class="service-cost">{{ service.cost }}₽</p>
        </div>
        <div class="user-group__text__level" v-if="hasAllRights">
          <AppPrimaryBtn
            @click="this.$router.push('/services/' + service.id  + '/edit')"
            style="width: 180px; margin-top: 15px;">
            Редактировать
          </AppPrimaryBtn>
          <AppRedBtn
            @click="deleteService"
            style="width: 180px;">
            Удалить
          </AppRedBtn>
        </div>
      </div>
    </section>

    <!--  Для других юзеров -->
    <section class="content-block details-block"
             v-if="!hasAllRights">
      <div v-for="info in this.infos" :key="info" class="details__item">
        <p>{{ info.title }}</p>
        <h3>{{ info.value  }}</h3>
      </div>
    </section>

    <!--  Запись  -->
    <section class="content-block windows-block"
             v-if="!hasAllRights">
      <h2 style="margin-bottom: 30px;">Свободные окна</h2>
      <div class="windows__items" v-if="freeWindows.length > 0">
        <app-radio v-for="window in freeWindows"
                   :key="window.id"
                   :label="stringToDate(window.datetime)"
                   :value="String(window.id)"
                   v-model="selectedWindowId">
        </app-radio>
      </div>
      <p v-else>Пока что нет свободных окон для записи.</p>
      <AppPrimaryBtn @click="signPlanUp"
                     v-if="freeWindows.length > 0"
                     style="width: fit-content; margin-top: 30px; margin-left: auto;"
                     :disabled="!selectedWindowId"
                     :class="{ disabled: !selectedWindowId }"
      >Записаться</AppPrimaryBtn>
    </section>

    <!--    Для админа и креатора-->
    <section class="content-block details-windows-block-for-creator"
             v-if="hasAllRights">

      <div class="details-block">
        <div v-for="info in this.infos" :key="info" class="details__item">
          <p>{{ info.title }}</p>
          <h3>{{ info.value  }}</h3>
        </div>
      </div>

      <div class="windows-block">
        <div class="windows-block__header">
          <AppTabs :names="planTabs"
                   :selectedTab="selectedTab"
                   @changeTab="changeTab"
                   class="tab-nav"/>
        </div>

        <div class="windows-block__tab-content">
          <div v-if="selectedTab.name === 'freeWindows' && store.getters['auth/getLoggedIn']"
               class="tab-content__free-windows">
            <div v-if="this.freeWindows.length > 0">
              <PlanList class="free-windows__list" :plans="freeWindows" @remove="removePlan" @update="openUpdateDialog"/>
            </div>
            <p style="text-align: center" v-else>Нет сеансов.</p>
            <div class="tab-content__footer">
              <h4 @click="dialogVisibleCreate = true">+ Добавить окно</h4>
            </div>
          </div>

          <div v-if="selectedTab.name === 'currentEntries'" class="tab-content__current-entries">
            <div v-if="this.currentEntries.length > 0">
              <PlanList class="current-entries__list" :plans="currentEntries" :can-be-deleted="false" @update="openUpdateDialog"/>
            </div>
            <p style="text-align: center" v-else>Нет записавшихся клиентов.</p>
            <div class="tab-content__footer">
            </div>
          </div>

        </div>
      </div>
    </section>

<!--    Добавление окна -->
    <AppDialog v-model:show="dialogVisibleCreate">
      <AppForm @submit="createPlan" style="width: 400px;">
        <h2 style="margin-bottom: 30px;">Добавить окно</h2>
        <InputRows>
          <div class="input-row">
            <span>Дата</span>
            <AppDatePicker v-model="planDate"
                           :minDate="String(this.currentDate)"
                           :name="`date`"
            ></AppDatePicker>
          </div>
          <div class="input-row">
            <span>Время</span>
            <AppTimePicker v-model="planTime"
                           :name="`time`"
                           style="margin-left: auto;"></AppTimePicker>
          </div>
        </InputRows>
        <div class="form__btns" style="margin-top: 30px;">
          <AppPrimaryBtn type="submit">Отправить</AppPrimaryBtn>
        </div>
      </AppForm>
    </AppDialog>

    <AppDialog v-model:show="dialogVisibleEdit">
      <AppForm @submit="updatePlan" style="width: 400px;">
        <h2 style="margin-bottom: 30px;">Изменить запись</h2>
        <InputRows>
          <!--          <div class="input-row">-->
          <!--            <span>Дата</span>-->
          <!--            <VueDatePicker v-model="planDate" locale="ru"></VueDatePicker>-->
          <!--          </div>-->

          <div class="input-row">
            <span>Дата</span>
            <AppDatePicker v-model="editForm.planDateNew"
                           :minDate="String(this.currentDate)"
                           :name="`date`"
            ></AppDatePicker>
          </div>

          <div class="input-row">
            <span>Время</span>
            <AppTimePicker v-model="editForm.planTimeNew"
                           :name="`time`"
                           style="margin-left: auto;"></AppTimePicker>
          </div>

        </InputRows>
        <div class="form__btns" style="margin-top: 30px;">
          <AppPrimaryBtn type="submit">Отправить</AppPrimaryBtn>
        </div>
      </AppForm>
    </AppDialog>
  </div>
</template>

<script>

import { deleteServiceApi, getServiceByIdApi } from '@/services/services_service'
import store from '@/store'
import AppImage from '@/components/UI/AppImage.vue'
import { getImageUrl } from '@/hooks/imageUrl'
import AppRadio from '@/components/UI/AppRadio.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import { getCreatorId } from '@/hooks/getServiceCreatorId'
import AppTabs from '@/components/UI/AppTabs.vue'
import {
  createPlanApi,
  deletePlanApi,
  getCurrentEntriesApi,
  getFreeWindowsApi,
  signUpPlanApi,
  updatePlanApi
} from '@/services/plans_service'
import AppDialog from '@/components/UI/AppDialog.vue'
import AppForm from '@/components/AppForm.vue'
import InputRows from '@/components/UI/InputRows.vue'
// import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import AppDatePicker from '@/components/UI/AppDateInput.vue'
import AppTimePicker from '@/components/UI/AppTimeInput.vue'
import { currentDate } from '@/hooks/currentDate'
import { currentTime } from '@/hooks/currentTime'
import { roundTime } from '@/hooks/roundTime'
import PlanList from '@/components/plans/Planslist.vue'
import router from '@/router/router'
import AppRedBtn from '@/components/UI/AppRedButton.vue'
import { dateToString } from '../../hooks/dateToString'

export default {
  components: { AppRedBtn, PlanList, AppTimePicker, AppDatePicker, InputRows, AppForm, AppDialog, AppTabs, AppPrimaryBtn, AppRadio, AppImage },
  data () {
    return {
      service: {
        image: String,
        createdAt: Date,
        updatedAt: Date,
        places: String,
        category: Object,
        duration: String,
        title: String,
        cost: String,
        description: String,
        author: {
          name: String,
          avatar: String
        }
      },
      isLoaded: false,
      selectedWindowId: '',
      creatorId: 0,
      planTabs: [
        { name: 'freeWindows', label: 'Свободные окна' },
        { name: 'currentEntries', label: 'Текущие записи' }
      ],
      selectedTab: { name: 'freeWindows', label: 'Свободные окна' },
      freeWindows: [],
      currentEntries: [],
      planDate: '',
      planTime: '',
      dialogVisibleCreate: false,
      dialogVisibleEdit: false,
      editForm: {
        planDateNew: '',
        planTimeNew: '',
        editedPlan: ''
      }
    }
  },
  mounted () {
    this.fetchServiceById()
    console.log(this.service)
    this.setCreatorId()
    this.fetchFreeWindows()
  },
  computed: {
    currentDate () {
      return currentDate
    },
    currentRoundedTime () {
      return roundTime(currentTime)
    },
    serviceId () {
      return Number(this.$route.params.id)
    },
    hasAllRights () {
      return store.getters['auth/getLoggedIn'] &&
        (store.getters['auth/getUserProfile'].id === this.creatorId || store.getters['auth/getUserProfile'].role === 'Admin')
    },
    role () {
      return store.getters['auth/getLoggedIn']
    },
    store () {
      return store
    },
    avatarUrl () {
      return getImageUrl(this.service.author.avatar)
    },
    infos () {
      return [
        { title: 'Место', value: this.service.places },
        { title: 'Языки', value: 'Русский' },
        { title: 'Категория', value: this.service.category.label },
        { title: 'Длительность', value: this.service.duration },
        { title: 'Последнее изменение', value: dateToString(this.service.updatedAt) },
        { title: 'Дата создания', value: dateToString(this.service.createdAt) }
      ]
    }
  },
  methods: {
    stringToDate: dateToString,
    async setCreatorId () {
      this.creatorId = await getCreatorId(this.serviceId)
    },
    async fetchServiceById () {
      this.service = await getServiceByIdApi(this.serviceId)
      this.isLoaded = true
    },
    async deleteService () {
      try {
        await deleteServiceApi(this.serviceId)
        this.$router.push('/profile')
      } catch (err) {
        alert('Не удалось удалить услугу.')
        this.$router.push('/services/' + this.serviceId)
        console.log(err)
      }
    },
    async fetchFreeWindows () {
      this.freeWindows = await getFreeWindowsApi(this.serviceId)
    },
    async fetchCurrentEntries () {
      this.currentEntries = await getCurrentEntriesApi(this.serviceId)
    },
    async changeTab (tab) {
      this.selectedTab = tab
      if (tab.name === 'freeWindows') {
        await this.fetchFreeWindows()
      }
      if (tab.name === 'currentEntries') {
        await this.fetchCurrentEntries()
      }
    },
    async createPlan () {
      // const payload = {
      //   idProduct: this.serviceId,
      //   dayTime: this.planDate + 'T' + this.planTime + ':00+07:00'
      // }
      const [year, month, day] = this.planDate.split('-')
      const [hours, minutes] = this.planTime.split(':')

      const payload = {
        idProduct: Number(this.serviceId),
        year: String(year),
        month: String(month),
        day: String(day),
        hours: String(hours),
        minutes: String(minutes)
      }
      console.log(payload)
      try {
        await createPlanApi(payload)
        this.dialogVisibleCreate = false
        await this.fetchFreeWindows()

        this.planTime = ''
        this.planDate = ''
      } catch (err) {
        alert('Не удалось добавить окно.')
        console.log(err)
      }
    },
    async signPlanUp () {
      if (store.getters['auth/getLoggedIn']) {
        try {
          await signUpPlanApi(this.selectedWindowId)
          await router.push('/records')
        } catch (err) {
          console.log(err)
          alert('Не удалось записаться на услугу')
        }
      } else await router.push('/login')
    },
    async removePlan (plan) {
      console.log('deleting')
      try {
        await deletePlanApi(plan.id)
        await this.fetchFreeWindows()
      } catch (err) {
        console.log(err)
        alert('Не удалось удалить запись')
      }
    },
    async openUpdateDialog (plan) {
      this.dialogVisibleEdit = true
      this.editForm.planDateNew = plan
      this.editForm.planTimeNew = plan
      this.editForm.editedPlan = plan

      // const data = await getFreeWindowsApi(this.serviceId)
      // const currentPlan = data.filter((item) => {
      //   return (item.record.id === plan.record.id)
      // })
      // console.log(...currentPlan)
    },
    async updatePlan () {
      console.log('updating')
      const [year, month, day] = this.editForm.planDateNew.split('-')
      const [hours, minutes] = this.editForm.planTimeNew.split(':')
      const payload = {
        year: String(year),
        month: String(month),
        day: String(day),
        hours: String(hours),
        minutes: String(minutes)
      }
      try {
        await updatePlanApi(Number(this.editForm.editedPlan.id), payload)
        this.dialogVisibleEdit = false
        this.editForm.planTimeNew = ''
        this.editForm.planDateNew = ''
        await this.fetchCurrentEntries()
        await this.fetchFreeWindows()
      } catch (err) {
        console.log(err)
        alert('Не удалось изменить запись')
      }
    }
  }
}
</script>

<style scoped lang="less">
.content-block {
  display: flex;
  //padding: 30px;
  //box-shadow: @box-shadow;

  &:not(:first-child) {
    margin-top: 40px;
  }
}

.user-group {
  display: flex;
  justify-content: space-between;
}

.user-avatar {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

p {
  color: @non-active-color
}

.user-group__text {
  > * {
    margin-top: 6px;
  }
}

.user-group__text__level {
  display: flex;
  align-items: end;

  > * {
    margin-right: 10px;
  }
}

.service-cost {
  padding: 8px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;
  color: @secondary-color
}

.details-windows-block-for-creator {
  height: max-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .details-block {
    height: 100%;
    display: inline-block;
    padding: 30px;
    box-shadow: @box-shadow;
    border-radius: @border-radius;

    > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.details-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 30px;
  box-shadow: @box-shadow;
  border-radius: @border-radius;
}

.details__item {

  > p {
    margin-bottom: 4px;
  }
}

.windows-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-shadow: @box-shadow;
  border-radius: @border-radius;
}

.windows__items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.windows-block__header {
  button, .tab-nav {
    width: 100%;
  }
}

.windows-block__tab-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tab-content__free-windows, .tab-content__current-entries {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    width: 100%;
  }

  p {
    margin-top: 20px;
  }
}

.free-windows__list, .current-entries__list{
  margin-top: 30px;
}

.tab-content__footer {
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  * {
    color: #8554D8;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  }
}

.input-row {
  display: grid;
  grid-template-columns: 20% 1fr;
  align-items: center;
  gap: 10px;
}

.service-card__content__cost {
  margin-top: auto;
  padding: 8px;
  max-width: 100%;
  width: fit-content;
  border-radius: @border-radius;
  border: 2px solid @secondary-color;
  background: rgba(133, 84, 216, 0.2);
  font-weight: 700;

  P {
    color: @secondary-color;
  }
}

.btns {
  margin-top: 40px;
  width: 300px;
}

</style>
