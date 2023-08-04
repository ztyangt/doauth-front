// 后台路由
import LayAdmin from '@/layouts/LayAdmin.vue'

export const adminRoutes = {
  path: '/admin',
  component: LayAdmin,
  children: [
    {
      path: '',
      name: 'admin-index',
      component: () => import('@/views/admin/index/index.vue'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    {
      path: 'auth',
      name: 'admin-auth',
      meta: { title: '授权管理', icon: 'vimeosquare' },
      children: [
        {
          path: 'add',
          name: 'admin-auth-add',
          component: () => import('@/views/admin/auth/add.vue'),
          meta: { title: '新增授权', icon: 'plussquareo' }
        },
        {
          path: 'list',
          name: 'admin-auth-list',
          component: () => import('@/views/admin/auth/list.vue'),
          meta: { title: '授权列表', icon: 'sliders1' }
        },
        {
          path: 'type',
          name: 'admin-auth-type',
          component: () => import('@/views/admin/auth/type.vue'),
          meta: { title: '授权策略', icon: 'minussquareo' }
        }
      ]
    },
    {
      path: 'software',
      name: 'admin-software',
      meta: { title: '软件管理', icon: 'delicious' },
      children: [
        {
          path: 'add',
          name: 'admin-software-add',
          component: () => import('@/views/admin/software/add.vue'),
          meta: { title: '新增软件', icon: 'plussquareo' }
        },
        {
          path: 'list',
          name: 'admin-software-list',
          component: () => import('@/views/admin/software/list.vue'),
          meta: { title: '软件列表', icon: 'gg1' }
        }
      ]
    },
    {
      path: 'piracy',
      name: 'admin-piracy',
      component: () => import('@/views/admin/piracy/index.vue'),
      meta: { title: '盗版追踪', icon: 'crosshairs' }
    },
    {
      path: 'config',
      name: 'admin-config',
      meta: { title: '系统设置', icon: 'cog1' },
      children: [
        {
          path: 'user',
          name: 'admin-config-user',
          component: () => import('@/views/admin/config/user.vue'),
          meta: { title: '个人设置', icon: 'user3' }
        },
        {
          path: 'site',
          name: 'admin-config-site',
          component: () => import('@/views/admin/config/site.vue'),
          meta: { title: '网站设置', icon: 'cogs1' }
        }
      ]
    },
    {
      path: 'help',
      name: 'admin-help',
      component: () => import('@/views/admin/help/index.vue'),
      meta: { title: '使用帮助', icon: 'questioncircle' }
    },
    {
      path: 'about',
      name: 'admin-about',
      component: () => import('@/views/admin/about/index.vue'),
      meta: { title: '关于', icon: 'book1' }
    }
  ]
}
