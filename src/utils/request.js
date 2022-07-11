import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  // 如果执行 npm run dev 值为 /api，/api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api，没关系，运维会在上线的时候，配置上 /prod-api 的代理
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 只有在有token的情况下，才有必要去检查时间戳是否超时
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了
        // token没用了 因为超时了
        store.dispatch('user/logout') // 登出操作
        router.push('/login') // 跳转到登录页
        return Promise.reject(new Error('登录过期，请重新登录'))
      }
      // 如果token存在，注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认加了一层data
    const { success, message, data } = response.data
    // data不可以随便取，要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message)) // 如果在业务页面捕获了错误，则不会打印到控制台
    }
  },
  error => {
    // error 信息 里面 response的对象
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login') // 跳转登录页
    } else {
      Message.error(error.message) // 提示错误信息
    }
    // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    // login().then().catch()
    return Promise.reject(error)
  }
)

const TimeOut = 3600 // 定义超时时间
// 是否超时
// 超时逻辑  (当前时间 - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service

// try + catch 自己处理错误，内部throw就不会向控制台抛出打印错误，而是交给你得catch内自定义错误
// try + catch 捕获同步代码的异常
