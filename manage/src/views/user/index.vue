<template>
  <div class="OrderList">
    <simble-card>
      <el-table
        v-loading="listLoading"
        :data="data.data"
        element-loading-text="加载中数据中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" type="index" width="50" />
        <el-table-column label="头像" width="200" align="center">
          <template slot-scope="scope">
            <div class="imgBox">
              <img class="img" :src="scope.row.avatar">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickname" />
        <el-table-column label="手机号码" prop="mobile" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender?scope.row.gender===1?'男':'女':'保密' }}
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday" />
      </el-table>
    </simble-card>
    <page-currt :size="page.size" :current.sync="page.current" :total="page.total" @getData="getData" />
  </div>
</template>

<script>
import { user } from '@/api/user'
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
        total: 1
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
      user({ page: this.page.current, size: this.page.size }).then(r => {
        this.data = r.data
        this.page.size = this.data.pageSize
        this.page.current = this.data.currentPage
        this.page.total = this.data.count
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.imgBox{
  width: 100%;
  text-align: center;
  padding: 10px;
  .img{
    width: 100px;
  }
}
</style>
