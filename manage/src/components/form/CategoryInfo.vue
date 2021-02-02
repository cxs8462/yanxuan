<template>
  <div>
    <el-dialog :visible="visible" title="分类编辑" @open="onOpen" @close="onClose">
      <el-form ref="info" :model="infoData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="infoData.name" placeholder="请输入分类名称" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="简介标题" prop="front_name">
          <el-input v-model="infoData.front_name" placeholder="请输入简介标题" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="简介" prop="front_desc">
          <el-input
            v-model="infoData.front_desc"
            type="textarea"
            placeholder="请输入简介"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="infoData.keywords" placeholder="请输入关键词" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="是否显示" prop="is_show">
          <el-select v-model="infoData.is_show" placeholder="请选择是否显示" :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in is_showOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择级别" prop="level">
          <el-select v-model="infoData.level" :disabled="!!id" placeholder="请选择级别" :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in levelOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="infoData.level==='L2'" :disabled="!id" label="选择父级" prop="parent_id">
          <el-select v-model="infoData.parent_id" placeholder="父级" :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in category"
              :key="index"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="横幅" prop="banner_url">
          <un-pic :image-url.sync="infoData.banner_url" />
        </el-form-item>
        <el-form-item label="图标" prop="icon_url">
          <un-pic :image-url.sync="infoData.icon_url" />
        </el-form-item>
        <el-form-item label="图片" prop="img_url">
          <un-pic :image-url.sync="infoData.img_url" />
        </el-form-item>
        <el-form-item label="小横幅" prop="wap_banner_url">
          <un-pic :image-url.sync="infoData.wap_banner_url" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { info, addOrUpdate } from '@/api/category'
import UnPic from '@/components/UpPic'

export default {
  components: { UnPic },
  inheritAttrs: false,
  props: {
    visible: {
      default: false
    },
    id: {
      default: 0
    },
    category: {
      default: []
    },
    parent_id: {
      default: 0
    }
  },
  data() {
    return {
      infoData: {
        name: '',
        front_name: '',
        front_desc: '',
        keywords: '',
        is_show: 1,
        level: 'L1',
        parent_id: 0,
        banner_url: '',
        icon_url: '',
        img_url: '',
        wap_banner_url: '',
        id: 0
      },
      rules: {
        name: [{
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }],
        front_name: [{
          required: true,
          message: '请输入简介标题',
          trigger: 'blur'
        }],
        front_desc: [{
          required: true,
          message: '请输入简介',
          trigger: 'blur'
        }],
        keywords: [{
          required: true,
          message: '请输入关键词',
          trigger: 'blur'
        }],
        is_show: [{
          required: true,
          message: '请选择是否显示',
          trigger: 'change'
        }],
        level: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        banner_url: [{
          required: true,
          message: '请上传图片'
        }],
        icon_url: [{
          required: true,
          message: '请上传图片'
        }],
        img_url: [{
          required: true,
          message: '请上传图片'
        }],
        wap_banner_url: [{
          required: true,
          message: '请上传图片'
        }]
      },
      is_showOptions: [{
        'label': '显示',
        'value': 1
      }, {
        'label': '隐藏',
        'value': 0
      }],
      levelOptions: [{
        'label': '一级菜单',
        'value': 'L1'
      }, {
        'label': '二级菜单',
        'value': 'L2'
      }]
    }
  },
  computed: {},
  watch: {
  },
  methods: {
    onOpen() {
      if (this.parent_id) {
        this.infoData.parent_id = this.parent_id
        this.infoData.level = 'L2'
      }
      if (this.id) {
        info({ id: this.id }).then(r => {
          this.infoData = r.data
        })
      }
    },
    onClose() {
      this.infoData = {
        name: '',
        front_name: '',
        front_desc: '',
        keywords: '',
        is_show: 1,
        level: 'L1',
        parent_id: 0,
        banner_url: '',
        icon_url: '',
        img_url: '',
        wap_banner_url: '',
        id: 0
      }
      this.close()
    },
    close() {
      this.$emit('update:id', 0)
      this.$emit('update:visible', false)
      this.$emit('update:parent_id', 0)
    },
    handelConfirm() {
      this.$refs['info'].validate(valid => {
        if (!valid) return
        addOrUpdate({ ...this.infoData, id: this.id }).then(r => {
          if (!r.errno) {
            this.$message.success('编辑成功！')
            this.$emit('getData')
          }
        })
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
