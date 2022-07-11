// 权限拦截 导航守卫 路由守卫  router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单，所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(async function(to, from, next) {
  // next() 放过；next(false) 跳转终止；next(地址) 跳转到某个地址
  NProgress.start() // 开启进度条
  // 首先判断有无token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      // 表示去的是登录页
      next('/') // 跳到主页
    } else {
      // 只有放过的时候才去获取用户资料，但是不是每次都获取
      // 如果当前vuex中有用户资料的id，表示已经有资料了，不需要获取了；如果没有id才去获取
      if (!store.state.user.userInfo.userId) {
        // 如果没有id才表示当前用户资料没有获取过
        await store.dispatch('user/getUserInfo')
      }
      next() // 直接放行
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了，表示在在名单里面
      next() // 直接放行
    } else {
      next('/login') // 跳到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次，为了解决手动切换地址时，进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
