import Layout from '@/layout'
// 社保
export default {
  name: 'social',
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
