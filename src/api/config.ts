/**
 * 配置API
 */
class ConfigApi {
  private static instance: ConfigApi
  private constructor() {}

  public static getInstance(): ConfigApi {
    if (!ConfigApi.instance) {
      ConfigApi.instance = new ConfigApi()
    }
    return ConfigApi.instance
  }

  /**
   * 获取指定配置
   * @param key 配置键
   * @returns
   */
  public one(key: string) {
    return request.get<Auth.Config<any>>('api/config/one', { key })
  }

  /**
   * 获取配置列表
   * @returns
   */
  public list() {
    return request.get<Auth.Config<any>[]>('api/config/list')
  }

  /**
   * 保存配置
   * @param key 配置键 存在则更新，不存在则新建
   * @param value 配置值
   * @param json 配置json
   * @param text 文本数据
   * @param remark 备注
   */
  public save(key?: string, value?: string, json?: any, text?: string, remark?: string) {
    return request.post<Auth.SaveResult>('api/config/save', {
      key,
      value,
      json,
      text,
      remark
    })
  }
}

export const useConfigApi = ConfigApi.getInstance()
