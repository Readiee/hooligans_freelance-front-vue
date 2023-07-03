import axios from 'axios'
import router from '@/router/router'

const API_URL = 'http://localhost:3000/'
// const accessToken = ''
// const accessToken = cookies.get('accessToken')

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
    await axios
      .post(API_URL + 'authentication/register', payload) // name, email, password
      .then((response) => {
        console.log(response)
        alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
        router.push('/login')
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST') alert('Данная почта уже занята.')
        console.log(err)
      })
  },

  // надо ли отправлять cookie при login?
  // как правильно сохранять куку из хедеров?
  async loginApi ({ commit }, payload) {
    const response = await axios
      .post(API_URL + 'authentication/login', payload, // email, password
        {
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .catch((err) => {
        // alert('Login Error: ' + err)
        console.log(err)
      })

    if (response && response.data) {
      router.push('/home')
    }
  },

  async accessApi ({ commit, dispatch }) {
    try {
      const response = await axios
        .get(API_URL + 'authentication', {
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      if (response && response.data) {
        console.log(response)
        commit('setLoggedIn', true)
        commit('setUserProfile', response.data)
      } // else
    } catch (err) {
      console.log(err)
    }
  },

  async logoutApi ({ commit, dispatch }){
    try {
      const response = await axios
        .post(API_URL + 'authentication/logout', {}, {
          withCredentials: true, credentials: 'include'
        })
      if (response) {
        await commit('setLoggedIn', false)
        const resetUser = {
          id: 0,
          name: '',
          email: ''
        }
        await commit('setUserProfile', resetUser)
        router.push('/login')
      }
    } catch (err) {
      console.log(err)
    }
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
