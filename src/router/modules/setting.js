import Layout from '@/layout'
// 公司设置
export default {
  name: 'setting',
  path: '/setting',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
