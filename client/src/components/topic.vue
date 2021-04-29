<template>
  <div class="topic">
    <div class="img">
      <img v-lazy="data.item_pic_url"/>
    </div>
    <p class="title">{{data.title}}</p>
    <div class="avatar">
      <img class="avat" v-lazy="data.avatar"/>
      <div class="subtitle">
        {{data.subtitle}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topic",
  props: {
    data: {
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
.topic{
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0px 0px 1px 1px #a7a7a7;
  .title{
    font-size: 15px;
    margin-top: -40px;
    padding: 10px;
    color: #f7f8fa;
    font-weight: bold;
  }
  img{
    width: 100%;
  }
  .img{
    height: 200px;
    overflow: hidden;
  }
  .avatar{
    padding: 10px;
    display: flex;
    align-items: center;
    .avat{
      width: 40px;
      border-radius: 50%;
    }
    .subtitle{
      position: relative;
      font-size: 14px;
      margin-left: 10px;
      padding: 5px;
      background-color: #d2d6d9;
      border-radius: 10px;
      &:after{
        position: absolute;
        width: 0;
        height: 0;
        content: '';
        top: 50%;
        left: -15px;
        transform: translate(0,-50%);
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid #d2d6d9;
      }
    }
  }
}
</style>
