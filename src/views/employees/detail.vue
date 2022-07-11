<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 登录账号设置 -->
          <el-tab-pane label="登录账户设置">
            <el-form
              ref="userForm"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :rules="rules"
              :model="userInfo"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width: 300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <!-- 个人详情 -->
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="UserInfo" />
          </el-tab-pane>

          <!-- 岗位信息 -->
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="jobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
  name: 'Detail',
  data() {
    return {
      UserInfo: UserInfo,
      jobInfo: jobInfo,
      userInfo: { username: '', password2: '' }, // 专门存放基本信息
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.$route.params.id)
    },
    async saveUser() {
      try {
        // 校验
        await this.$refs.userForm.validate()
        // 将新密码的值替换原密码的值
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('保存成功')
      } catch (error) { }
    }
  }
}
</script>
