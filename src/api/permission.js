// 权限管理

import request from '@/utils/request'

// 获取所有权限点
export function getPermissionListAPI() {
  return request({
    url: '/sys/permission'
  })
}

// 添加权限点
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 根据id更新权限点详情
export function updatePermissionAPI(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 根据id删除权限点
export function delPermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

// 根据id获取权限点详情
export function getPermissionDetailAPI(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
