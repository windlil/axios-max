import type { AxiosOptions, RequstInterceptors, Respones } from './type'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import AbortAxios from './AbortAxios'

class AxiosMax {
  private axiosInstance: AxiosInstance
  private options: AxiosOptions
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
      responseInterceptorsCatch
    } = this.interceptors

    const abortAxios = new AbortAxios()

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 是否清除重复请求
      const abortRepetitiveRequest = (config as unknown as any)?.abortRepetitiveRequest ?? this.options.abortRepetitiveRequest
      if (abortRepetitiveRequest) {
        // 存储请求标识
        abortAxios.addPending(config)
      }
      if (requestInterceptors) {
        config = requestInterceptors(config)
      }
      return config
    }, requestInterceptorsCatch ?? undefined)

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      res && abortAxios.removePending(res.config)
      if (responseInterceptor) {
        // 清除重复请求
        res = responseInterceptor(res)
      }
      return res
    }, (err: AxiosError) => {
      if (responseInterceptorsCatch) {
        return responseInterceptorsCatch(this.axiosInstance, err)
      }
      return err
    })

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