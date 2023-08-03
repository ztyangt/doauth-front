declare namespace Auth {
  interface User {
    account: string
    avatar: string
    create_time: number
    delete_time: number
    description: string
    email: string
    id: number
    json: null
    level: number
    login_time: number
    nickname: string
    remark: string
    result: { [key: string]: any }
    text: string
    update_time: number
  }

  interface Login {
    token: string
    user: User
  }
}
