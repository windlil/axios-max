import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'

/**
 *  axios实例配置选项，继承AxiosRequestConfig
 */
export interface AxiosOptions extends AxiosRequestConfig {
  // 是否直接返回data数据
  directlyGetData?: boolean
  // 定义拦截器
  interceptors?: RequstInterceptors
  // 是否取消重复请求
  abortRepetitiveRequest?: boolean
  // 重连配置
  retryConfig?: {
    // 重连次数
    count: number
    // 每次请求间隔时间
    waitTime: number
  }
}

/**
 *  定义拦截器抽象类，后续在index.ts文件中继承实现
 */
export abstract class RequstInterceptors {
  // 请求拦截器
  abstract requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  // 请求错误拦截器
  abstract requestInterceptorsCatch: (err: Error) => Error
  // 响应拦截器
  abstract responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // 响应错误拦截器
  abstract responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: AxiosError) => void;
}

/**
 *  定义返回类型 
 */
export interface Respones<T = any> {
  code: number
  result: T
}