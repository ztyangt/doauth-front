import Request from '@/utils/request'

/**
 * 安装引导API
 */
class InstallApi {
  private static instance: InstallApi
  private constructor() {}

  public static getInstance(): InstallApi {
    if (!InstallApi.instance) {
      InstallApi.instance = new InstallApi()
    }
    return InstallApi.instance
  }

  /**
   * 检查安装锁
   */
  public async check() {
    return await Request.get<any>('dev/install/check', 'get')
  }
}

export const useInstallApi = InstallApi.getInstance()
