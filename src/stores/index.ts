// export const adminStore = useAdminStore()

/**
 * store初始化
 */
export const initStore = async () => {
  await useAdminStore().initData()
  await useSiteStore().initData()
}
