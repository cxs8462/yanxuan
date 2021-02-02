<template>
  <div v-loading="loading" class="index">
    <el-row :gutter="12">
      <el-col :offset="2" :span="20">
        <simble-card>
          <div>
            <el-calendar :value="new Date()" />
          </div>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card>
          <p style="text-align: center;">
            <el-tag @click="$router.push({name:'商品列表'})" style="font-size: 15px;cursor: pointer;" effect="plain">商品：{{ goods.count }}</el-tag>
          </p>
          <el-timeline>
            <el-timeline-item
              v-for="item in goods.data"
              :key="item.id"
              color="#409eff"
              :timestamp="item.name"
            />
          </el-timeline>
        </simble-card>
        <simble-card>
          <p style="text-align: center;">
            <el-tag @click="$router.push({name:'分类列表'})" style="font-size: 15px;cursor: pointer;" type="success" effect="plain">分类：{{ category.length }}</el-tag>
          </p>
          <el-tree
            ref="tree"
            accordion
            :data="categoryTree"
            node-key="id"
          >
            <div slot-scope="{ node, data }" class="treeChild">
              <div style="display: flex;align-items: center;"><img style="width: 20px;margin-right: 10px;" :src="data.icon_url">{{ data.name }}</div>
            </div>
          </el-tree>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card>
          <p style="text-align: center;">
            <el-tag @click="$router.push({name:'品牌管理'})" style="font-size: 15px;cursor: pointer;" type="info" effect="plain">品牌：{{ brand.count }}</el-tag>
          </p>
          <el-timeline>
            <el-timeline-item
              v-for="item in brand.data"
              :key="item.id"
              color="#909399"
              :timestamp="item.name"
            />
          </el-timeline>
        </simble-card>
        <simble-card>
          <p style="text-align: center;">
            <el-tag  @click="$router.push({name:'订单管理'})" style="font-size: 15px;cursor: pointer;" type="warning" effect="plain">订单：{{ orderlist.count }}</el-tag>
          </p>
          <el-timeline>
            <el-timeline-item
              v-for="item in orderlist.data"
              :key="item.id"
              color="#ecab3c"
              :timestamp="item.time"
              placement="top"
            >
              <el-card>
                <p style="display: flex;justify-content: space-between;">
                  <span>{{ item.bh }}</span>
                  <span>{{ item.goods.name }}</span>
                </p>
                <el-steps :active="item.typeid" finish-status="success">
                  <el-step title="待发货" />
                  <el-step title="待收货" />
                  <el-step title="订单完成" />
                </el-steps>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </simble-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SimbleCard from '@/components/SimbleCard'
import { goodsList } from '@/api/goods'
import { index as category } from '@/api/category'
import { index as orderlist } from '@/api/orderlist'
import { index as brand } from '@/api/brand'
export default {
  name: 'Index',
  components: { SimbleCard },
  data() {
    return {
      goods: {},
      category: [],
      orderlist: {},
      brand: {},
      loading: false
    }
  },
  computed: {
    categoryTree() {
      return this.createTree(this.category)
    }
  },
  async created() {
    this.loading = true
    this.goods = (await goodsList()).data
    this.category = (await category()).data
    this.brand = (await brand()).data
    this.orderlist = (await orderlist({ page: 1, size: 5, typeid: 0 })).data
    this.loading = false
  },
  methods: {
    createTree(data) {
      const tree = []
      data.forEach(r => {
        if (r.level === 1) tree.push(r)
      })
      tree.forEach(r => {
        r.children = data.filter(s => s.parent_id === r.id)
      })
      return tree
    }
  }
}
</script>

<style lang="scss" scoped>
.index {

}
</style>
