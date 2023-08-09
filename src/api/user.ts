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
   * 登录
   * @param account 账户或邮箱
   * @param password 密码
   * @returns
   */
  public login(account: string, password: string) {
    return request.post<Auth.Login>('api/users/login', {
      account,
      password
    })
  }

  /**
   * 用户注册
   * @param account 账号
   * @param nickname 昵称
   * @param email 邮箱
   * @param password 密码
   * @param code 验证码
   */
  public register(
    account: string,
    nickname: string,
    email: string,
    password: string,
    code?: string
  ) {
    return request.post<Auth.Login>('api/users/register', {
      account,
      nickname,
      email,
      password,
      code
    })
  }

  /**
   * 更新用户
   * @param id 用户id
   * @param email 邮箱
   * @param nickname 昵称
   * @param gender 性别
   * @param description 描述
   * @param avatar 头像
   */
  public update(
    id: number,
    email?: string,
    nickname?: string,
    gender?: number,
    description?: string,
    avatar?: string
  ) {
    return request.put('api/users/update', {
      id,
      email,
      nickname,
      gender,
      description,
      avatar
    })
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
