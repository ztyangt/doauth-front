import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useInstallApi } from '@/api/install'
import LayBase from '@/layouts/LayBase.vue'
import LayInstall from '@/layouts/LayInstall.vue'
import LayAdmin from '@/layouts/LayAdmin.vue'

// 前台路由
const index = {
  path: '/',
  component: LayBase,
  children: [
    {
      path: '/',
      name: 'index-home',
      component: () => import('@/views/index/HomeView.vue'),
      meta: { title: '首页' }
    }
  ]
}

// 后台路由
const admin = {
  path: '/admin',
  component: LayAdmin,
  children: [
    {
      path: '',
      name: 'admin-index',
      component: () => import('@/views/index/HomeView.vue'),
      meta: { title: '控制台' }
    }
  ]
}

// 安装引导
const install = {
  path: '/install',
  component: LayInstall,
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

// 错误路由
const error = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '403' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404' }
  }
]

const routes = [
  index,
  install,
  admin,
  ...error,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
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

  // 检查是否以 /admin 开头
  if (to.path.startsWith('/admin')) {
    const adminStore = useAdminStore()
    if (!adminStore.hasLogin()) {
      next('/')
      return
    }
  }
  next()
})

export default router
