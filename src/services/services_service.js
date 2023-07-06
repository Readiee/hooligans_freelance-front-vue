import axios from 'axios'

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

// Получение услуг пользователя
export async function getUserProductsApi (id) {
  try {
    const response = await axiosInstance.get('users/' + id + '/products')
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Получение услуг других пользователей
export async function getServicesApi () {
  const response = await axiosInstance.get('/products')
  response.data = response.data.map(item => ({
    service: item.product,
    author: item.author
  }))
  console.log(response)
  console.log(response.data)
  return response.data
}

// Создание услуги
export async function createServiceApi (payload) {
  const response = await axiosInstancePost.post('products/add', payload) // title, cost, desc
  console.log(response)
  return response
}
