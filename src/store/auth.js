import axios from 'axios'
import router from '@/router/router'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const API_URL = 'http://localhost:3000/'
const token = cookies.get('token')
console.log(`Token: ${token}`)

const state = () => ({
  loggedIn: false,
  userProfile: {
    id: 0,
    username: '',
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
    await axios.post(API_URL + 'auth/register', user)
      .then((response) => {
        if (response && response.data) {
          router.push('/login')
          alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
          console.log(response.data)
        }
      }).catch((err) => {
        alert('Register Error')
        console.log(err)
      })
  },

  async loginApi ({ commit }, payload) {
    const response = await axios
      .post(API_URL + 'auth/login', payload)
      .catch((err) => {
        alert('Login Error')
        console.log(err)
      })

    if (response && response.data) {
      // cookies.set('token', response.headers.getAuthorization())
      cookies.set('token', response.data.token)
      commit('setLoggedIn', true)
    } else {
      commit('setLoggedIn', false)
    }
  },

  // надо просить isTokenValid c бэка
  async accessApi ({ commit }) {
    if (token) {
      await axios.post(API_URL + '/auth/access', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response && response.data.isTokenValid) {
            commit('setLoggedIn', true)
          } else {
            commit('setLoggedIn', false)
          }
        }).catch((err) => {
          commit('setLoggedIn', false)
          console.log(err)
        })
    } else {
      commit('setLoggedIn', false)
    }
  },

  async userProfile ({ commit }){
    const response = await axios
      .get(API_URL + '/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch((err) => {
        console.log(err)
      })

    if (response && response.data){
      commit('setUserProfile', response.data)
    }
  },

  async userLogout ({ commit }){
    cookies.remove('token')
    commit('setLoggedIn', false)
    const resetUser = {
      id: 0,
      username: '',
      email: ''
    }
    commit('setUserProfile', resetUser)
  }
}

const mutations = {
  setLoggedIn (state, data) {
    state.loggedIn = data
  },
  setUserProfile (state, data){
    state.userProfile = {
      id: data.id,
      username: data.username,
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
