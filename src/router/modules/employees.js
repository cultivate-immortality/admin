// 导出员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/employees', // 当路由地址是employees，会显示Layout
  name: 'employees',
  component: Layout, // 组件
  children: [
    {
      // 二级路由的path什么都不写，表示二级路由的默认路由，此时既显示一级布局，又显示二级组件
      // 二级路由如果写 path: 'a'，表示 /employees/a
      path: '', // 路径
      component: () => import('@/views/employees'),
      meta: {
        // 这里为什么要用title呢? 因为左侧导航会读取路由里的meta里面的title作为显示菜单名称
        // 在哪个组件读取的? sidebarItem：<item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id', // query传参，动态路由传参
      // path: 'detail/:id?', id后面加问号表示传不传参都可以跳转
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示，这里不加hidden，员工管理就不会在左侧菜单显示，因为两个子路由
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }
    }
  ]
}

// modules模块下都是动态路由，动态路由和静态路由是平级关系，都有自己的Layout布局
