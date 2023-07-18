import axios from 'axios'

const API_URL = 'http://localhost:3000/'

export const axiosInstance = axios.create({
  baseURL: API_URL
})

export const axiosInstanceWithCookie = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
