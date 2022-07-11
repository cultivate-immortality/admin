// 员工管理

import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 批量导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data // 这里参数data是一个数组类型，接口中没写
  })
}

// 保存员工基本信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 获取员工基本信息
export function getUserDetailByIdAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 获取员工个人信息
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 保存员工个人信息
export function updatePersonalAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取员工岗位信息
export function getJobDetailAPI(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存员工岗位信息
export function updateJobAPI(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给员工分配角色
export const assignRolesAPI = data =>
  request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
