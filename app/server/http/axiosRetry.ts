import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export function retry(instance: AxiosInstance, err: AxiosError) {
  const config: any = err.response?.config
  const { waitTime, count } = config.retryConfig ?? {}
  let currentCount = config.currentCount ?? 0
  if (currentCount > count) {
    return Promise.reject(err)
  }
  config.currentCount++
  return wait(waitTime).then(() => instance(config))
}

function wait(waitTime: number) {
  return new Promise(resolve => setTimeout(resolve, waitTime))
}