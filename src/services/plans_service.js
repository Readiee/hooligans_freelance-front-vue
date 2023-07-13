import axios from 'axios'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosInstanceWithCookie = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getFreeWindowsApi (id) {
  try {
    const response = await axiosInstance.get('/products/' + id + '/plans')
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getCurrentEntriesApi (id) {
  try {
    const response = await axiosInstanceWithCookie.get('/products/' + id + '/plans/information')
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function createPlanApi (payload) {
  try {
    const response = await axiosInstanceWithCookie.post('/plan/create', payload)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function signUpPlanApi (id) {
  try {
    const response = await axiosInstanceWithCookie.patch('/plan/singup/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}
export async function getRecordsApi () {
  try {
    const response = await axiosInstanceWithCookie.get('/users/my-records')
    console.log(response)
    return response.data //
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function deletePlanApi (id) {
  try {
    const response = await axiosInstanceWithCookie.delete('/plans/delete/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}
