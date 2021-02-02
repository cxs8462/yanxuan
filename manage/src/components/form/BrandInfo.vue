<template>
  <div class="BrandInfo">
    <el-dialog :visible="visible" title="品牌编辑" @open="onOpen" @close="onClose">
      <el-form ref="brandForm" :model="infoData" :rules="rules" size="medium" label-width="150px">
        <el-form-item label="品牌名" prop="name">
          <el-input v-model="infoData.name" placeholder="请输入品牌名" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="简介" prop="simple_desc">
          <el-input
            v-model="infoData.simple_desc"
            type="textarea"
            placeholder="请输入简介"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="价格" prop="floor_price">
          <el-input-number v-model="infoData.floor_price" placeholder="价格" />
        </el-form-item>
        <el-form-item label="显示" prop="is_show">
          <el-radio-group v-model="infoData.is_show" size="medium">
            <el-radio-button
              v-for="(item, index) in is_showOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="品牌新旧" prop="is_new">
          <el-radio-group v-model="infoData.is_new" size="medium">
            <el-radio-button
              v-for="(item, index) in is_newOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="列表图片" prop="list_pic_url">
          <un-pic :image-url.sync="infoData.list_pic_url" />
        </el-form-item>
        <el-form-item label="显示图片" prop="pic_url">
          <un-pic :image-url.sync="infoData.pic_url" />
        </el-form-item>
        <el-form-item label="app列表图片" prop="app_list_pic_url">
          <un-pic :image-url.sync="infoData.app_list_pic_url" />
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
import { info,addOrUpdate } from '@/api/brand'
import UnPic from '@/components/UpPic'
export default {
  name: 'BrandInfo',
  components: { UnPic },
  props: {
    id: {
      default: 0
    },
    visible: {
      default: false
    }
  },
  data() {
    return {
      infoData: {
        name: '',
        simple_desc: '',
        floor_price: 0,
        is_show: 1,
        is_new: 1,
        list_pic_url: '',
        pic_url: '',
        app_list_pic_url: '',
        id: 0
      },
      rules: {
        name: [{
          required: true,
          message: '请输入品牌名',
          trigger: 'blur'
        }],
        simple_desc: [{
          required: true,
          message: '请输入简介',
          trigger: 'blur'
        }],
        floor_price: [{
          required: true,
          message: '价格',
          trigger: 'blur'
        }],
        is_show: [{
          required: true,
          message: '显示不能为空',
          trigger: 'change'
        }],
        is_new: [{
          required: true,
          message: '品牌新旧不能为空',
          trigger: 'change'
        }],
        list_pic_url: [{
          required: true,
          message: '请输入列表图片',
          trigger: 'blur'
        }],
        pic_url: [{
          required: true,
          message: '请输入显示图片',
          trigger: 'blur'
        }],
        app_list_pic_url: [{
          required: true,
          message: '请输入app列表图片',
          trigger: 'blur'
        }]
      },
      is_showOptions: [{
        'label': '显示',
        'value': 1
      }, {
        'label': '隐藏',
        'value': 0
      }],
      is_newOptions: [{
        'label': '新',
        'value': 1
      }, {
        'label': '旧',
        'value': 0
      }]
    }
  },
  watch: {},
  methods: {
    onOpen() {
      if (this.id) {
        info({ id: this.id }).then(r => {
          if (!r.errno) {
            this.infoData = r.data
          }
        })
      }
    },
    onClose() {
      this.infoData = {
        name: '',
        simple_desc: '',
        floor_price: 0,
        is_show: 1,
        is_new: 1,
        list_pic_url: '',
        pic_url: '',
        app_list_pic_url: '',
        id: 0
      }
      this.close()
    },
    close() {
      this.$emit('update:id', 0)
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['brandForm'].validate(valid => {
        if (!valid) return
        addOrUpdate({ ...this.infoData }).then(r => {
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
<style lang="scss" scoped>
.BrandInfo{

}
</style>
