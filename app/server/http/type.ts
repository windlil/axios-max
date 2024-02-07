import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'

export interface AxiosOptions extends AxiosRequestConfig {
  interceptors?: RequstInterceptors
  abortRepetitiveRequest?: boolean
  retryConfig?: {
    count: number
    waitTime: number
  }
}

export abstract class RequstInterceptors {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch: (err: Error) => Error
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: AxiosError) => void;
}

/**
 *  定义返回类型 
 */
export interface Respones<T = any> {
  code: number
  result: T
}