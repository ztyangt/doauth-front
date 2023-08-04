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
    theme: 'light',
    sideCollapse: false,
    asideLeft: false,
    tabRoute: [] as tabroute[],
    curentRoute: null as string | null
  }),
  actions: {
    initData() {
      const theme = useHelper.get.cookie('themeMode')
      if (theme) {
        this.theme = theme
        // window.document.documentElement.setAttribute('data-theme', theme)
        window.document.documentElement.setAttribute('class', theme)
      } else {
        // window.document.documentElement.setAttribute('data-theme', 'light')
        window.document.documentElement.setAttribute('class', 'light')
      }
      const initRoute = {
        name: adminRoutes.children[0].name,
        title: adminRoutes.children[0].meta.title,
        path: adminRoutes.path,
        icon: adminRoutes.children[0].meta.icon
      }
      this.tabRoute.push(initRoute)
      this.curentRoute = adminRoutes.children[0].name
    },

    changeTheme() {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
      // window.document.documentElement.setAttribute('data-theme', this.theme)
      window.document.documentElement.setAttribute('class', this.theme)
      useHelper.set.cookie('themeMode', this.theme)
    }
  }
})
