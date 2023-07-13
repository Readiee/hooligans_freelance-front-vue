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
        <!--        <div class="user-group__text__level">-->
        <!--          <p>{{ service.otsenka }}</p>-->
        <!--        </div>-->
        <div class="user-group__text__level">
          <AppPrimaryBtn
            v-if="hasRights"
            @click="this.$router.push('/services/' + service.id  + '/edit')"
            style="width: fit-content; margin-top: 15px;">
            Редактировать
          </AppPrimaryBtn>
        </div>
      </div>
    </section>

    <!--    Для других юзеров -->
    <section class="content-block details-block"
             v-if="!hasRights">
      <div class="details__item">
        <p>Место</p>
        <h3>{{ service.places }}</h3>
      </div>
      <div class="details__item">
        <p>Языки</p>
        <h3>{{ service.language }}Русский</h3>
      </div>
      <div class="details__item">
        <p>Категория</p>
        <h3>{{ service.category }}</h3>
      </div>
      <div class="details__item">
        <p>Длительность</p>
        <h3>{{ service.duration }}</h3>
      </div>
      <div class="details__item">
        <p>Последнее посещение</p>
        <h3>{{ service.updatedAt }}</h3>
      </div>
      <div class="details__item">
        <p>На портале с</p>
        <h3>{{ service.createdAt }}</h3>
      </div>
    </section>

    <!--    Для других юзеров -->
    <section class="content-block windows-block"
             v-if="!hasRights">
      <h2 style="margin-bottom: 30px;">Выберите сеанс</h2>
      <div class="windows__items">
        <app-radio v-for="window in freeWindows"
                   :key="window.record.id"
                   :label="window.datetime"
                   :value="window.record.id"
                   v-model="selectedWindowId">
        </app-radio>
      </div>
      <AppPrimaryBtn @click="signPlanUp"
                     style="width: fit-content; margin-top: 30px;">Записаться</AppPrimaryBtn>
    </section>

    <!--    Для админа и креатора-->
    <section class="content-block details-windows-block-for-creator"
             v-if="hasRights">
      <div class="details-block">
        <div class="details__item">
          <p>Место</p>
          <h3>{{ service.places }}</h3>
        </div>
        <div class="details__item">
          <p>Языки</p>
          <h3>{{ service.language }}Русский</h3>
        </div>
        <div class="details__item">
          <p>Категория</p>
          <h3>{{ service.category }}</h3>
        </div>
        <div class="details__item">
          <p>Длительность</p>
          <h3>{{ service.duration }}</h3>
        </div>
        <div class="details__item">
          <p>Последнее посещение</p>
          <h3>{{ service.updatedAt }}</h3>
        </div>
        <div class="details__item">
          <p>На портале с</p>
          <h3>{{ service.createdAt }}</h3>
        </div>
      </div>

      <div class="windows-block">
        <div class="windows-block__header">
          <AppTabs :names="planTabs"
                   :selectedTab="selectedTab"
                   @changeTab="changeTab"
                   class="tab-nav"></AppTabs>
        </div>

        <div class="windows-block__tab-content">

          <div v-if="selectedTab === 'freeWindows'" class="tab-content__free-windows">
            <div v-if="this.freeWindows.length > 0">
              <PlanList class="free-windows__list" :plans="freeWindows"></PlanList>
            </div>
            <p style="text-align: center" v-else>Нет сеансов.</p>
            <div class="tab-content__footer">
              <h4 v-if="hasRights"
                  @click="dialogVisible = true">+ Добавить окно</h4>
            </div>
          </div>

        </div>
      </div>
    </section>

<!--    Добавление окна -->
    <AppDialog v-model:show="dialogVisible">
      <AppForm @submit="createPlan" style="width: 400px;">
        <h2 style="margin-bottom: 30px;">Добавить окно</h2>
        <InputRows>
<!--          <div class="input-row">-->
<!--            <span>Дата</span>-->
<!--            <VueDatePicker v-model="planDate" locale="ru"></VueDatePicker>-->
<!--          </div>-->

          <div class="input-row">
            <span>Дата</span>
            <AppDatePicker v-model="planDate"
                           :minDate="String(this.currentDate)"
            ></AppDatePicker>
          </div>

          <div class="input-row">
            <span>Время</span>
            <AppTimePicker v-model="planTime"
                           :minTime="currentRoundedTime"></AppTimePicker>
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
import { createPlanApi, getCurrentEntriesApi, getFreeWindowsApi, signUpPlanApi } from '@/services/plans_service'
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

export default {
  components: { PlanList, AppTimePicker, AppDatePicker, InputRows, AppForm, AppDialog, AppTabs, AppPrimaryBtn, AppRadio, AppImage },
  data () {
    return {
      service: {
        id: Number,
        image: String,
        createdAt: String,
        updatedAt: String,
        places: String,
        category: String,
        duration: String,
        title: String,
        cost: String,
        description: String,
        authorId: Number,
        isPublished: Boolean,
        author: {
          name: String,
          awatar: String
        }
      },
      isLoaded: false,
      selectedWindowId: '',
      creatorId: 0,
      planTabs: [
        { name: 'freeWindows', label: 'Свободные окна' },
        { name: 'currentEntries', label: 'Текущие записи' }
      ],
      selectedTab: 'freeWindows',
      freeWindows: [],
      currentEntries: [],
      planDate: '',
      planTime: '',
      dialogVisible: false
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
    hasRights () {
      return (store.getters['auth/getUserProfile'].id === this.creatorId || store.getters['auth/getUserProfile'].role === 'Admin')
    },
    store () {
      return store
    },
    avatarUrl () {
      return getImageUrl(this.service.author.awatar)
    }
  },
  methods: {
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
        this.$router.push('/services')
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
    async changeTab (tabName) {
      this.selectedTab = tabName
      if (tabName === 'freeWindows') {
        await this.fetchFreeWindows()
      }
      if (tabName === 'currentEntries') {
        await this.fetchCurrentEntries()
      }
    },
    async createPlan () {
      // const payload = {
      //   idProduct: this.serviceId,
      //   dayTime: this.planDate + 'T' + this.planTime + ':00+07:00'
      // }
      const [year, month, day] = this.planDate.split('-')
      const [hours, minutes] = this.planTime.split('-')

      const payload = {
        idProduct: Number(this.serviceId),
        year: Number(year),
        month: Number(month),
        day: Number(day),
        hours: Number(hours),
        minutes: Number(minutes)
      }
      console.log(payload)
      try {
        await createPlanApi(payload)
        this.dialogVisible = false
        await this.fetchFreeWindows()
      } catch (err) {
        alert('Не удалось добавить окно.')
        console.log(err)
      }
    },
    async signPlanUp () {
      try {
        await signUpPlanApi(this.selectedWindowId)
      } catch (err) {
        console.log(err)
        alert('Не удалось записаться на услугу')
      }
    }
  }
}
</script>

<style scoped lang="less">
.content-block {
  margin-top: 40px;
  display: flex;
  //padding: 30px;
  //box-shadow: @box-shadow;
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
  grid-template-columns: repeat(5, 1fr);
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

.tab-content__free-windows {
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

.free-windows__list{
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
