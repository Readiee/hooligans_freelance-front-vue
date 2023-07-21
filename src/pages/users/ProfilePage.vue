<template>
  <div class="profile__container">
    <div class="profile__card">
      <div class="profile__img">
        <img :src="userProfile.image" class="img" alt="ava" />
      </div>
      <div class="profile__description">
        <h2>{{ userProfile.name }}</h2>
<!--        <p>{{ userProfile.hobby }} Графический дизайнер</p>-->
        <p>{{ userProfile.location }} Красноярск</p>
        <app-billet style="width: fit-content; margin-top: 5px">{{ role }}</app-billet>
      </div>
      <div class="edit__profile">
        <router-link to="/edit_profile">
          <app-secondary-btn style="margin-bottom: 20px;">Редактировать профиль</app-secondary-btn>
        </router-link>
      </div>
      <div class="profile__infr">
        <div v-for="infoPosition in infos" :key="infoPosition.title" class="profile__position">
          <p>{{ infoPosition.title }}</p>
          <h4>{{ infoPosition.value }}</h4>
        </div>
      </div>
    </div>

    <div class="profile__tabs-container">
      <AppTabs :names="tabs"
               :selectedTab="selectedTab"
               @changeTab="changeTab">
      </AppTabs>

      <div class="tab-content">

        <div v-if="selectedTab.name === 'jobs'">
          <p class="billet-block">Здесь могут быть ваши работы</p>
        </div>

        <div v-if="selectedTab.name === 'services'" class="tab-content__services">
          <ContentHeader>
            <template v-slot:start>
              <h2>Ваши услуги</h2>
            </template>
            <template v-slot:end>
              <router-link to="/services/create">
                <app-primary-btn v-if="role !== 'Сотрудник'" class="header__btns_btn">Создать новую услугу</app-primary-btn>
              </router-link>
            </template>
          </ContentHeader>
          <SearchInput v-model="servicesSearchQuery" style="height: 45px; margin-bottom: 20px;"></SearchInput>
          <div v-if="serviceCards.length > 0" class="content-block">
            <service-list class="services-list" :serviceCards="searchedCards"></service-list>
          </div>
          <p class="billet-block" v-else>Здесь могут быть ваши услуги</p>
        </div>

        <div v-if="selectedTab.name === 'reviews'">
          <p class="billet-block">Здесь могут быть отзывы о вас.</p>
        </div>

        <div v-if="selectedTab.name === 'clients'">
          <p class="billet-block">Здесь могут быть клиенты для которых вы выполняли работу.</p>
        </div>

        <div v-if="selectedTab.name === 'companies'">
          <ContentHeader>
            <template v-slot:start>
              <h2>Ваши сотрудники</h2>
            </template>
            <template v-slot:end>
              <app-primary-btn @click="inviteEmployeeDialogVisible = true">Добавить сотрудника</app-primary-btn>
            </template>
          </ContentHeader>

          <SearchInput v-model="employeesSearchQuery" style="height: 45px; margin-bottom: 20px;"></SearchInput>
          <div v-if="currentEmployees.length > 0" class="content-block">
            <employee-list :employees="searchedEmployees" @employeeFired="fetching"></employee-list>
          </div>
          <p v-else class="billet-block">У вашей компании пока нет сотрудников.</p>

          <ContentHeader style="margin-top: 60px;">
            <template v-slot:start>
              <h2>Приглашения</h2>
            </template>
            <template v-slot:end>
              <p>Ссылки-приглашения действуют 24 часа</p>
            </template>
          </ContentHeader>
          <SearchInput v-model="inviteSearchQuery" style="height: 45px; margin-bottom: 20px;"></SearchInput>
          <div v-if="currentInvites.length > 0" class="content-block">
            <invite-list :invites="searchedInvites"></invite-list>
          </div>
          <p v-else class="billet-block">Здесь будет список приглашенных сотрудников.</p>
        </div>

        <AppDialog v-model:show="inviteEmployeeDialogVisible">
          <AppForm @submit="inviteEmployee" style="width: 400px;">
            <h2 style="margin-bottom: 30px;">Добавить сотрудника</h2>
            <InputRows>
              <AppInput placeholder="Email"
                        v-model="inviteEmployeeForm.email"
                        rules="required|email"
                        name="employee_email"
                        type="text"/>
            </InputRows>
            <div class="form__btns" style="margin-top: 30px;">
              <AppPrimaryBtn type="submit">
                <span v-if="invitationIsSent">Отправить приглашение</span>
                <i v-else class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
              </AppPrimaryBtn>
            </div>
          </AppForm>
        </AppDialog>
      </div>
    </div>
  </div>
</template>

<script>
import AppTabs from '@/components/UI/AppTabs.vue'
import AppSecondaryBtn from '@/components/UI/AppSecondaryButton.vue'
import ServiceList from '@/components/services/ServiceList.vue'
import { computed, ref } from 'vue'
import store from '@/store'
import AppPrimaryBtn from '@/components/UI/AppPrimaryButton.vue'
import SearchInput from '@/components/UI/SearchInput.vue'
import { getUserServicesApi } from '@/services/users_service'
import AppBillet from '@/components/UI/AppBillet.vue'
import ContentHeader from '@/components/ContentHeader.vue'
import AppDialog from '@/components/UI/AppDialog.vue'
import AppForm from '@/components/AppForm.vue'
import InputRows from '@/components/UI/InputRows.vue'
import AppInput from '@/components/UI/AppInput.vue'
import { inviteEmployeeApi } from '@/services/companies_service'
import useCompanyEmployees from '@/hooks/companies/useCompanyEmployees'
import InviteList from '@/components/companies/InviteList.vue'
import EmployeeList from '@/components/companies/EmployeeList.vue'
// import router from '@/router/router'
// import { useRoute } from 'vue-router'
// import { getUserProfileApi, getUserServicesApi } from '@/services/users_service'

