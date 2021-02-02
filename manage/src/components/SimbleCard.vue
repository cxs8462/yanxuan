<template>
  <el-card class="SimbleCard" shadow="hover">
    <slot />
  </el-card>
</template>

<script>
export default {
  name: 'SimbleCard'
}
</script>

<style lang="scss" scoped>
.SimbleCard{
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0 1px #afd3fa;
  margin: 10px 0;
  &:hover{
    box-shadow: 0 0 3px 1px #409EFF;
  }
}
</style>
