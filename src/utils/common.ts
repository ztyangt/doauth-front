/**
 * 网络请求提示
 * @param response  网络响应
 * @param success_msg 成功提示
 * @param error_msg 失败提示
 */
export const netMessage = (response: RES<any>, success_msg?: string, error_msg?: string) => {
  if (response.code === 200) {
    ElMessage.success(success_msg ? success_msg : response.msg)
  } else {
    ElMessage.error(error_msg ? error_msg : response.msg)
  }
}

/**
 * 多层对象赋值
 * @param obj 目标对象
 * @param key 键
 * @param value 值
 */
export const setNestedValue = (obj: any, key: string | number, value: any) => {
  for (const prop in obj) {
    if (prop === key) {
      obj[prop] = value
      return
    }
    if (typeof obj[prop] === 'object') {
      setNestedValue(obj[prop], key, value)
    }
  }
}
