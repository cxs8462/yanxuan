<template>
  <div class="category">
    <simble-card>
      <h4>共{{ filterDataLength }}条数据</h4>
      <el-row :gutter="18">
        <el-col :span="4">
          <el-input
            v-model="filter.name"
            placeholder="名称"
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="4">
          <el-select v-model="filter.is_show">
            <el-option
              v-for="item in isShow"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button circle class="el-icon-plus" type="primary" @click="createCate" />
        </el-col>
      </el-row>
    </simble-card>
    <simble-card>
      <el-tree
        ref="tree"
        :data="filterData"
        :filter-node-method="filterNode"
        class="filter-tree"
        node-key="id"
      >
        <div slot-scope="{ node, data }" class="treeChild">
          <div style="display: flex;align-items: center;"><img style="width: 20px;margin-right: 10px;" :src="data.icon_url">{{ data.name }}</div>
          <span>
            <el-button v-if="data.level===1" type="text" @click.stop="()=>add(data)">增加</el-button>
            <el-button type="text" @click.stop="()=>getInfo(data)">编辑</el-button>
            <el-button v-if="!data.children||!data.children.length" @click.stop="()=>del(data)" type="text">删除</el-button>
          </span>
        </div>
      </el-tree>
    </simble-card>
    <category-info @getData="getData" :id.sync="form.id" :visible.sync="form.show" :category="filterData" :parent_id.sync="form.parent_id" />
  </div>
</template>

<script>
import { index, del } from '@/api/category'
import SimbleCard from '@/components/SimbleCard'
import CategoryInfo from '@/components/form/CategoryInfo'

export default {
  name: 'Category',
  components: { CategoryInfo, SimbleCard },
  data() {
    return {
      list: [],
      isLoading: false,
      filter: {
        name: '',
        is_show: 1,
        show_index: 1
      },
      isShow: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        show: false,
        id: 0,
        parent_id: 0
      }
    }
  },
  computed: {
    filterData() {
      return this.createTree(this.list.filter(r => r.is_show === this.filter.is_show))
    },
    filterDataLength() {
      return this.filterData.reduce((s, r) => {
        s += r.children.length
        return s
      }, 0)
    }
  },
  watch: {
    'filter.name': {
      handler(val) {
        this.$refs.tree.filter(val)
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.isLoading = true
      index().then(r => {
        this.list = r.data
        this.isLoading = false
      })
    },
    del({ id }) {
      del({ id }).then(r => {
        if (!r.errno) {
          this.$message.success('删除成功！')
          this.getData()
        }
      })
    },
    createTree(data) {
      const tree = []
      data.forEach(r => {
        if (r.level === 1) tree.push(r)
      })
      tree.forEach(r => {
        r.children = data.filter(s => s.parent_id === r.id)
      })
      return tree
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    add({ id }) {
      this.form.parent_id = id
      this.form.show = true
    },
    getInfo({ id }) {
      this.form.id = id
      this.form.show = true
    },
    createCate() {
      this.form.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.category{
  min-height: 50vh;
}
.treeChild{
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
