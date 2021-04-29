<template>
  <div class="goods">
    <div class="img">
      <img v-lazy="data.list_pic_url" />
    </div>
    <div class="detail">
      <p class="title">{{ data.name }}</p>
      <div class="priceBox">
        <p class="price">￥{{ data.retail_price }}</p>
        <p class="set">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods",
  props: {
    data: {
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
.goods{
  background: white;
  margin: 5px;
  border-radius: 5px;
  height: 250px;
  overflow: hidden;
  img{
    width: 100%;
    height: 180px;
  }
  .detail{
    padding: 5px;
    .title{
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .priceBox{
      display: flex;
      justify-content: space-between;
      .price{
        font-size: 16px;
        color: #c0392b;
        margin-top: 5px;
      }
    }
  }
}
</style>
