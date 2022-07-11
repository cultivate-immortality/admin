<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 第一行内容 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />

        <!--放置一个属性 这里的props和我们之前学习的父传子 的props没关系-->
        <!-- default-expand-all展开所有节点 -->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>

    <!-- 放置新增子部门弹层组件  -->
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'Departments', // 组织架构
  components: { TreeTools, AddDept },
  data() {
    return {
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      company: {}, // 第一行数据结构
      showDialog: false, // 新增子部门弹层
      node: null // 记录当前点击的节点
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments() // 查询企业的部门列表
      // 在最根级的tree-tools组件中，由于treenode属性中没有id，id便是undefined，但是通过undefined进行等值判断是寻找不到对应的根节点的，所以在传值时，我们将id属性设置为''
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // 这里定义一个空串 因为 它是根 所有的子节点的数据pid 都是 ""
      this.departs = tranListToTreeData(result.depts, '')
    },

    // 添加子部门
    addDepts(node) {
      // 因为node是当前的点击的部门，此时这个部门应该记录下来
      this.node = node
      this.showDialog = true // 显示添加子部门弹层
    },

    // 点击编辑触发的父组件的方法
    editDepts(node) {
      this.node = node // 存储传递过来的node数据
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
      this.showDialog = true // 显示新增组件弹层
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
