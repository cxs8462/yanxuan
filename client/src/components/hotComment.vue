<template>
  <div class="hotComment" v-if="data.pic_list">
    <van-nav-bar title="品味测评" v-if="data.pic_list.length" />
    <van-nav-bar title="热门评价" v-else />
    <div class="box" v-for="item in data.pic_list" :key="item.id">
      <div class="left">
        <p>{{ data.content }}</p>
        <p>{{ data.add_time }}</p>
      </div>
      <div class="right">
        <img v-lazy="item.pic_url" />
      </div>
    </div>
    <div class="avatarBox" v-if="!data.pic_list.length">
      <p class="content">{{ data.content }}</p>
      <div class="box">
        <div class="avatar">
          <img class="img" v-lazy="data.avatar" />
          <span class="nickname">{{ data.nickname }}</span>
        </div>
        <p class="time">{{ data.add_time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    data: {
      default: {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.hotComment {
  margin: 5px;
  background: white;
  .avatarBox {
    background: #ebecee;
    padding: 10px;
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .avatar {
        display: flex;
        .img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .nickname{
          line-height: 30px;
          margin-left: 10px;
        }
      }
      .time{
        font-size: 14px;
        color: #828e95;
      }
    }

    img {
      width: 100%;
    }
    font-size: 15px;
    .content {
      color: #828e95;
    }
  }
  .box{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding: 10px;
    .left{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #828e95;
    }
    .right{
      img{
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
  }
}
</style>
