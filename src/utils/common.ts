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
