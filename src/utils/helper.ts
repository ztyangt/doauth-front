/* eslint-disable no-prototype-builtins */
/**
 * @name 助手类
 * @author 相左
 * @link https://www.ztyang.com
 * @version 1.0.0
 */
class Helper {
  private static instance: Helper
  private constructor() {}

  /**
   * 获取单例对象
   */
  public static getInstance(): Helper {
    if (!Helper.instance) {
      Helper.instance = new Helper()
    }
    return Helper.instance
  }

  public is = {
    empty: (value: any) => this.isEmpty(value),
    NULL: (value: any) => this.isNull(value),
    today: (value: number) => this.isToday(value)
  }

  public get = {
    storage: (key: string) => this.getStorage(key),
    cookie: (name: string) => this.getCookie(name),
    session: (namespace: string, key: string, value?: any) =>
      this.getSession(namespace, key, value),
    random: {
      num: (min: number, max: number) => this.getRandomNum(min, max)
    },
    os: (agent: string) => this.getOS(agent),
    randstring: (len: number) => this.generateRandomString(len),
    zeroStamp: () => this.getTodayZeroTimestamp()
  }

  public set = {
    storage: (key: string, value: any) => this.setStorage(key, value),
    cookie: (name: string, value: any, secs?: number, path?: string) =>
      this.setCookie(name, value, secs, path),
    session: (namespace: string, key: string, value: any) => this.setSession(namespace, key, value),
    copy: (text: string, remark: string) => this.setCopyText(text, remark)
  }

  public has = {
    storage: (key: string) => this.hasStorage(key),
    cookie: (key: string) => this.hasCookie(key),
    session: (key: string) => this.hasSession(key)
  }

  public clear = {
    cookie: (name: string) => this.clearCookie(name),
    storage: (key: string) => this.clearStorage(key),
    session: (namespace: string, key: string) => this.clearSession(namespace, key)
  }

  public time = {
    nature: (timestamp: number, type: string) => this.natureTime(timestamp, type),
    to: {
      date: (unixTime: number, type: string) => this.timeToDate(unixTime, type)
    }
  }

  private isEmpty(value: any = null) {
    let result = false
    if (Array.isArray(value)) {
      if (value.length === 0) {
        result = true
      }
    } else if (typeof value === 'number') {
      result = isNaN(value)
    } else if (value === null || value === undefined) {
      result = true
    } else {
      if (value instanceof Object) {
        if (JSON.stringify(value) === '{}') {
          result = true
        }
      } else if (typeof value === 'string') {
        if (value.trim().length === 0) {
          result = true
        }
      }
    }
    return result
  }

  private generateRandomString(length: number): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  private getTodayZeroTimestamp(): number {
    const currentDate = new Date()

    // 将时间设置为零点
    currentDate.setHours(0, 0, 0, 0)

    // 获取零点时间的时间戳
    const timestamp = currentDate.getTime()

    return timestamp
  }
  private isNull(value: any = '') {
    let result = false
    if (value == null || typeof value == 'undefined' || value === undefined || value.length === 0)
      result = true
    else result = false
    return result
  }

  /**
   * 判断时间戳是否是今日
   * @param timestamp 需要判断的时间戳
   * @returns
   */
  private isToday(timestamp: number): boolean {
    const currentDate: Date = new Date()
    const targetDate: Date = new Date(timestamp)

    // 获取当前日期的年、月和日
    const currentYear: number = currentDate.getFullYear()
    const currentMonth: number = currentDate.getMonth()
    const currentDay: number = currentDate.getDate()

    // 获取时间戳对应日期的年、月和日
    const targetYear: number = targetDate.getFullYear()
    const targetMonth: number = targetDate.getMonth()
    const targetDay: number = targetDate.getDate()

    // 比较年、月和日是否相同
    if (currentYear === targetYear && currentMonth === targetMonth && currentDay === targetDay) {
      return true
    } else {
      return false
    }
  }

  private getRandomNum(min: number = 0, max: number = 100) {
    const range = max - min
    const rand = Math.random()
    const result = min + Math.round(rand * range)
    return result
  }

  private async fetchGet(url: string, params: any = {}, config: any = {}) {
    const response = await fetch(
      url + (this.isEmpty(params) ? '' : '?' + this.stringfy(params)),
      config
    )
    return await response.json()
  }

