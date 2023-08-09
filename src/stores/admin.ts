import { defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    user: null as Auth.User | null,
    token: null as string | null
  }),
  actions: {
    async initData() {
      const admin = useHelper.get.storage('DOAUTH_TOKEN')
      if (admin) {
        this.token = admin.token
        const user = await useUserApi.one(admin.uid)
        if (user.code === 200) {
          this.user = user.data
        } else {
          this.clear()
        }
      } else {
        useHelper.clear.storage('DOAUTH_TOKEN')
      }
    },

    hasLogin() {
      return this.token !== null
    },

    clear() {
      this.token = null
      useHelper.clear.storage('DOAUTH_TOKEN')
    }
  }
})
