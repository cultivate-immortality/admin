import Layout from '@/layout'
// 工资
export default {
  name: 'salarys',
  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
