<template>
  <div class="GoodsEidt">
    <el-row :gutter="24">
      <el-col :span="24">
        <simble-card>
          <div style="display: flex;justify-content: space-between;">
            <el-button @click="back">返回</el-button>
            <el-button v-if="query.id" type="danger" @click="()=>del(query.id)">删除</el-button>
          </div>
        </simble-card>
      </el-col>
      <el-col :span="15">
        <simble-card>
          <el-row :gutter="15">
            <el-form ref="elForm" :disabled="!query.isEdit" :model="formData" :rules="rules" size="medium" label-width="100px">
              <el-col :span="24">
                <el-form-item label="商品名" prop="name">
                  <el-input v-model="formData.name" placeholder="请输入商品名" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="零售价格" prop="retail_price">
                  <el-input-number v-model="formData.retail_price" placeholder="零售价格" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位" prop="goods_unit">
                  <el-input v-model="formData.goods_unit" placeholder="请输入单位" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专柜价格" prop="counter_price">
                  <el-input-number v-model="formData.counter_price" placeholder="专柜价格" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="库存" prop="goods_number">
                  <el-input-number v-model="formData.goods_number" placeholder="库存" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="简介" prop="goods_brief">
                  <el-input v-model="formData.goods_brief" placeholder="请输入简介" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="关键词" prop="keywords">
                  <el-input v-model="formData.keywords" placeholder="请输入关键词" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类" prop="category_id">
                  <el-select v-model="formData.category_id" placeholder="请选择分类" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="item in category"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品牌" prop="brand_id">
                  <el-select v-model="formData.brand_id" placeholder="请选择品牌" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="item in brand"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="打折" prop="is_on_sale">
                  <el-radio-group v-model="formData.is_on_sale" size="medium">
                    <el-radio-button
                      v-for="(item, index) in is_on_saleOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                    >{{ item.label }}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="新品" prop="is_new">
                  <el-radio-group v-model="formData.is_new" size="medium">
                    <el-radio-button
                      v-for="(item, index) in is_newOptions"
                      :key="index"
                      :label="item.value"
                      :disabled="item.disabled"
                    >{{ item.label }}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="主图" prop="primary_pic_url">
                  <un-pic :image-url.sync="formData.primary_pic_url" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="列表图" prop="list_pic_url">
                  <un-pic :image-url.sync="formData.list_pic_url" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="轮播图" prop="lbt">
                  <div style="display: flex;flex-wrap: wrap;align-items: center;">
                    <el-button v-if="formData.lbt.length<4" style="margin-right: 10px;" icon="el-icon-plus" circle @click="formData.lbt.push({url:''})" />
                    <un-pic v-for="(item,index) in formData.lbt" :key="item.url+index" style="margin-right: 10px;" :image-url.sync="item.url" />
                    <el-button v-if="formData.lbt.length" style="margin-right: 10px;" icon="el-icon-minus" circle @click="formData.lbt.splice(formData.lbt.length-1,1)" />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="销售量" prop="sell_volume">
                  <el-input-number v-model="formData.sell_volume" placeholder="销售量" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单价" prop="unit_price">
                  <el-input-number v-model="formData.unit_price" placeholder="单价" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="促销说明" prop="promotion_desc">
                  <el-input
                    v-model="formData.promotion_desc"
                    placeholder="请输入促销说明"
                    clearable
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="促销标签" prop="promotion_tag">
                  <el-input
                    v-model="formData.promotion_tag"
                    placeholder="请输入促销标签"
                    clearable
                    :style="{width: '100%'}"
                  />
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
                <el-form-item
                  label="详情页"
                  prop="goods_desc"
                >
                  <div id="detailBox" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item size="large">
                  <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </simble-card>
      </el-col>
      <el-col :span="9">
        <simble-card>
          <h4 style="text-align: center">详情预览</h4>
          <div class="detail" v-html="formData.goods_desc" />
        </simble-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { info, addOrUpdate, del } from '@/api/goods'
import { index as category } from '@/api/category'
import { index as brand } from '@/api/brand'