  public stringfy(obj: any) {
    const s: string[] = [],
      add = (key: string, value: any) => {
        value = encodeURIComponent(value) == 'undefined' ? '' : value
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
      }
    if (Array.isArray(obj)) for (const v in obj) add(v, obj[v])
    else
      for (const prefix in obj) {
        this.stringfyBuild(prefix, obj[prefix], add)
      }
    return s.join('&')
  }

  private stringfyBuild(prefix: string, obj: any, add: any) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        this.stringfyBuild(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i], add)
      }
    } else if (typeof obj == 'object') {
      for (const name in obj) {
        this.stringfyBuild(prefix + '[' + name + ']', obj[name], add)
      }
    } else add(prefix, obj)
  }

  private getOS(agent: string): string {
    let os = ''
    const userAgent = agent.toLowerCase()

    if (userAgent.indexOf('windows nt') !== -1) {
      os = 'Windows'
    } else if (userAgent.indexOf('mac os x') !== -1) {
      os = 'Mac OS X'
    } else if (userAgent.indexOf('linux') !== -1) {
      os = 'Linux'
    } else if (userAgent.indexOf('android') !== -1) {
      os = 'Android'
    } else if (userAgent.indexOf('ios') !== -1) {
      os = 'iOS'
    } else {
      os = 'Unknown'
    }

    return os
  }

  /**
   * 获取本地存储中的数据
   * @param key 键值
   * @returns 返回查询到的数据或 false
   */
  private getStorage(key: string): any {
    let result: any = false
    const time = Math.round(new Date().getTime() / 1000)
    if (this.isEmpty(key)) {
      console.warn('请输入需要查询的 key!')
    } else {
      const storage = localStorage.getItem(key)
      if (!this.isEmpty(storage) && storage !== null) {
        result = JSON.parse(storage)
        if (
          result.hasOwnProperty('end_time') &&
          !this.isEmpty(result.end_time) &&
          result.end_time <= time
        ) {
          result = false
        } else {
          result = result.value
        }
      }
    }
    return result
  }

  private setStorage(key: string, value: any) {
    let result = false
    if (this.isEmpty(key)) console.warn('请输入需要存储的key名称！')
    else {
      const storage = localStorage.getItem(key) || '{}'
      let storageJson = JSON.parse(storage)
      let endTime: number = 0
      if (value.hasOwnProperty('time')) {
        endTime = Number(value.time) + Math.round(Number(new Date()) / 1000)
        delete value.time
        storageJson = {
          value,
          end_time: endTime
        }
      } else {
        storageJson = {
          value
        }
      }

      localStorage.setItem(key, JSON.stringify(storageJson))
      result = true
    }
    return result
  }

  private hasStorage(key: string) {
    let result = false
    const storage = this.getStorage(key)
    if (!this.isEmpty(storage)) result = true
    return result
  }

  private clearStorage(key: string) {
    localStorage.removeItem(key)
  }

  private getCookie(name: string) {
    let result = ''
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(name + '=')
      if (c_start != -1) {
        c_start = c_start + name.length + 1
        let c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        result = decodeURIComponent(document.cookie.substring(c_start, c_end))
      }
    }
    return result
  }

  /**
   * @name 设置cookie
   * @param {string} name
   * @param {string} value
   * @param {number} secs 单位秒
   * @param {string} path
   */
  private setCookie(name: string, value: any, secs: number = 3600, path: string = '/') {
    const exdate = new Date()
    exdate.setTime(exdate.getTime() + secs * 1000)
    const cookieValue =
      encodeURIComponent(value) + ';expires=' + exdate.toUTCString() + ';path=' + path
    document.cookie = name + '=' + cookieValue
  }

  private hasCookie(key: string) {
    let result = false
    if (document.cookie.indexOf(key) != -1) result = true
    return result
  }

  private clearCookie(name: string) {
    this.setCookie(name, '', -1)
  }

  private getSession(namespace: string, key: string, value?: any) {
    let result = null
    if (this.isEmpty(namespace)) console.warn('请输入需要查询的key名称！')
    else if (this.isEmpty(key)) console.warn('键值不能为空！')
    else {
      const session = sessionStorage.getItem(namespace) || '{}'
      const sessionJson = JSON.parse(session)
      if (this.isNull(value)) {
        if (sessionJson.hasOwnProperty(key)) {
          result = sessionJson[key]
          if (result.hasOwnProperty('end_time')) {
            const time = Math.round(new Date().getTime() / 1000)
            if (result.end_time <= time) {
              this.clearSession(namespace, key)
              result = null
            } else {
              delete result.end_time
              sessionJson[key] = result
              sessionStorage.setItem(namespace, JSON.stringify(sessionJson))
            }
          }
        }
      } else {
        let endTime = ''
        if (value.hasOwnProperty('end_time')) {
          endTime = value.end_time
          delete value.end_time
        }
        sessionJson[key] = {
          value,
          end_time: endTime
        }
        sessionStorage.setItem(namespace, JSON.stringify(sessionJson))
        result = true
      }
    }
    return result
  }

  private setSession(namespace: string, key: string, value: any) {
    return this.getSession(namespace, key, value)
  }

  private hasSession(key: string) {
    let result = false
    if (sessionStorage.hasOwnProperty(key)) result = true
    return result
  }

  private clearSession(namespace: string, key: string) {
    if (this.isEmpty(namespace)) sessionStorage.clear()
    else if (this.isEmpty(key)) sessionStorage.removeItem(namespace)
    else {
      const session = sessionStorage.getItem(namespace) || '{}'
      const sessionJson = JSON.parse(session)
      if (sessionJson.hasOwnProperty(key)) {
        delete sessionJson[key]
        sessionStorage.setItem(namespace, JSON.stringify(sessionJson))
      }
    }
  }

  private natureTime(timestamp: number, type: string = 'date') {
    let result = ''
    const time = new Date(timestamp * 1000)
    const now = new Date()
    const diff = Math.round((now.getTime() - time.getTime()) / 1000)
    if (diff < 60) result = diff + '秒前'
    else if (diff < 3600) result = Math.floor(diff / 60) + '分钟前'
    else if (diff < 86400) result = Math.floor(diff / 3600) + '小时前'
    else if (diff < 259200) result = Math.floor(diff / 86400) + '天前'
    else result = this.timeToDate(timestamp, type)
    return result
  }

  private timeToDate(unixTime: number, type: string = 'date') {
    let result = ''
    const date = new Date(unixTime * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    if (type === 'date')
      result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    else if (type === 'time') result = hour + ':' + minute + ':' + second
    else if (type === 'day') result = year + '-' + month + '-' + day
    else if (type === 'month') result = month + '-' + day
    return result
  }

  public debounce<T extends any[]>(fn: (...args: T) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null

    return function (this: any, ...args: T) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  /**
   * 设置鼠标复制内容
   * @param text {string} 设置鼠标文本内容
   * @param remark {string} 如果不为空，则往内容末尾添加备注
   * @returns {boolean}
   */
  private setCopyText(text: string = '', remark: string = ''): boolean {
    let result = false
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)

    textarea.select()

    // 为 textarea 添加监听事件方便对剪贴板内容进行二次修改
    if (!this.isEmpty(remark)) {
      textarea.addEventListener('copy', (event: ClipboardEvent) => {
        const clipboardData = (event.clipboardData ||
          (window as any).clipboardData) as DataTransfer | null
        if (!clipboardData) return
        const text = window.getSelection()?.toString()
        if (text) {
          event.preventDefault()
          clipboardData.setData('text/plain', text + remark)
        }
      })
    }

    // 执行复制操作
    if (document.execCommand('copy')) result = true

    // document.execCommand('copy') 如果内容复制的不全
    // document.execCommand('copy') // 前先进行document.execCommand('selectAll')选中所有内容即可

    // 移除 input 框
    document.body.removeChild(textarea)

    return result
  }

  // 2023-04-25 20:51:53
  public humanizeTime(time: string): string {
    const now = new Date()
    const target = new Date(time)
    const diff = now.getTime() - target.getTime()
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const month = day * 30
    const year = day * 365

    if (diff < minute) {
      return `${Math.floor(diff / second)}秒前`
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`
    } else if (diff < week) {
      return `${Math.floor(diff / day)}天前`
    } else if (diff < month) {
      return `${Math.floor(diff / week)}周前`
    } else if (diff < year) {
      return `${Math.floor(diff / month)}月前`
    } else {
      return `${Math.floor(diff / year)}年前`
    }
  }
}

// export const Helper: Helper = new Helper();
export const useHelper = Helper.getInstance()
