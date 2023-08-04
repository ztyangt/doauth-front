import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useInstallApi } from '@/api/install'
import LayBase from '@/layouts/LayBase.vue'
import LayInstall from '@/layouts/LayInstall.vue'
import { adminRoutes } from './admin'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 前台路由
const index = {
  path: '/',
  component: LayBase,
  children: [
    {
      path: '/',
      name: 'index-home',
      component: () => import('@/views/index/index.vue'),
      meta: { title: '首页' }
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
      component: () => import('@/views/install/index.vue'),
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
  adminRoutes,
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
  NProgress.start()
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

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router
