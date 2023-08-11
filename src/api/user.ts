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

  public create(
    account: string,
    nickname: string,
    email: string,
    password: string,
    gender: number,
    avatar: string,
    description: string
  ) {
    return request.put<Auth.User>('api/users/create', {
      account,
      nickname,
      email,
      password,
      gender,
      avatar,
      description
    })
  }

  /**
   * 更新用户
   * @param id 用户id
   * @param account 账号
   * @param nickname 昵称
   * @param email 邮箱
   * @param gender 性别
   * @param avatar  头像
   * @param description 描述
   * @param status 状态 0禁用 1正常
   */
  public update(
    id: number,
    account?: string,
    nickname?: string,
    email?: string,
    gender?: number,
    avatar?: string,
    description?: string,
    status?: number
  ) {
    return request.put('api/users/update', {
      id,
      account,
      nickname,
      email,
      gender,
      avatar,
      description,
      status
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
   * @param onlyTrashed 只限回收站
   * @param withTrashed 包含回收站
   * @returns
   */
  public all(
    page: number,
    limit: number,
    where?: any,
    onlyTrashed?: boolean,
    withTrashed?: boolean
  ) {
    return request.get<Auth.UserList>('api/users/all', {
      page,
      limit,
      where,
      onlyTrashed,
      withTrashed
    })
  }

  /**
   * 软删除（移到回收站）
   * @param ids 用户id列表
   */
  public remove(ids: number[]) {
    return request.delete<{ ids: number[] }>('api/users/remove', { ids })
  }

  /**
   * 真实删除
   * @param ids 用户id列表
   */
  public delete(ids: number[]) {
    return request.delete<{ ids: number[] }>('api/users/delete', { ids })
  }

  /**
   * 恢复用户
   * @param ids 用户id列表
   */
  public restore(ids: number[]) {
    return request.put<{ ids: number[] }>('api/users/restore', { ids })
  }
}

export const useUserApi = UserApi.getInstance()
