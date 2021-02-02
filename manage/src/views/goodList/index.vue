<template>
  <div class="goodlist">
    <simble-card>
      <el-row :gutter="18">
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-plus" @click="$router.push({name:'商品编辑',query:{isEdit:true}})">增加</el-button>
        </el-col>
        <el-col :offset="14" :span="5"><el-input
          v-model="page.name"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        /></el-col>
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
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="单价" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.retail_price+'/'+scope.row.goods_unit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.goods_number }}
          </template>
        </el-table-column>
        <el-table-column label="是否新品" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_new?'success':'warning'">{{ scope.row.is_new?'是':'否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作" width="200">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" @click="$router.push({name:'商品编辑',query:{id:scope.row.id,isEdit:true}})">编辑</el-link>
            <el-link style="margin-left: 10px" @click="$router.push({name:'商品编辑',query:{id:scope.row.id,isEidt:false}})"><i class="el-icon-view el-icon--right" />查看</el-link>
            <el-link style="margin-left: 10px" @click="()=>del(scope.row.id)"><i class="el-icon-delete" />删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </simble-card>
    <page-currt :size="page.size" :current.sync="page.current" :total="page.total" @getData="getData" />
  </div>
</template>

<script>
import { goodsList, del } from '@/api/goods'
import PageCurrt from '@/components/pageCurrt'
import SimbleCard from '@/components/SimbleCard'

export default {
  name: 'Goodlist',
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
        name: ''
      },
      listLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      goodsList({ page: this.page.current, size: this.page.size, name: this.page.name }).then(r => {
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
      this.page.name = ''
    },
    del(id) {
      del({ id }).then(r => {
        if (!r.errno) {
          this.$message.success('删除成功！')
          this.getData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goodlist{
  .set{
    margin-bottom: 10px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 3px 0px #97a8be;
  }
  .bor-rg{
    border-radius: 10px;
    box-shadow: 0 0 3px 0px #97a8be;
  }
}
</style>
