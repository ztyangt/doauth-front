import axios from 'axios'
import type { AxiosInstance, Method, AxiosResponse } from 'axios'
// import qs from 'qs'

class Request {
  private static instance: Request
  private http: AxiosInstance

  /**
   * 获取单例对象
   */
  public static getInstance(): Request {
    if (!Request.instance) {
      Request.instance = new Request()
    }
    return Request.instance
  }

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 3000
      // headers: { "X-Custom-Header": "" },
    })
    this.Addinterceptors()
  }

  private Addinterceptors() {
    //请求拦截器
    this.http.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.http.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // 响应错误
        return Promise.reject(error)
      }
    )
  }

  private request<T>(
    url: string,
    method: Method,
    data: any = {}
  ): Promise<AxiosResponse<RES<T>, any>> {
    return this.http({
      url,
      method,
      params: method == 'get' ? data : undefined,
      data: method == 'post' ? data : undefined
      // data: method == 'post' ? qs.stringify(data) : null
    })
  }

  public get<T>(url: string, method: Method, data?: any) {
    return this.request<T>(url, method, data)
  }
  public post<T>(url: string, method: Method, data?: any) {
    return this.request<T>(url, method, data)
  }
  public delete<T>(url: string, method: Method, data?: any) {
    return this.request<T>(url, method, data)
  }
  public put<T>(url: string, method: Method, data?: any) {
    return this.request<T>(url, method, data)
  }
}

const useRequest = Request.getInstance()
export default useRequest
