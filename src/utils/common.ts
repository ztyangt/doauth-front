// @ts-nocheck

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

// 进入全屏
function enterFullscreen() {
  const element = document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

// 退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

// 检查是否处于全屏状态
function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  )
}

/**
 * 切换全屏状态
 */
export const toggleFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
}