import SimbleCard from '@/components/SimbleCard'
import UnPic from '@/components/UpPic'
import detailEidt from 'wangeditor'
export default {
  name: 'GoodsEidt',
  components: { UnPic, SimbleCard },
  data() {
    return {
      formData: {
        id: 0,
        name: '',
        retail_price: 200,
        goods_unit: '个',
        counter_price: 200,
        goods_number: 100,
        goods_brief: '',
        keywords: '',
        category_id: '',
        brand_id: '',
        is_on_sale: 0,
        is_new: 1,
        primary_pic_url: '',
        list_pic_url: '',
        sell_volume: '',
        unit_price: 200,
        promotion_desc: '',
        promotion_tag: '',
        goods_desc: '',
        lbt: []
      },
      upPic: '',
      Edit: null,
      category: [],
      brand: [],
      rules: {
        name: [{
          required: true,
          message: '请输入商品名',
          trigger: 'blur'
        }],
        retail_price: [{
          required: true,
          message: '零售价格',
          trigger: 'blur'
        }],
        goods_unit: [{
          required: true,
          message: '请输入单位',
          trigger: 'blur'
        }],
        counter_price: [{
          required: true,
          message: '专柜价格',
          trigger: 'blur'
        }],
        goods_number: [{
          required: true,
          message: '库存',
          trigger: 'blur'
        }],
        goods_brief: [{
          required: true,
          message: '请输入简介',
          trigger: 'blur'
        }],
        keywords: [{
          required: true,
          message: '请输入关键词',
          trigger: 'blur'
        }],
        category_id: [{
          required: true,
          message: '请选择分类',
          trigger: 'change'
        }],
        brand_id: [{
          required: true,
          message: '请选择品牌',
          trigger: 'change'
        }],
        is_on_sale: [{
          required: true,
          message: '打折不能为空',
          trigger: 'change'
        }],
        is_new: [{
          required: true,
          message: '新品不能为空',
          trigger: 'change'
        }],
        primary_pic_url: [{
          required: true,
          message: '请输入主图',
          trigger: 'blur'
        }],
        list_pic_url: [{
          required: true,
          message: '请输入列表图',
          trigger: 'blur'
        }],
        sell_volume: [{
          required: true,
          message: '销售量',
          trigger: 'blur'
        }],
        unit_price: [{
          required: true,
          message: '单价',
          trigger: 'blur'
        }],
        promotion_desc: [{
          required: true,
          message: '请输入促销说明',
          trigger: 'blur'
        }],
        promotion_tag: [{
          required: true,
          message: '请输入促销标签',
          trigger: 'blur'
        }],
        goods_desc: [{
          required: true,
          message: '请编辑详情页',
          trigger: 'blur'
        }],
        lbt: [
          {
            required: true,
            message: '请添加轮播图',
            trigger: 'blur'
          }
        ]
      },
      is_on_saleOptions: [{
        'label': '是',
        'value': 1
      }, {
        'label': '否',
        'value': 0
      }],
      is_newOptions: [{
        'label': '是',
        'value': 1
      }, {
        'label': '否',
        'value': 0
      }]
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  mounted() {
    this.Edit = new detailEidt('#detailBox')
    this.Edit.config.height = 500
    this.Edit.config.onchange = e => {
      this.formData.goods_desc = e
    }
    this.query.isEdit ? this.Edit.create() : ''
    this.getData(this.query.id)
  },
  async created() {
    const fl = await category()
    const pp = await brand({ page: 1, size: 999 })
    this.category = fl.data.filter(r => !!r.parent_id)
    this.brand = pp.data.data
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if (this.formData.lbt.reduce((s, r) => r.url ? s + 1 : s, 0) < 2) {
          this.$message.warning('轮播图至少两张！')
          return
        }
        addOrUpdate(this.formData).then(r => {
          if (!r.errno) {
            if (this.query.id) {
              this.$message.success('编辑商品成功！')
              this.getData(this.query.id)
            } else {
              this.$message.success('新建商品成功！')
              this.back()
            }
          }
        })
        // TODO 提交表单
      })
    },
    back() {
      this.$router.back()
    },
    copyUrl(e) {
      if (this.upPic) {
        e.target.select()
        const state = document.execCommand('copy')
        state ? this.$message.success('复制成功！') : ''
      }
    },
    getData(id) {
      this.query.id ? info({ id }).then(r => {
        if (!r.errno) {
          this.formData = r.data
          this.Edit.txt.html(this.formData.goods_desc)
        }
      }) : ''
    },
    del(id) {
      del({ id }).then(r => {
        if (!r.errno) {
          this.$message.success('删除成功！')
          this.back()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.GoodsEidt{

  .detail{
    height: 80vh;
    overflow: auto;
    p{
      margin: 0;
      padding: 0;
      img{
        width: 100%;
      }
    }
      img{
        width: 100%;
      }
  }
}
</style>
