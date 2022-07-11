import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters' // 根级别getters，用来做快捷访问
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
