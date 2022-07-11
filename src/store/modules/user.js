import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'

// 状态
// Vuex的持久化如何实现？Vuex和前端缓存相结合
const state = {
  token: getToken(), // 设置token为初始状态；token持久化，放到缓存中；初始化的时候从缓存中读取状态，并赋值到初始化的状态上，没有就是null
  userInfo: {} // 定义一个空的对象，不是null，因为后边我要开发userInfo的属性给其它地方用userInfo.name
}

// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token，只是修改state的数据
    // vuex变化 => 缓存数据
    setToken(token) // vuex和缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除vuex，再清除缓存vuex和缓存数据的同步
  },

  // 设置用户信息
  setUserInfo(state, userInfo) {
    // 两种方式都可以
    // state.userInfo = userInfo
    state.userInfo = { ...userInfo } // 用浅拷贝的方式去赋值对象，因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息，退出登录，切换用户的时候删除
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

// 执行异步
const actions = {
  // 定义login的action，也需要参数，调用action时，传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise，result就是执行的结果
    context.commit('setToken', result)
    // token失效的主动介入
    // 拿到token说明登录成功
    setTimeStamp() // 设置当前的时间戳

    /* // axios默认给数据加了一层data
    if (result.data.success) {
      // 表示登录接口调用成功，也就是意味着用户名和密码是正确的
      // 现在有用户token
      // actions修改state，必须通过mutations
      context.commit('setToken', result.data.data)
    } */
  },

  // 获取用户基本资料
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回，为后面埋下伏笔
  },

  // 登出的action
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的，还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
