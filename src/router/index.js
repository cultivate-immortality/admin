import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
// 引入动态路由规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
// 动态路由
export const asyncRoutes = [
  departmentsRouter,
  approvalsRouter,
  employeesRouter,
  attendancesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]

Vue.use(Router)

// 静态路由，所有人都可以访问
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 通过代码发现，当路由中的属性hidden为true时，表示该路由不显示在左侧菜单中
    // 在哪个组件？SidebarItem
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [{
      path: '', // 二级路由path什么都不写 表示二级默认路由
      component: () => import('@/views/import')
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes, ...asyncRoutes] // 静态路由，动态路由临时合并
  })

const router = createRouter() // 实例化一个路由

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router // 导出一个路由
