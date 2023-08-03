/**
 * 公共API
 */
class CommApi {
  private static instance: CommApi
  private constructor() {}

  public static getInstance(): CommApi {
    if (!CommApi.instance) {
      CommApi.instance = new CommApi()
    }
    return CommApi.instance
  }

  /**
   * 管理员登录
   * @param account 管理员账户或邮箱
   * @param password 管理员密码
   * @returns
   */
  public login(account: string, password: string) {
    return request.post<any>('api/comm/login', {
      account,
      password
    })
  }
}

export const useCommApi = CommApi.getInstance()
