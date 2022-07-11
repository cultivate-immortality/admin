import Layout from '@/layout'
// 考勤
export default {
  name: 'attendances',
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
