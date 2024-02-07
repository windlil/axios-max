import { AxiosRequestConfig } from "axios"

/**
 * 用于存储控制器
 */
const pendingMap = new Map<string, AbortController>()

/**
 * 创建各请求唯一标识
 * @param config 
 * @returns 
 */
const getUrl = (config: AxiosRequestConfig) => {
  return [config.url, config.method].join(':')
}

class AbortAxios {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getUrl(config)
    const abortController = new AbortController()
    config.signal = abortController.signal
    if (!pendingMap.has(url)) {
      pendingMap.set(url, abortController)
    }
  }

  removePending(config: AxiosRequestConfig) {
    const url = getUrl(config)
    if (pendingMap.has(url)) {
      const abortController = pendingMap.get(url)
      abortController?.abort()
      pendingMap.delete(url)
    }
  }

  removeAllPending() {
    pendingMap.forEach((abortController) => {
      abortController.abort()
    })
    this.clear()
  }

  clear() {
    pendingMap.clear()
  }
}

export default AbortAxios