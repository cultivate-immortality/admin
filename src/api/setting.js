// 角色管理
import request from '@/utils/request'

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 根据id删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 根据id更新角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

// 给角色分配权限
export const assignPermissionsAPI = data =>
  request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })

// 企业管理
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
