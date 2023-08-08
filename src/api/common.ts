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
   * 登录
   * @param account 账户或邮箱
   * @param password 密码
   * @returns
   */
  public login(account: string, password: string) {
    return request.post<Auth.Login>('api/comm/login', {
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
    return request.post<Auth.Login>('api/comm/register', {
      account,
      nickname,
      email,
      password,
      code
    })
  }

  /**
   * 发送邮件
   * @param host 邮件服务器地址
   * @param port 邮件服务端口
   * @param account 发信邮件账号
   * @param password 服务密码
   * @param subject 邮件主题
   * @param nickname 发信昵称
   * @param content 邮件正文
   * @param receive 收信邮箱
   */
  public email(
    host: string,
    port: number,
    account: string,
    password: string,
    subject: string,
    nickname: string,
    content: string,
    receive: string
  ) {
    return request.post('api/comm/send-email', {
      host,
      port,
      account,
      password,
      subject,
      nickname,
      content,
      receive
    })
  }
}

export const useCommApi = CommApi.getInstance()
