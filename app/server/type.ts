import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosOptions extends AxiosRequestConfig {
  interceptors?: RequstInterceptors
}

export abstract class RequstInterceptors {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch: (err: Error) => Promise<any>
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: Error) => Promise<any>
}

/**
 *  定义返回类型 
 */
export interface Respones<T = any> {
  code: number
  result: T
}