<template>
  <div class="barndItem">
    <img v-lazy="data.app_list_pic_url" />
    <div class="content">
      <div class="left">
        <span class="price">{{data.floor_price}}</span>元起
      </div>
      <div class="right">
        {{data.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "brandItem",
  props: {
    data: {
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
.barndItem{
  margin: 10px;
  background: white;
  img{
    width: 100%;
    height: 180px;
  }
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    .left{
      font-size: 15px;
      color: #c0392b;
      .price{
        font-size: 17px;
      }
    }
    .right{
      font-size: 17px;
      color: #828e95;
    }
  }
}
</style>
