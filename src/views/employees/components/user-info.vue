<template>
  <div class="user-info">
    <el-form label-width="220px">
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="userInfo.workNumber" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker v-model="userInfo.timeOfEntry" type="date" class="inputW" value-format="YYYY-MM-DD" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="userInfo.username" class="inputW" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <ImageUpload ref="staffPhoto" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="saveUser">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-form label-width="220px" style="margin-top: 20px;">
      <el-form-item label="员工照片">
        <ImageUpload ref="myStaffPhoto" />
      </el-form-item>
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="savePersonal">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { getPersonalDetail, updatePersonal, saveUserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {},
      formData: {}
    }
  },
  created() {
    this.getPersonalDetail()
    this.getUserDetailById()
  },
  methods: {
    async getPersonalDetail() {
      this.formData = await getPersonalDetail(this.userId)
      this.formData = await getPersonalDetail(this.userId)
      if (this.formData.staffPhoto) {
        this.$refs.myStaffPhoto.fileList = [{ url: this.formData.staffPhoto, upload: true }]
      }
    },
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
      if (this.userInfo.staffPhoto) {
        // 这里我们赋值，同时需要给赋值的地址一个标记 upload: true
        this.$refs.staffPhoto.fileList = [{ url: this.userInfo.staffPhoto, upload: true }]
      }
    },
    async savePersonal() {
      const fileList = this.$refs.myStaffPhoto.fileList
      if (fileList.some(item => !item.upload)) {
        // 如果此时去找 upload为false的图片 找到了说明 有图片还没有上传完成
        this.$message.warning('您当前还有图片没有上传完成！')
        return
      }
      await updatePersonal({ ...this.formData, staffPhoto: fileList && fileList.length ? fileList[0].url : '' })
      this.$message.success('保存基础信息成功')
    },
    async saveUser() {
      // 去读取 员工上传的头像
      const fileList = this.$refs.staffPhoto.fileList // 读取上传组件的数据
      if (fileList.some(item => !item.upload)) {
        // 如果此时去找 upload为false的图片 找到了说明 有图片还没有上传完成
        this.$message.warning('您当前还有图片没有上传完成！')
        return
      }
      // 通过合并 得到一个新对象
      await saveUserDetailById({ ...this.userInfo, staffPhoto: fileList && fileList.length ? fileList[0].url : '' })
      this.$message.success('保存基本信息成功')
    }
  }
}
</script>