export default {
  name: 'ProfilePage',
  components: {
    EmployeeList,
    InviteList,
    AppInput,
    InputRows,
    AppForm,
    AppDialog,
    ContentHeader,
    AppBillet,
    SearchInput,
    AppPrimaryBtn,
    ServiceList,
    AppSecondaryBtn,
    AppTabs
  },
  setup () {
    // const route = useRoute();
    // const userId = route.params.id
    // const userId = store.getters['auth/getUserProfile'].id
    // const userProfile = getUserProfileApi()
    const userProfile = store.getters['auth/getUserProfile']

    const tabs = computed(() => {
      if (userProfile.role === 'Leader') {
        return [
          { name: 'jobs', label: 'Портфолио' },
          { name: 'services', label: 'Услуги' },
          { name: 'companies', label: 'Сотрудники' },
          { name: 'reviews', label: 'Отзывы' },
          { name: 'clients', label: 'Клиенты' }
        ]
      } else {
        return [
          { name: 'jobs', label: 'Портфолио' },
          { name: 'services', label: 'Услуги' },
          { name: 'reviews', label: 'Отзывы' },
          { name: 'clients', label: 'Клиенты' }
        ]
      }
    })
    const selectedTab = ref(tabs.value[0])

    const serviceCards = ref([])

    const fetchUserServices = async () => {
      const data = await getUserServicesApi(userProfile.id)
      data.forEach(item => {
        item.author = null
      })
      console.log(data)
      serviceCards.value = data
    }

    const changeTab = (tab) => {
      selectedTab.value = tab
      if (tab.name === 'services' && serviceCards.value.length === 0) {
        fetchUserServices()
        console.log(serviceCards.value)
      }
    }

    const servicesSearchQuery = ref('')

    const searchedCards = computed(() => {
      return serviceCards.value.filter(card => card.title.toLocaleLowerCase().includes(servicesSearchQuery.value.toLocaleLowerCase()))
    })

    const infos = computed(() => {
      const defaultPositions = [
        {
          title: 'Имя',
          value: userProfile.name
        },
        {
          title: 'Почта',
          value: userProfile.email
        }
      ]

      switch (userProfile.role) {
        case 'User':
          return [...defaultPositions]
        case 'Leader':
          return [...defaultPositions, ...[
            {
              title: 'О компании',
              value: userProfile.company.about
            } // aboutme
          ]]
        case 'Employee':
          return [...defaultPositions, ...[
            { title: 'Компания', value: userProfile.company.name }
          ]]
        default:
          return [...defaultPositions]
      }
    })

    const role = computed(() => {
      switch (userProfile.role) {
        case 'User':
          return 'Фрилансер'
        case 'Leader':
          return 'Компания'
        case 'Employee':
          return 'Сотрудник'
        case 'Admin':
          return 'Администратор'
        default:
          return false
      }
    })

    const inviteEmployeeForm = ref({
      email: ''
      // name: ''
    })
    const inviteEmployeeDialogVisible = ref(false)
    const companyId = userProfile.company ? userProfile.company.id : 0
    const invitationIsSent = ref(true)

    const inviteEmployee = async () => {
      invitationIsSent.value = false
      // const payload = JSON.stringify(forms.value.inviteEmployee)
      const payload = {
        id: companyId,
        email: inviteEmployeeForm.value.email
      }
      console.log(payload)
      try {
        const data = await inviteEmployeeApi(payload)
        console.log(data)
      } catch (err) {
        console.log(err)
      } finally {
        inviteEmployeeDialogVisible.value = false
        inviteEmployeeForm.value.email = ''
        invitationIsSent.value = true
        await fetching()
      }
    }

    const {
      fetching,
      currentEmployees,
      employeesSearchQuery,
      searchedEmployees,
      currentInvites,
      inviteSearchQuery,
      searchedInvites
    } = useCompanyEmployees(companyId)

    return {
      fetching,
      inviteEmployeeDialogVisible,
      inviteEmployee,
      inviteEmployeeForm,

      invitationIsSent,

      tabs,
      selectedTab,
      changeTab,

      userProfile,
      role,
      infos,

      serviceCards,
      servicesSearchQuery,
      searchedCards,

      currentEmployees,
      employeesSearchQuery,
      searchedEmployees,

      currentInvites,
      inviteSearchQuery,
      searchedInvites
    }
  }
}
</script>

<style lang="less" scoped>
.profile__container {
  display: grid;
  grid-template-columns: 450px 1fr;
}

.profile__card {
  height: fit-content;
  margin-right: 40px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: @border-radius;
  background-color: #fff;
  box-shadow: @box-shadow;

  * {
    width: 100%;
  }

  .profile__img {
    margin: 0;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}

p {
  font-size: @font-size-medium;
  color: @non-active-color
}

.profile__description {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: 5px;
  }
}

.edit__profile {
  margin-top: 30px;
}

.profile__infr {
  margin-top: 20px;
  width: 100%;
  justify-content: start;
  font-size: 18px;
}

.profile__position {
  &:not(:first-child) {
    margin-top: 15px;
  }

  h4 {
    //margin-top: 5px;
  }
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile__tabs-container {
  width: 100%;
}

.tab-content {
  margin-top: 20px;
  width: 100%;
  height: fit-content;
  background: none;

  //> div {
  //  p {
  //    padding: 30px;
  //    background-color: white;
  //    box-shadow: @box-shadow;
  //  }
  //}

  .billet-block {
    padding: 30px;
    background-color: white;
    box-shadow: @box-shadow;
  }
}

.tab-content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
}

.services-list {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.content-block {
  justify-content: start;
}

</style>
