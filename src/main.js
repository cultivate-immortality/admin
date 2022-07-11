import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss' // 全局样式
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // 图标
import '@/permission' // 路由权限
import * as directives from '@/directives' // 自定义指令
import component from '@/components' // 全局公用组件
import * as filters from '@/filters' // 引入工具类函数
import Print from 'vue-print-nb' // 打印

Vue.use(Print) // 使用打印插件
Vue.use(component) // 使用全局公用组件插件
Vue.use(ElementUI, { locale }) // 设置ElementUI语言为英文（国际化）
// Vue.use(ElementUI) // 如果想要中文版 element-ui，按这种方式声明

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 遍历所有导出的指令对象，完成自定义全局注册
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
