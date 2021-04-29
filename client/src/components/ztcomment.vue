<template>
  <div class="comment">
    <van-nav-bar
      title="评论"
      right-text="发表评论"
      @click-right="onClickRight"
    />
    <div class="box">
      <div class="content" v-if="data.length">
        <div class="avatar" v-for="item in data" :key="item.id">
          <img class="avat" v-lazy="item.user_info.avatar" />
          <p class="nickname">{{ item.user_info.nickname }}</p>
          <p class="addTime">{{ item.add_time }}</p>
          <p class="subtitle">
            {{ item.content }}
          </p>
        </div>
      </div>
      <van-empty description="暂无评论" v-else />
    </div>
    <van-popup v-model="sendShow" position="bottom" :style="{ height: '30%' }">
      <van-nav-bar
        title="发表评论"
        left-text="取消"
        right-text="发表"
        @click-right="send"
        @click-left="sendShow = false"
      />
      <van-field
        v-model="comment"
        :rows="5"
        type="textarea"
        :maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";
export default {
  name: "comment",
  created() {
    this.getData();
  },
  watch: {
    id() {
      this.getData();
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      data: [],
      sendShow: false,
      comment: "",
    };
  },
  methods: {
    onClickRight() {
      this.comment = "";
      this.sendShow = true;
    },
    send() {
      if (!this.comment) {
        this.$toast.fail("评论不能为空！");
        return;
      }
      this.$toast.loading({message:'发送评论中！'});
      http
        .postSetComment({ content: this.comment, typeId: 1, valueId: this.id })
        .then(() => {
          this.sendShow = false;
          this.getData();
        });
    },
    getData() {
      http.getCommentList({ typeId: 1, valueId: this.id }).then((r) => {
        this.data = r.data;
        this.$toast.clear();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  margin: 10px;
  background: white;
  .box {
    min-height: 150px;
    max-height: 250px;
    overflow-y: scroll;
  }
  .content {
    padding-bottom: 10px;
  }
  .avatar {
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 5px;
    .avat {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .nickname {
      width: 40px;
      text-align: center;
      position: absolute;
      bottom: -5px;
      left: 10px;
      font-size: 10px;
      color: #454c50;
    }
    .addTime {
      position: absolute;
      font-size: 10px;
      bottom: -5px;
      right: 5px;
      color: #828e95;
    }
    .subtitle {
      position: relative;
      font-size: 15px;
      margin-left: 10px;
      padding: 10px;
      background-color: #d2d6d9;
      border-radius: 10px;
      flex: 1;
      word-wrap: break-word;
      word-break: break-all;
      &:after {
        position: absolute;
        width: 0;
        height: 0;
        content: "";
        top: 50%;
        left: -15px;
        transform: translate(0, -50%);
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid #d2d6d9;
      }
    }
  }
}
</style>
