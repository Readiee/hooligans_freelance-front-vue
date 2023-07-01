import axios from 'axios'
import router from '@/router/router'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const API_URL = 'http://localhost:3000/'
// const accessToken = ''
const accessToken = cookies.get('accessToken')

const state = () => ({
  loggedIn: false,
  userProfile: {
    id: 0,
    name: '',
    email: ''
  }
})

const getters = {
  getLoggedIn (state) {
    return state.loggedIn
  },
  getUserProfile (state){
    return state.userProfile
  }
}

const actions = {
  async registerApi ({ commit }, payload) {
    const response = axios
      .post(API_URL + 'users/register', payload) // name, email, password
      .catch((err) => {
        alert(err)
        console.log(err)
      })
    if (response && response.data) {
      alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
      await router.push('/login')
    }
  },

  // надо ли отправлять cookie при login?
  // как правильно сохранять куку из хедеров?
  async loginApi ({ commit }, payload) {
    const response = await axios
      .post(API_URL + 'auth/login', payload, // email, password
        { withCredentials: true, credentials: 'include' }
      )
      .catch((err) => {
        // alert('Login Error: ' + err)
        console.log(err)
      })

    if (response && response.data) {
      const cookiesArray = response.headers.cookie.split('; ')
      cookiesArray.forEach(cookie => {
        const [name, value] = cookie.split('=')
        cookies.set(name, value)
      })
      // cookies.set('accessToken', response.headers.cookie) // cookie header title
      // commit('setLoggedIn', true)
    }
  },

  async accessApi ({ commit, dispatch }) {
    if (accessToken) {
      try {
        const response = await axios
          .post(API_URL + 'auth/access', {}, {
            withCredentials: true, credentials: 'include'
          })
        if (response && response.data) {
          commit('setLoggedIn', true)
          commit('setUserProfile', response.data)
        } // else
      } catch (err) {
        dispatch('userLogout')
        console.log(err)
      }
    }
  },

  async logoutApi ({ commit }){
    cookies.remove('accessToken')
    await commit('setLoggedIn', false)
    const resetUser = {
      id: 0,
      name: '',
      email: ''
    }
    await commit('setUserProfile', resetUser)
  },

  async profileApi ({ commit }){
    const response = await axios
      .get(API_URL + 'users/profile', {
        withCredentials: true, credentials: 'include'
      })
      .catch((err) => {
        console.log(err)
      })

    if (response && response.data){
      commit('setUserProfile', response.data)
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
      email: data.email
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
