/**
 * 文件API
 */
class FIleApi {
  private static instance: FIleApi
  private constructor() {}

  public static getInstance(): FIleApi {
    if (!FIleApi.instance) {
      FIleApi.instance = new FIleApi()
    }
    return FIleApi.instance
  }

  public upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return request.post<{ path: string }>('api/file/upload', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  /**
   * 网图转base64
   * @param url 网图URL
   * @returns
   */
  public base64(url: string) {
    return request.post<string>('api/file/to-base64', { url })
  }
}

export const useFIleApi = FIleApi.getInstance()
