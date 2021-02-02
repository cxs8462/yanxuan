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
      <el-col :span="12">
        <simble-card v-for="item in data.data.slice(0,5)" :key="item.id">
          <div>
            <div class="head">
              <div class="btn">
                <el-button size="mini" circle icon="el-icon-edit" @click="()=>edit(item.id)" />
                <el-button size="mini" circle icon="el-icon-delete-solid" @click="()=>del(item.id)" />
              </div>
            </div>
            <img style="width: 100%;" :src="item.item_pic_url" alt="">
            <h4 style="display: flex;justify-content: space-between;"><span>{{ item.title }}</span><span style="color: #5a5e66;">阅读量：{{item.read_count}}</span></h4>
            <p class="subTitle">{{item.subtitle}}</p>
          </div>
        </simble-card>
      </el-col>
      <el-col :span="12">
        <simble-card v-for="item in data.data.slice(5,10)" :key="item.id">
          <div>
            <div class="head">
              <div class="btn">
                <el-button size="mini" circle icon="el-icon-edit" @click="()=>edit(item.id)" />
                <el-button size="mini" circle icon="el-icon-delete-solid" @click="()=>del(item.id)" />
              </div>
            </div>
            <img style="width: 100%;" :src="item.item_pic_url" alt="">
            <h4 style="display: flex;justify-content: space-between;"><span>{{ item.title }}</span><span style="color: #5a5e66;">阅读量：{{item.read_count}}</span></h4>
            <p class="subTitle">{{item.subtitle}}</p>
          </div>
        </simble-card>
      </el-col>
    </el-row>
    <page-currt :current.sync="page.current" :total="page.total" :size="page.size" @getData="getData" />
    <topic-info :id.sync="id" :show.sync="show" @getData="getData"/>
  </div>
</template>

<script>
import SimbleCard from '@/components/SimbleCard'
import { index, del } from '@/api/topic'
import PageCurrt from '@/components/pageCurrt'
import TopicInfo from '@/components/form/TopicInfo'
export default {
  name: 'Topic',
  components: { TopicInfo, PageCurrt, SimbleCard },
  data() {
    return {
      data: {
        data:[]
      },
      listLoading: false,
      show: false,
      id: 0,
      page: {
        size: 10,
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
    edit(id) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.brand{
  .head{
    margin-bottom: 10px;
   .btn{
     text-align: right;
   }
  }
  .subTitle{
    color: #8c939d;
  }
}
</style>
