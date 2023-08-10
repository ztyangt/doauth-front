interface RES<T> {
  code: number
  data: T
  msg: string
}

interface ResList<T> {
  page: number
  count: number
  data: T[]
}

interface tabroute {
  name: string
  title: string
  path: string
  icon: string
}
