<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width: 50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width: 50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width: 50%" placeholder="请选择日期" />
      </el-form-item>

      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width: 50%" placeholder="请选择">
          <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width: 50%" placeholder="请输入工号" />
      </el-form-item>

      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <!-- 放置一个tree组件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>

      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width: 50%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  name: 'AddEmployee',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum: EmployeeEnum,
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏，默认不显示
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        // 这里校验规则，用的是change，点击某个部门的时候会触发，不会报错，想报错，试试blur
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getDepartments() {
      try {
        this.showTree = true
        this.loading = true
        const { depts } = await getDepartments()
        // depts是数组 但不是树形
        this.treeData = tranListToTreeData(depts, '') // 转换树形
        this.loading = false
      } catch (error) {}
    },
    // 点击部门时触发，节点被点击时的回调
    selectNode(node) {
      // console.log(arguments)
      this.formData.departmentName = node.name // 点击某个部门，把数据写入到输入框
      this.showTree = false
    },

    // 点击确定时 校验整个表单
    async btnOK() {
      try {
        await this.$refs.addEmployee.validate()
        // 调用新增接口
        await addEmployee(this.formData) // 新增员工
        // 告诉父组件更新数据
        // this.$parent 可以直接调用到父组件的实例 实际上就是父组件this
        // this.$parent 父组件的实例必须放到根节点的div里面，局限性比较大
        // this.$emit
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
        // 点击确定之后，不用重置数据，因为关闭弹层会自动触发close事件，close事件绑定了btnCancel方法
      } catch (error) {}
    },
    // 取消
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 重置校验结果
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
