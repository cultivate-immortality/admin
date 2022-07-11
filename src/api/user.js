// 登录
import request from '@/utils/request'

// 登录
// 登录接口就是用来获取用户token的
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
