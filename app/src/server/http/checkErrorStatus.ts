/**
 * 对错误状态码进行检测
 */
export function checkErrorStatus(status: number | undefined, message: string | undefined, callback: (errorMessage: string) => any) {
  let errorMessage = message ?? ''
  switch (status) {
    case 400:
      errorMessage = '客户端错误，请求格式或参数有误！'
      break
    case 401:
      errorMessage = '身份认证不通过'
      break
    case 403:
      errorMessage = '用户得到授权，但是访问是被禁止的!'
      break
    case 404:
      errorMessage = '未找到目标资源!'
      break
    case 500:
      errorMessage = '服务器错误!'
      break
    case 503:
      errorMessage = '服务器错误！'
      break
  }
  if (errorMessage.length > 0) {
    callback(`checkErrorStatus:${errorMessage}`)
  }
}