<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <!-- 总记录数 -->
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button icon="plus" type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />

          <!-- 格式化聘用形式 -->
          <el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" sortable prop="departmentName" />

          <!-- 作用域插槽 过滤器解决时间格式 -->
          <el-table-column label="入职时间" sortable prop="timeOfEntry">
            <template slot-scope="obj">
              {{ obj.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>

          <el-table-column label="账户状态" align="center" sortable prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>

          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <!-- 放置新增员工组件 -->
    <!-- sync修饰符 是 子组件 去改变父组件的数据的一个语法糖 -->
    <AddDemployee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddDemployee from './components/add-employee'
import { formatDate } from '@/filters'
export default {
  name: 'Employees', // 员工管理
  components: { AddDemployee },
  data() {
    return {
      loading: false, // 页面的加载loading
      list: [], // 接数据的
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      },
      showDialog: false // 新增员工弹层
    }
  },
  created() {
    this.getEmployeeList() // 获取员工列表
  },
  methods: {
    // 分页
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList() // 获取员工列表
    },
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page) // 获取员工列表
      this.page.total = total
      this.list = rows
      this.loading = false
    },

    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1 所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },

    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id) // 删除员工
        this.getEmployeeList() // 重新拉取数据，获取员工列表
        this.$message.success('删除员工成功')
      } catch (error) {}
    },

    // excel导出
    exportData() {
      const headers = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        // 现在没有一个接口能获取所有的数据，所以在页码这里进行处理
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 处理之后的data，就是需要的data
        // excel是引入文件的导出对象
        excel.export_json_to_excel({
          // header: ['姓名', '工资'], // 表头 必填
          // data: [['张三', 3000], ['李四', 5000]], // 具体数据 必填
          // [{username: '张三'}] => [[]]

          header: Object.keys(headers), // 表头 必填
          data: data, // 具体数据 必填
          filename: 'excel导出', // 非必填，导出的文件名
          autoWidth: true, // 非必填，单元格是否要自适应宽度
          bookType: 'xlsx' // 非必填，导出文件类型，默认就是xlsx，可以不写
        })
      })
    },
    // 该方法负责将数组转化成二维数组
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            var en = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
    }
  }
}
</script>
