import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useInstallApi } from '@/api/install'

const index = {
  path: '/',
  component: () => import('@/layouts/LayBase.vue'),
  children: [
    {
      path: '/',
      name: 'index-home',
      component: () => import('@/views/index/HomeView.vue'),
      meta: { title: '首页' }
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
      path: '',
      name: 'install',
      component: () => import('@/views/install/IndexView.vue'),
      meta: { title: '开始安装' }
    }
  ]
}

const routes = [
  index,
  install,
  {
    // 404 路由
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTE_MODE === 'history'
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const meta = to.meta || {}
  // 设置页面标题
  if (to.path === '/') {
    document.title = 'DoAuth授权系统'
  } else {
    document.title = meta.title ? `DoAuth - ${meta.title}` : 'DoAuth授权系统'
  }

  // 检查是否以 /install 开头
  if (to.path.startsWith('/install')) {
    const { code, msg } = await useInstallApi.check()
    if (code !== 200) {
      ElMessage.error(msg)
      next('/')
      return
    }
  }
  next()
})

export default router
