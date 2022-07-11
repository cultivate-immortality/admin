import Layout from '@/layout'
// 组织架构
export default {
  name: 'departments',
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
