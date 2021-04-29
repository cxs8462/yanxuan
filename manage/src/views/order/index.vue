<template>
  <div class="OrderList">
    <simble-card>
      <el-row :gutter="18">
        <el-col :span="4"><el-input
          v-model="page.bh"
          placeholder="请输入编号"
          prefix-icon="el-icon-search"
        /></el-col>
        <el-col :span="6">
          <el-radio-group v-model="page.typeid" size="medium">
            <el-radio-button
              v-for="(item, index) in typeidList"
              :key="index"
              :label="item.value"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" circle type="primary" @click="search" />
        </el-col>
      </el-row>
    </simble-card>
    <simble-card>
      <el-table
        v-loading="listLoading"
        :data="data.data"
        element-loading-text="加载中数据中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="订单编号" width="180">
          <template slot-scope="scope">
            {{ scope.row.bh }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            {{ scope.row.goods.name }}
          </template>
        </el-table-column>
        <el-table-column label="单价" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.goods.retail_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买数量" width="50" align="center">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="付款价格" align="center">
          <template slot-scope="scope">
            {{ scope.row.price*scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="付款时间" width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="买家用户名" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.user.username }}
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.address.address }}
          </template>
        </el-table-column>
        <el-table-column label="收货人" align="center">
          <template slot-scope="scope">
            {{ scope.row.address.name }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.typeid===1?'warning':'success'">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.typeid===3" type="success">订单完成</el-tag>
            <el-tag v-if="scope.row.typeid===2" type="wrong">待收货</el-tag>
            <el-link v-if="scope.row.typeid===1" @click="()=>fh(scope.row.Id)"><i class="el-icon-goods" />发货</el-link>
          </template>
        </el-table-column>
        <el-table-column label="物流" width="140" align="center">
          <template slot-scope="scope">
            <el-select :value="scope.row.wl" :disabled="scope.row.wl===3" @input="i=>changeWl(i,scope.row.Id)">
              <el-option :value="0" label="未发货" />
              <el-option :value="1" label="待揽收" />
              <el-option :value="2" label="运输中" />
              <el-option :value="3" disabled label="完成" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </simble-card>
    <page-currt :size="page.size" :current.sync="page.current" :total="page.total" @getData="getData" />
  </div>
</template>

<script>
import { index, send, postWl } from '@/api/orderlist'
import SimbleCard from '@/components/SimbleCard'
import PageCurrt from '@/components/pageCurrt'
export default {
  name: 'OrderList',
  components: { SimbleCard, PageCurrt },
  data() {
    return {
      data: {
        count: 0,
        currentPage: 0,
        data: [],
        pageSize: 0,
        totalPages: 0
      },
      page: {
        size: 10,
        current: 1,
        total: 1,
        bh: '',
        typeid: 0
      },
      listLoading: false,
      typeidList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '待发货',
          value: 1
        },
        {
          label: '待收货',
          value: 2
        },
        {
          label: '订单完成',
          value: 3
        }
      ]
    }
  },
  watch: {
    'page.typeid': {
      handler() {
        this.listLoading = true
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      index({ page: this.page.current, size: this.page.size, bh: this.page.bh, typeid: this.page.typeid }).then(r => {
        this.data = r.data
        this.page.size = this.data.pageSize
        this.page.current = this.data.currentPage
        this.page.total = this.data.count
        this.listLoading = false
      })
    },
    search() {
      this.page.current = 1
      this.getData()
      this.page.bh = ''
      this.typeid = 0
    },
    fh(id) {
      this.listLoading = true
      send({ id }).then(r => {
        if (!r.errno) {
          this.$message.success('发货成功！')
          this.getData()
        }
      })
    },
    changeWl(i, id) {
      this.listLoading = true
      postWl({ id, wl: i }).then(r => {
        if (!r.errno) {
          this.$message.success('更新物流状态成功！')
          this.getData()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
