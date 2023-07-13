import axios from 'axios'
import router from '@/router/router'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosInstancePost = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosInstancePatch = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include'
})

// Получение услуг других пользователей
export async function getServicesApi () {
  try {
    const response = await axiosInstance.get('/products')
    console.log(response.data)
    // response.data = response.data.map(item => ({
    //   service: item.element, // ПЕРЕИМЕНВОАТЬ В PRODUCT С НОВЫМ БЭКОМ
    //   author: item.author
    // }))
    console.log(response.data)
    return response.data
  } catch (err){
    // alert(err.message)
    console.log(err)
  }
}

export async function getServiceByIdApi (id) {
  try {
    const response = await axiosInstance.get('/products/' + id)
    console.log(response)
    return response.data
  } catch (err){
    // alert(err.message)
    console.log(err)
    await router.push('/notfound')

    // if (err.response.status === 400){
    // }
  }
}

// Создание услуги
export async function createServiceApi (payload) {
  try {
    const response = await axiosInstancePost.post('products/add', payload) // title, cost, desc
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    // alert(err.message)
  }
}

export async function updateServiceApi (id, payload) {
  try {
    const response = await axiosInstancePatch.patch('products/update/' + id, payload)
    console.log(response)
    return response.data
  } catch (err){
    console.log(err)
    // alert(err.message)
    await router.push('/services/' + id)
    throw err
  }
}

export async function deleteServiceApi (id) {
  try {
    const response = await axiosInstancePost.post('products/delete/' + id)
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}
