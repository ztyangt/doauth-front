import { defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    login: null as Auth.Login | null
  }),
  actions: {
    initData() {
      const login = useHelper.get.storage('admin')
      if (login) {
        this.login = login
      } else {
        useHelper.clear.storage('admin')
      }
    },

    hasLogin() {
      return this.login !== null
    },

    clear() {
      this.login = null
      useHelper.clear.storage('admin')
    }
  }
})
