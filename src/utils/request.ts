import axios from 'axios'
import type { AxiosInstance, Method } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index' // import qs from 'qs'

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
        const adminStore = useAdminStore()
        config.headers['Authorization'] = adminStore.token
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.http.interceptors.response.use(
      (response) => {
        if (response.data.code === 401) {
          const adminStore = useAdminStore()
          ElMessage.error(response.data.msg)
          adminStore.clear()
          router.push(toLoginRoute(router.currentRoute.value.path, router.currentRoute.value.query))
        }
        return response.data
      },
      (error) => {
        // 响应错误
        ElMessage.error(error.response.data.msg)
        return Promise.reject(error)
      }
    )
  }

  private request<T>(
    url: string,
    method: Method,
    data: any = {},
    headers: any = {}
  ): Promise<RES<T>> {
    return this.http({
      url,
      method,
      params: method == 'get' ? data : undefined,
      data: method !== 'get' ? data : undefined,
      headers
      // data: method == 'post' ? qs.stringify(data) : null
    })
  }

  public get<T>(url: string, data?: any) {
    return this.request<T>(url, 'get', data)
  }
  public post<T>(url: string, data?: any, headers?: any) {
    return this.request<T>(url, 'post', data, headers)
  }
  public delete<T>(url: string, data?: any) {
    return this.request<T>(url, 'delete', data)
  }
  public put<T>(url: string, data?: any) {
    return this.request<T>(url, 'put', data)
  }
}

const useRequest = Request.getInstance()
export const request = useRequest
