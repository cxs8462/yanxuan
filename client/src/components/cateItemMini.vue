<template>
  <div class="cateitem">
    <img class="img" v-lazy="data.wap_banner_url"/>
    <p class="desc">{{data.front_desc}}</p>
    <p class="title">{{data.name}}</p>
  </div>
</template>

<script>
export default {
  name: "cateItem",
  props:{
    data:{
      default:{}
    }
  }
};
</script>

<style lang="less" scoped>
.cateitem{
  padding: 5px;
  height: 130px;
  overflow: hidden;
  .img{
    width: 100%;
    background: #f1f2f6;
    border-radius: 5px;
  }
  .title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
    color: #454c50;
  }
  .desc{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 8px;
    text-align: center;
    color: #828e95;
  }
}
</style>
