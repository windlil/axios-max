/**
 * 对错误状态码进行检测
 */
export function checkErrorStatus(status: number, callback: (errorMessage: string) => any) {
  let errorMessage = ''
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
  }
  if (errorMessage.length > 0) {
    callback(errorMessage)
  }
}