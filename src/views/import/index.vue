<template>
  <!-- 给这个组件传入:on-success="success"会返回header和results -->
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',
  methods: {
    async success({ header, results }) {
      // 如果是导入员工
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      var arr = []
      results.forEach(item => {
        var userInfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            // 后端接口限制了 不能是字符串 要求转化时间类型，只有这样才能存入数据库
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[userRelations[key]] = item[key] // 将原来中文对应的值，赋值给原来英文对应的值
          }
        })
        arr.push(userInfo)
      })
      await importEmployee(arr) // 调用导入接口
      this.$message.success('导入excel成功')
      this.$router.back() // 回到上一个页面
    },

    // 当excel中有日期格式的时候，实际转化的值为一个数字，我们需要一个方法进行转化
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>
