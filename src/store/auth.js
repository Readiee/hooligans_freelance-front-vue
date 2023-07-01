import axios from 'axios'
import router from '@/router/router'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const API_URL = 'http://localhost:3000/'
const accessToken = cookies.get('accessToken')
// const accessToken = ''
console.log(`accessToken: ${accessToken}`)

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
  async registerApi ({ commit }, user) {
    const response = axios.post(API_URL + 'users/register', user)
      .catch((err) => {
        alert(err)
        console.log(err)
      })
    if (response && response.data) {
      alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
      await router.push('/login')
      console.log(response.data)
    }
  },

  // надо ли отправлять cookie при login?
  async loginApi ({ commit }, payload) {
    // const config = { withCredentials: true, credentials: 'include' }
    const response = await axios
      .post(API_URL + 'auth/login', payload)
      .catch((err) => {
        // alert('Login Error')
        console.log(err)
      })

    if (response && response.data) {
      console.log(response.data.accessToken)
      // cookies.set('accessToken', response.headers.getAuthorization())
      cookies.set('accessToken', response.data.accessToken)
      console.log(cookies.get('accessToken'))
      commit('setLoggedIn', true)
    }
  },

  async accessApi ({ commit, dispatch }) {
    if (accessToken) {
      try {
        const response = await axios.post(API_URL + 'auth/access', {}, {
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
          }
        })
        if (response && response.data) {
          commit('setLoggedIn', true)
          commit('setUserProfile', response.data)
        } // else
      } catch (err) {
        commit('setLoggedIn', false)
        dispatch('userLogout')
        console.log(err)
      }
    }
  },

  async userLogout ({ commit }){
    cookies.remove('accessToken')
    await commit('setLoggedIn', false)
    const resetUser = {
      id: 0,
      name: '',
      email: ''
    }
    await commit('setUserProfile', resetUser)
  },

  async userProfile ({ commit }){
    const response = await axios
      .get(API_URL + 'users/profile', {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
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
