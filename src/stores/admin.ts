import { defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    user: null as Auth.User | null,
    token: null as string | null
  }),
  actions: {
    async initData() {
      const admin = useHelper.get.storage('DOAUTH_ADMIN')
      if (admin) {
        this.token = admin.token
        this.user = admin.user
      } else {
        this.clear()
      }
    },

    /**
     * 更新用户信息
     * @param uid 用户id
     */
    async updateUser() {
      if (this.user) {
        const user = await useUserApi.one(this.user.id)
        if (user.code === 200) {
          this.user = user.data
          useHelper.set.storage('DOAUTH_ADMIN', { token: this.token, user: user.data, time: 7200 })
        }
      }
    },

    hasLogin() {
      return this.user !== null
    },

    clear() {
      this.token = null
      this.user = null
      useHelper.clear.storage('DOAUTH_ADMIN')
    }
  }
})
