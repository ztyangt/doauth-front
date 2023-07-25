import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const index = {
  path: '/',
  component: () => import('@/layouts/LayBase.vue'),
  children: [
    {
      path: '/',
      name: 'index-home',
      meta: { title: '首页' },
      component: () => import('@/views/index/HomeView.vue')
    }
  ]
}

// 安装引导
const install = {
  path: '/install',
  component: () => import('@/layouts/LayInstall.vue'),
  meta: { title: '安装引导' },
  children: [
    {
      path: '/',
      name: 'install-index',
      component: () => import('@/views/install/IndexView.vue'),
      meta: { title: '开始安装' }
    }
  ]
}

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTE_MODE === 'history'
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes: [index, install]
})

export default router
