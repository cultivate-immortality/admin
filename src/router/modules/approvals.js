import Layout from '@/layout'
// 审批
export default {
  name: 'approvals',
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
