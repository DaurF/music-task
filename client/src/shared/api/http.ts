import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? '' : 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
})