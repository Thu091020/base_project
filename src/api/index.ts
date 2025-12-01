/* Base HTTP client for features
 * - Uses shared axios instance from config/axios.config.ts
 * - Normalizes error shape (ErrorData)
 * - Provides typed get/post/put/patch/delete helpers
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiClient } from '../config/axios.config'

export interface ErrorData extends Error {
  httpStatus?: number
  code?: string
  requestId?: string
  originalError?: unknown
}

export class HttpClient {
  private readonly instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
    this.initializeInterceptors()
  }

  private initializeInterceptors() {
    this.instance.interceptors.response.use(this.handleResponse, this.handleResponseError)
  }

  private handleResponse = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response
  }

  private handleResponseError = (error: unknown): Promise<never> => {
    if (!error || typeof error !== 'object') {
      return Promise.reject(error)
    }

    const anyError = error as { response?: AxiosResponse; config?: AxiosRequestConfig; message?: string }
    const response = anyError.response
    const config = anyError.config
    const status = response?.status
    const data = (response?.data ?? {}) as { code?: string; message?: string }

    const errorData: ErrorData = {
      name: 'HTTP_ERROR',
      message: data.message ?? anyError.message ?? 'Unexpected error',
      httpStatus: status,
      code: data.code,
      requestId: (config?.headers as Record<string, unknown> | undefined)?.['x-request-id'] as string | undefined,
      originalError: error,
    }

    return Promise.reject(errorData)
  }

  // ----- Typed helpers returning full AxiosResponse -----

  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config)
  }

  public post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config)
  }

  public put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config)
  }

  public patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config)
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config)
  }
}

// Shared instance that all features should use
export const httpClient = new HttpClient(apiClient)


