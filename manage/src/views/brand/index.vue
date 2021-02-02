<template>
  <div v-loading="listLoading" class="brand">
    <simble-card>
      <el-row :gutter="18">
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-plus" @click="show=true">增加</el-button>
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
    <el-row :gutter="18">
      <el-col v-for="item in data.data" :key="item.id" :span="8">
        <simble-card>
          <div>
            <div class="head">
              <h4>{{ item.name }}</h4>
              <div class="btn">
                <el-button size="mini" @click="()=>edit(item.id)" circle icon="el-icon-edit" />
                <el-button size="mini" @click="()=>del(item.id)" circle icon="el-icon-delete-solid" />
              </div>
            </div>
            <img style="width: 100%;" :src="item.app_list_pic_url" alt="">
          </div>
        </simble-card>
      </el-col>
    </el-row>
    <page-currt :current.sync="page.current" :total="page.total" :size="page.size" @getData="getData" />
    <brand-info :id.sync="id" :visible.sync="show" @getData="getData"/>
  </div>
</template>

<script>
import SimbleCard from '@/components/SimbleCard'
import { index,del } from '@/api/brand'
import PageCurrt from '@/components/pageCurrt'
import BrandInfo from '@/components/form/BrandInfo'
export default {
  name: 'Brand',
  components: { BrandInfo, PageCurrt, SimbleCard },
  data() {
    return {
      data: [],
      listLoading: false,
      show: false,
      id: 0,
      page: {
        size: 9,
        current: 1,
        total: 1,
        name: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      index({ page: this.page.current, size: this.page.size, name: this.page.name }).then(r => {
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
    edit(id){
      this.id = id
      this.show = true
    },
    del(id) {
      del({ id }).then(r => {
        if (!r.errno) {
          this.$message.success('删除成功！')
          this.getData()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.brand{

  .head{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
