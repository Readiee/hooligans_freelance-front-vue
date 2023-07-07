import router from '@/router/router'
import { authApi, getProfileApi, loginApi, logoutApi, registerApi } from '@/services/auth_service'

const state = () => ({
  loggedIn: false,
  userProfile: {
    id: 0,
    name: '',
    email: '',
    image: '',
    role: 'User'
  }
})

const getters = {
  getLoggedIn: state => state.loggedIn,
  getUserProfile: state => state.userProfile
}

const actions = {
  async register ({ commit }, payload) {
    try {
      const response = await registerApi(payload)
      console.log(response)
      alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
      await router.push('/login')
    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST') {
        // alert(err.message)
      }
      console.log(err)
      alert(err.message)
    }
  },

  async login ({ commit }, payload) {
    try {
      const response = await loginApi(payload)
      console.log(response)
      await router.push('/home')
    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST') {
        alert(err.message)
      }
      console.log(err)
    }
  },

  async auth ({ commit, dispatch }) {
    try {
      const response = await authApi()
      console.log(response)
      commit('setLoggedIn', true)
      commit('setUserProfile', response.data)
    } catch (err) {
      dispatch('logout')
      console.log(err)
    }
  },

  async logout ({ commit, dispatch }) {
    try {
      await logoutApi()
      await commit('setLoggedIn', false)
      const resetUser = {
        id: 0,
        name: '',
        email: '',
        image: '',
        role: 'User'
      }
      await commit('setUserProfile', resetUser)
      await router.push('/login')
    } catch (err) {
      console.log(err)
    }
  },

  async profileApi ({ commit }) {
    try {
      const response = await getProfileApi()
      console.log(response)
      commit('setUserProfile', response.data)
    } catch (err) {
      console.log(err)
    }
  }
}

const mutations = {
  setLoggedIn (state, data) {
    state.loggedIn = data
  },
  setUserProfile (state, data){
    state.userProfile = {
      id: data.id,
      name: data.name,
      email: data.email,
      image: `${API_URL}${data.awatar.substr(1)}`,
      role: data.role
    }
  }
}

const API_URL = 'http://localhost:3000'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
