import axios from 'axios'
import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { appConfig } from './env.config'
import { authSignal } from '../store/auth.store'

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authSignal.value.token

  if (token) {
    const headers = (config.headers ?? {}) as AxiosRequestHeaders
    ;(headers as AxiosRequestHeaders & { Authorization?: string }).Authorization = `Bearer ${token}`
    config.headers = headers
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle global errors (401/403/500) and maybe trigger logout
    return Promise.reject(error)
  },
)
