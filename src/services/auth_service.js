import axios from 'axios'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Регистрация пользователя
export async function registerApi (payload) {
  try {
    return await axiosInstance.post('authentication/register', payload) // username, email, password
  } catch (err) {
    console.log(err)
  }
}

// Вход пользователя
export async function loginApi (payload) {
  try {
    return await axiosInstance.post('authentication/login', payload) // email, password
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Аутентификация пользователя
export async function authApi () {
  try {
    return await axiosInstance.get('authentication')
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Выход пользователя
export async function logoutApi () {
  try {
    return await axiosInstance.post('authentication/logout', {})
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Получение профиля пользователя
export async function getProfileApi () {
  try {
    return await axiosInstance.get('users/profile')
  } catch (err) {
    console.log(err)
    throw err
  }
}
