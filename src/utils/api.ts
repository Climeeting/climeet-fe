import axios from 'axios'
import { isDevelop } from './env'

const api = axios.create({
  withCredentials: true,
  baseURL: isDevelop ? undefined : import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
