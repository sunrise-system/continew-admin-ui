import type { RouteRecordRaw } from 'vue-router'

/** 默认布局 */
const Layout = () => import('@/layout/index.vue')

/** 系统路由 */
export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    meta: { title: '仪表盘', icon: 'dashboard', hidden: false },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: { title: '工作台', icon: 'desktop', hidden: false, affix: true },
      },
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: { title: '分析页', icon: 'insert-chart', hidden: false },
      },
    ],
  },
  {
    path: '/social/callback',
    component: () => import('@/views/login/social/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/pwdExpired',
    component: () => import('@/views/login/pwdExpired/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/setting/profile',
        name: 'SettingProfile',
        component: () => import('@/views/setting/profile/index.vue'),
        meta: { title: '个人中心', showInTabs: false },
      },
      {
        path: '/setting/message',
        name: 'SettingMessage',
        component: () => import('@/views/setting/message/index.vue'),
        meta: { title: '消息中心', showInTabs: false },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    meta: { title: '关于项目', icon: 'apps', hidden: false, sort: 999 },
    children: [
      {
        path: '/about/document/continew',
        component: () => import('@/views/about/document/continew/index.vue'),
        meta: { title: '在线文档', icon: 'continew', hidden: false, keepAlive: true },
      },
      {
        path: '/about/document/api',
        component: () => import('@/views/about/document/api/index.vue'),
        meta: { title: '接口文档', icon: 'continew', hidden: false, keepAlive: true },
      },
      {
        path: '/about/document/arco-design-vue',
        component: () => import('@/views/about/document/arco-design-vue/index.vue'),
        meta: { title: 'Arco Design文档', icon: 'arco', hidden: false, keepAlive: true },
      },
      {
        path: '/about/source',
        name: 'AboutSource',
        meta: { title: '开源地址', icon: 'github', hidden: false },
        children: [
          {
            path: 'https://gitee.com/continew/continew-admin',
            meta: { title: 'Gitee', icon: 'gitee', hidden: false },
          },
          {
            path: 'https://gitcode.com/continew/continew-admin',
            meta: { title: 'GitCode', icon: 'gitcode', hidden: false },
          },
          {
            path: 'https://github.com/continew-org/continew-admin',
            meta: { title: 'GitHub', icon: 'github', hidden: false },
          },
        ],
      },
    ],
  },
]

// 固定路由（默认路由）
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/default/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/default/error/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/403',
    component: () => import('@/views/default/error/403.vue'),
    meta: { hidden: true },
  },
]
