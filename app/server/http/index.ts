import { RequstInterceptors } from './type'
import type { AxiosError } from 'axios'
import AxiosMax from "./Axios"
import { retry } from './axiosRetry'
import { checkErrorStatus } from './checkErrorStatus'

const _RequstInterceptors: RequstInterceptors = {
  requestInterceptors(config) {
    return config
  },
  requestInterceptorsCatch(err) {

    return err
  },
  responseInterceptor(config) {
    return config
  },
  responseInterceptorsCatch(axiosInstance, err: AxiosError) {
    checkErrorStatus(err.status as number, (message) => console.log(message))
    retry(axiosInstance, err as AxiosError)
    return err
  },
}

const useRequest = new AxiosMax({
  timeout: 5000,
  interceptors: _RequstInterceptors,
  abortRepetitiveRequest: true,
  retryConfig: {
    count: 5,
    waitTime: 1000
  }
})

export default useRequest