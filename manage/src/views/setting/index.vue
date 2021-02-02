<template>
  <div class="setting">
    <el-row :gutter="18">
      <el-col :span="12">
        <simble-card>
          <el-carousel>
            <el-carousel-item v-for="item in banner" :key="item.id">
              <img :src="item.image_url" style="width: 100%;background-position: 100% 100%;">
            </el-carousel-item>
          </el-carousel>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card>
          <el-tabs v-model="selsetLbt" v-loading="loading" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
              v-for="(item, index) in banner"
              :key="item.id"
              :label="'轮播图'+(index+1)"
              :name="index+''"
            >
              <el-form ref="lbt" :model="item" :rules="rules" size="medium" label-width="100px">
                <el-form-item label="轮播图标题" prop="name">
                  <el-input v-model="item.name" placeholder="请输入轮播图标题" clearable :style="{width: '100%'}" />
                </el-form-item>
                <el-form-item label="指向链接" prop="link">
                  <el-input v-model="item.link" placeholder="请输入指向链接" clearable :style="{width: '100%'}" />
                </el-form-item>
                <el-form-item label="图片" prop="image_url">
                  <un-pic :image-url.sync="item.image_url" />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input v-model="item.content" placeholder="请输入内容" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div style="text-align: center;">
            <el-button @click="submitForm">提交</el-button>
            <el-button style="margin-left: 10px;" @click="getData">重置</el-button>
          </div>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card>
          <div style="text-align: center">
            <el-avatar shape="square" :size="50" :src="admin.avatar" />
            <p>用户名：{{ admin.username }}</p>
            <p>密码：*******</p>
          </div>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card>
          <el-form ref="adminForm" :model="admin" :rules="adminRules" size="medium" label-width="100px">
            <el-form-item label="头像" prop="avatar">
              <un-pic :image-url.sync="admin.avatar" />
            </el-form-item>
            <el-form-item label="管理账号" prop="username">
              <el-input v-model="admin.username" placeholder="请输入管理账号" clearable :style="{width: '100%'}" />
            </el-form-item>
            <el-form-item label="管理密码" prop="password">
              <el-input v-model="admin.password" placeholder="请输入管理密码" clearable show-password :style="{width: '100%'}" />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitAdmin">提交</el-button>
            </el-form-item>
          </el-form>
        </simble-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SimbleCard from '@/components/SimbleCard'
import { index, addOrUpdateBanner, addOrUpdateAdmin, del } from '@/api/setting'
import { state } from '@/api/user'
import UnPic from '@/components/UpPic'
export default {
  name: 'Setting',
  components: { UnPic, SimbleCard },
  data() {
    return {
      banner: [],
      selsetLbt: 0,
      loading: false,
      rules: {
        name: [{
          required: true,
          message: '请输入轮播图标题',
          trigger: 'blur'
        }],
        link: [{
          required: false,
          message: '请输入指向链接',
          trigger: 'blur'
        }],
        image_url: [{
          required: true,
          message: '请输入图片',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      },
      admin: {
        avatar: '',
        username: '',
        password: '',
        id: 0
      },
      adminRules: {
        avatar: [{
          required: true,
          message: '请上传头像',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入管理账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入管理密码',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      index().then(r => {
        this.banner = r.data.map(s => ({ id: s.id, name: s.name, link: s.link, image_url: s.image_url, content: s.content }))
        this.loading = false
      })
      state().then(r => {
        this.admin = r.data
      })
    },
    handleTabsEdit(e) {
      if (e) {
        this.loading = true
        del({ id: this.banner[e].id }).then(r => {
          if (!r.errno) {
            this.$message.success('删除成功！')
            this.getData()
          }
        })
      } else {
        this.banner.push({ id: 0, name: '', link: '', image_url: '', content: '' })
      }
    },
    submitForm() {
      let is = true
      for (const i in this.banner) {
        this.$refs['lbt'][i].validate(valid => {
          if (!valid) {
            is = false
          }
        })
      }
      if (is) {
        this.loading = true
        addOrUpdateBanner(this.banner).then(r => {
          if (!r.errno) {
            this.$message.success('修改成功！')
            this.getData()
          }
        })
      } else {
        this.$message.warning('轮播图内容不完整！')
      }
    },
    submitAdmin() {
      this.$refs['adminForm'].validate(valid => {
        if (!valid) return
        addOrUpdateAdmin(this.admin).then(r => {
          if (!r.errno) {
            this.$message.success('修改成功！')
            this.$store.dispatch('user/getInfo')
          }
        })
        // TODO 提交表单
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
