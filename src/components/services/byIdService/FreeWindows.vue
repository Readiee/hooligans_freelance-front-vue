<template>
  <section class="content-block windows-block" v-if="!hasRights">
    <h2 style="margin-bottom: 30px;">Свободные окна</h2>
    <div class="windows__items" v-if="freeWindows.length > 0">
      <app-radio
          v-for="window in freeWindows"
          :key="window.id"
          :label="stringToDate(window.datetime)"
          :value="String(window.id)"
          :checked="selectedWindowId === String(window.id)"
          @change="onWindowSelected(window.id)"
      />
    </div>
    <p v-else>Пока что нет свободных окон для записи.</p>
    <AppPrimaryBtn @click="signPlanUp" v-if="freeWindows.length > 0" style="width: fit-content; margin-top: 30px; margin-left: auto;" :disabled="!selectedWindowId" :class="{ disabled: !selectedWindowId }">
      Записаться
    </AppPrimaryBtn>
  </section>
</template>

<script>
import { dateToString } from '@/hooks/dateToString'
import { getCreatorId } from '@/hooks/getServiceCreatorId'
import store from '@/store'
import { signUpPlanApi } from '@/services/plans_service'
import router from '@/router/router'
import AppRadio from '@/components/UI/AppRadio.vue'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'

export default {
  components: { AppRadio, AppPrimaryBtn },
  props: {
    hasRights: {
      type: Boolean,
      required: true
    },
    freeWindows: {
      type: Array,
      required: true
    },
    selectedWindowId: {
      type: String,
      required: true
    }
  },
  methods: {
    stringToDate: dateToString,
    async setCreatorId () {
      this.creatorId = await getCreatorId(this.serviceId)
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
    onWindowSelected (windowId) {
      this.$emit('update:selectedWindowId', windowId)
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
.windows-block {
  height: 100%;
  display: inline-block;
  padding: 30px;
  box-shadow: @box-shadow;
  border-radius: @border-radius;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
}
.windows__items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
</style>
