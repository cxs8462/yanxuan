<template>
  <div>
    <el-dialog v-loading="loading" title="专题编辑" width="80%" :visible.sync="show" @opened="opened" @open="onOpen" @close="onClose">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="副标题" prop="subtitle">
              <el-input
                v-model="formData.subtitle"
                type="textarea"
                placeholder="请输入副标题"
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="列表图片" prop="item_pic_url">
              <un-pic :image-url.sync="formData.item_pic_url" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="场景图片" prop="scene_pic_url">
              <un-pic :image-url.sync="formData.scene_pic_url" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格信息" prop="price_info">
              <el-input-number v-model="formData.price_info" placeholder="价格信息" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阅读量" prop="read_count">
              <el-input v-model="formData.read_count" placeholder="请输入阅读量" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="4"><h5>上传图片复制地址:</h5></el-col>
          <el-col :span="6">
            <un-pic :image-url.sync="upPic" />
          </el-col>
          <el-col :span="14">
            <el-input :value="upPic" @focus="copyUrl" />
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <div id="topicContent" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import UnPic from '@/components/UpPic'
import detailEidt from 'wangeditor'
import { info, addOrUpdate } from '@/api/topic'
export default {
  name: 'TopicInfo',
  components: { UnPic },
  inheritAttrs: false,
  props: {
    id: {
      default: 0
    },
    show: {
      default: false
    }
  },
  data() {
    return {
      formData: {
        id: 0,
        title: '',
        subtitle: '',
        item_pic_url: '',
        scene_pic_url: '',
        price_info: 200,
        read_count: '1k',
        content: ''
      },
      loading: false,
      Edit: null,
      upPic:'',
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        subtitle: [{
          required: true,
          message: '请输入副标题',
          trigger: 'blur'
        }],
        item_pic_url: [{
          required: true,
          message: '请输入列表图片',
          trigger: 'blur'
        }],
        scene_pic_url: [{
          required: true,
          message: '请输入场景图片',
          trigger: 'blur'
        }],
        price_info: [{
          required: true,
          message: '价格信息',
          trigger: 'blur'
        }],
        read_count: [{
          required: true,
          message: '请输入阅读量',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {},
  methods: {
    onOpen() {
      this.id ? this.getData(this.id) : ''
      this.Edit.txt.html('')
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$emit('update:id', 0)
      this.$emit('update:show', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.postData(this.formData)
      })
    },
    getData(id) {
      this.loading = true
      this.id ? info({ id }).then(r => {
        if (!r.errno) {
          this.formData = r.data
          this.Edit.txt.html(this.formData.content)
          this.loading = false
        }
      }) : ''
    },
    opened() {
      if (this.Edit) return
      this.Edit = new detailEidt('#topicContent')
      this.Edit.config.height = 500
      this.Edit.config.onchange = e => {
        this.formData.content = e
      }
      this.Edit.create()
      this.id ? this.getData(this.id) : ''
    },
    copyUrl(e) {
      if (this.upPic) {
        e.target.select()
        const state = document.execCommand('copy')
        state ? this.$message.success('复制成功！') : ''
      }
    },
    postData(obj) {
      this.loading = true
      addOrUpdate(obj).then(r => {
        if (!r.erron) {
          this.$message.success('编辑成功！')
          this.loading = false
          this.$emit('getData')
          this.onClose()
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>

</style>
