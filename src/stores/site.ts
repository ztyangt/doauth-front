import { defineStore } from 'pinia'
import { adminRoutes } from '@/router/admin'

interface tabroute {
  name: string
  title: string
  path: string
  icon: string
}

export const useSiteStore = defineStore('siteStore', {
  state: () => ({
    sideCollapse: false,
    asideLeft: false,
    tabRoute: [] as tabroute[],
    curentRoute: null as string | null,
    siteConfig: null as Auth.SiteConfigJson | null
  }),
  actions: {
    async initData() {
      // 路由信息初始化
      const initRoute = {
        name: adminRoutes.children[0].name,
        title: adminRoutes.children[0].meta.title,
        path: adminRoutes.path,
        icon: adminRoutes.children[0].meta.icon
      }
      this.tabRoute.push(initRoute)
      this.curentRoute = adminRoutes.children[0].name
      // 站点配置初始化
      const storage = useHelper.get.storage('SITE_CONFIG')
      if (storage) {
        this.siteConfig = storage
      } else {
        this.updateConfig()
      }
    },

    /**
     * 更新站点信息
     */
    async updateConfig() {
      const config = await useConfigApi.one('site_config')
      config.code === 200 && (this.siteConfig = config.data.json)
      useHelper.set.storage('SITE_CONFIG', config.data.json)
    }
  }
})
