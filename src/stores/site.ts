import { defineStore } from 'pinia'

export const useSiteStore = defineStore('siteStore', {
  state: () => ({
    theme: 'light',
    sideCollapse: false
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
