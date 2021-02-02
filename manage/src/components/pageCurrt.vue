<template>
  <simble-card>
    <el-pagination
      :current-page="current"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
      class="page"
      @current-change="handleCurrentChange"
    />
  </simble-card>
</template>

<script>
import SimbleCard from '@/components/SimbleCard'
export default {
  name: 'PageCurrt',
  components: { SimbleCard },
  props: {
    size: {
      default: 0
    },
    total: {
      default: 0
    },
    current: {
      default: 1
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.$emit('update:current', e)
      this.$emit('getData')
    }
  }
}
</script>

<style scoped>
.page{
  text-align: center;
  background-color: white;
  border-radius: 10px;
}
</style>
