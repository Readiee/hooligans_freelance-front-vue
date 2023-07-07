import axios from 'axios'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosInstancePatch = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include'
})

// Получение информации о пользователе
export async function getUserProfileApi (id) {
  const response = await axiosInstance.get('users/' + id)
  console.log(response)
  return response
}

// Обновить аватар
export async function updateProfileAvatarApi (payload) {
  try {
    const response = await axiosInstancePatch.patch('users/awatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}

// Обновить текстовые данные
export async function updateProfileTextsApi (payload) {
  try {
    const response = await axiosInstancePatch.patch('users/update', payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}
