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
  public check() {
    return Request.get<any>('dev/install/check')
  }

  /**
   * 连接数据库
   * @param hostname 数据库地址
   * @param hostport 数据库端口
   * @param database 数据库名称
   * @param username 数据库用户名
   * @param password 数据库密码
   * @param prefix 数据表前缀
   * @returns
   */
  public connect(
    hostname: string,
    hostport: string | number,
    database: string,
    username: string,
    password: string,
    prefix: string
  ) {
    return Request.post<any>('dev/install/connect', {
      hostname,
      hostport,
      database,
      username,
      password,
      prefix
    })
  }

  /**
   * 初始化数据库
   * @returns
   */
  public init() {
    return Request.post<any>('dev/install/initdb')
  }

  /**
   * 创建管理员账户
   * @param account 管理员账户名
   * @param nickname 管理员昵称
   * @param email 邮箱
   * @param password 密码
   * @returns
   */
  public admin(account: string, nickname: string, email: string, password: string) {
    return Request.post<any>('dev/install/create', {
      account,
      nickname,
      email,
      password
    })
  }

  /**
   * 清空数据库配置
   * @returns
   */
  public rmconfig() {
    return Request.get<any>('dev/install/rmconfig')
  }

  /**
   * 安装上锁
   * @returns
   */
  public lock() {
    return Request.get<any>('dev/install/lock')
  }
}

export const useInstallApi = InstallApi.getInstance()
