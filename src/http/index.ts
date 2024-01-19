import axios from 'axios'

const $host = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

export { $host }
