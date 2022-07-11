import Layout from '@/layout'
// 导出员工的路由规则
export default {
  path: '/employees', // 当路由地址是employees，会显示Layout
  name: 'employees',
  component: Layout, // 组件
  children: [
    {
      path: '', // 二级路由的path什么都不写，表示二级路由的默认路由，此时既显示一级布局，又显示二级组件
      component: () => import('@/views/employees'),
      /* 这里为什么要用title呢? 因为左侧导航会读取路由里的meta里面的title作为显示菜单名称
      在哪个组件读取的? sidebarItem：<item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" /> */
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: 'detail/:id', // 动态路由params传参；path::'detail/:id?', id后面加问号表示传不传参都可以跳转
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示，这里不加hidden，员工就不会在左侧菜单显示，因为员工有子路由
      // 标记当前路由规则的中文名称，后续在做左侧菜单时使用
      meta: { title: '员工详情' }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: { title: '打印', icon: 'people' }
    }
  ]
}
// modules模块下都是动态路由，动态路由和静态路由是平级关系，都有自己的Layout布局
