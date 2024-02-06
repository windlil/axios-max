import type { AxiosOptions, RequstInterceptors, Respones } from './type'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

class AxiosMax {
  private axiosInstance: AxiosInstance
  private options
  private interceptors: RequstInterceptors | undefined
  constructor(options: AxiosOptions) {
    this.axiosInstance = axios.create(options)
    this.options = options
    this.interceptors = options.interceptors
    this.setInterceptors()
  }

  /**
   * 注册拦截器方法
   */
  setInterceptors() {
    if (!this.interceptors) return

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptor,
      responseInterceptorCatch
    } = this.interceptors

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (requestInterceptors) {
        config = requestInterceptors(config)
      }
      return config
    }, requestInterceptorsCatch ?? undefined)

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      if (responseInterceptor) {
        res = responseInterceptor(res)
      }
      return res
    }, responseInterceptorCatch ?? undefined)

  }

  /**
   * 统一请求方法
   */
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<Respones>>(config).then((res) => {
        return resolve(res as unknown as Promise<T>)
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default AxiosMax