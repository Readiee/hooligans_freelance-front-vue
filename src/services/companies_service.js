import axios from 'axios'

const API_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosWithCookieInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include'
})

// Обновить аватар
export async function inviteEmployeeApi (payload) {
  try {
    const response = await axiosWithCookieInstance.post('/company/create_employee/' + payload.id, {
      email: payload.email
    })
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    alert(err.response.data.message)
  }
}
export async function getAllEmployeesApi (idCompany) {
  try {
    const response = await axiosInstance.get('company/allEmployee/' + idCompany)
    console.log(response)
    return response.data.employee
  } catch (err) {
    console.log(err)
    alert(err.response.data.message)
  }
}

export async function checkHashApi (payload) {
  try {
    const response = await axiosInstance.get('company/infoEmployee/', payload)
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    alert(err.response.data.message)
  }
}

export async function registerEmployeeApi (payload) {
  try {
    const response = await axiosInstance.post('company/registerEmployee', payload)
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    alert(err.response.data.message)
  }
}
