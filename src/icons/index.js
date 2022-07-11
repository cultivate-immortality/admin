// 代码比较抽象，不用强读

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 读取所有.svg格式的文件
const req = require.context('./svg', false, /\.svg$/)
// 将svg目录下所有的.svg后缀的文件全部引入到项目中
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext)
requireAll(req)
// 全局注册引用
Vue.component('svg-icon', SvgIcon)
