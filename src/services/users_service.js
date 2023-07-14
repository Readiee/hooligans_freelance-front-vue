import axios from 'axios'
import store from '@/store'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosInstancePatch = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include'
})

// Обновить аватар
export async function updateProfileMainInfoAvatarApi (payload) {
  try {
    const response = await axiosInstancePatch.patch('users/avatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    await store.dispatch('auth/auth')
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}

// Обновить текстовые данные
export async function updateProfileMainInfoTextsApi (payload) {
  try {
    const response = await axiosInstancePatch.patch('users/update', payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    await store.dispatch('auth/auth')
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}

export async function updateProfileAboutMeApi (payload) {
  try {
    const response = await axiosInstancePatch.patch('users/update/aboutme', payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    await store.dispatch('auth/auth')
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}

// Получение информации о пользователе
export async function getUserProfileApi (id) {
  try {
    const response = await axiosInstance.get('users/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}

// Получение услуг пользователя
export async function getUserServicesApi (id) {
  try {
    const response = await axiosInstance.get('users/products/' + id)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}
