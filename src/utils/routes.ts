/**
 * 根据当前route获取激活菜单
 * @param currentPath 当前路由
 * @param query
 * @returns
 */
export const toLoginRoute = (currentPath: string, query: any) => {
  if (currentPath !== '/') {
    if (query === undefined) {
      query = {}
    }
    return {
      path: '/',
      query: { ...query, ...{ redirect: encodeURIComponent(currentPath) } },
      replace: true
    }
  } else {
    return { path: '/', replace: true }
  }
}
