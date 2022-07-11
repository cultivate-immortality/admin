// 组织架构

import request from '@/utils/request'

// 查询企业的部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 根据id删除部门
// 有的接口地址是一样的，是因为接口遵循restful接口规范（同样的地址，不同的方法，执行不同的业务）
// 接口是根据restful的规则设计的 删除delete 新增post 修改put 获取get
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据id查询部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 根据id修改部门详情
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
