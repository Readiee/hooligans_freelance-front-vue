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
    const response = await axiosInstance.get('/products/plans/' + id)
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getCurrentEntriesApi (id) {
  try {
    const response = await axiosInstanceWithCookie.get('/products/plans/information/' + id)
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
    const response = await axiosInstanceWithCookie.patch('/plan/signup/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function cancelRecordApi (id) {
  try {
    const response = await axiosInstanceWithCookie.patch('/plan/cancel/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}
export async function getRecordsApi (userId) {
  try {
    const response = await axiosInstanceWithCookie.get('/users/my-records/' + userId)
    console.log(response)
    return response.data //
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function deletePlanApi (id) {
  try {
    const response = await axiosInstanceWithCookie.delete('/plan/delete/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function updatePlanApi (payload) {
  try {
    const response = await axiosInstanceWithCookie.patch('/plan/update/' + payload.planId, payload)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}
