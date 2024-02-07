import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'

export interface AxiosOptions extends AxiosRequestConfig {
  directlyGetData?: boolean
  interceptors?: RequstInterceptors
  abortRepetitiveRequest?: boolean
  retryConfig?: {
    count: number
    waitTime: number
  }
}

export abstract class RequstInterceptors {
  abstract requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  abstract requestInterceptorsCatch: (err: Error) => Error
  abstract responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  abstract responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: AxiosError) => void;
}

/**
 *  定义返回类型 
 */
export interface Respones<T = any> {
  code: number
  result: T
}