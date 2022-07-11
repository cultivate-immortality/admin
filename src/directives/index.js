// 自定义指令

// 导出图片指令
export const imageerror = {
  inserted(element, binding) {
    // 初始化的时候，如果有值，则赋值；如果没有值，则需要进行默认值赋值
    element.src = element.src || binding.value
    // element表示当前指令作用的element对象，此处指的是图片
    // binding指的是img，其中有一个属性value，此处指的是a.png
    // <img v-imagerror="img"> data() {return {img: 'a.png'}}

    // 当图片有地址，但是地址没有加载成功时，会报错，会触发图片的onerror事件
    // <img src="图片地址">
    // let img = document.querySelector('img')
    // img.onerror = function() {console.log('图片加载错误')}

    // 当图片出现异常的时候，会将指令配置的默认图片设置为该图片的内容
    element.onerror = function() {
      element.src = binding.value
    }
  },
  // 该函数同inserted一样也是一个钩子函数
  // componentUpdated与update区别：componentUpdated组件更新后的状态；update组件更新前的状态
  componentUpdated(element, binding) {
    // 该钩子函数会在当前指令作用的组件，更新数据完毕之后执行
    // inserted函数只会执行一次
    // 组件初始化，一旦更新就不会再进入inserted函数，会进去componentUpdated
    element.src = element.src || binding.value
  }
}

/* export default 1 // 默认导出
import a from '@/directives' // 默认导入，此时a就是1 */

/* export const imagerror = {} // 按需导出
import { imagerror } from '@/directives' // 按需导入 */

/* export default 1 // 默认导出
export const imagerror = {} // 按需导出
import * as a from '@/directives' // 全部导入，此时a是个对象，里面包含全部导出内容 */
