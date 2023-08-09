/**
 * 用户API
 */
class UserApi {
  private static instance: UserApi
  private constructor() {}

  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi()
    }
    return UserApi.instance
  }

  /**
   * 获取指定用户
   * @param number 用户id
   * @returns
   */
  public one(id: number) {
    return request.get<Auth.User>('api/users/one', { id })
  }

  /**
   * 获取全部用户
   * @param page 分页
   * @param limit 限制
   * @param where 条件语句
   * @returns
   */
  public all(page: number, limit: number, where?: any) {
    return request.get<Auth.UserList>('api/users/all', { page, limit, where })
  }
}

export const useUserApi = UserApi.getInstance()
