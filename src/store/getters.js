const getters = {
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  name: state => state.user.userInfo.username, // 用户名
  token: state => state.user.token, // token
  staffPhoto: state => state.user.userInfo.staffPhoto, // 用户头像
  userId: state => state.user.userInfo.userId, // 用户Id
  companyId: state => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters
