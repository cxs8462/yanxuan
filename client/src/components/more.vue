<template>
  <div class="more">
    <p class="icon"><van-icon name="arrow" /></p>
    <p class="content">更多</p>
  </div>
</template>

<script>
export default {
  name: "more"
};
</script>

<style lang="less" scoped>
.more{
  background: white;
  margin: 5px;
  border-radius: 5px;
  height: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon{
    font-size: 20px;
  }
  .content{
    font-size: 20px;
  }
}
</style>
