<template>
  <div class="cateDatail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
        title="文章详情"
      ></van-nav-bar>
      <van-notice-bar
        left-icon="volume-o"
        scrollable
        :text="`${data.title}，${data.subtitle}，阅读量${data.read_count}，价格：${data.price_info}起`"
      />
    </van-sticky>
    <p class="title">
      <van-tag class="tag" plain type="primary">{{ data.title }}</van-tag>
    </p>
    <div class="avatar">
      <img class="avat" v-lazy="data.avatar" />
      <div class="subtitle">
        {{ data.subtitle }}
      </div>
    </div>
    <div class="content" v-html="data.content"></div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      评论
    </van-divider>
    <comment/>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      相关文章推荐
    </van-divider>
    <div class="listBox">
      <topic-item @click.native="onTopic(item.id)" v-for="item in recommended" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script>
import http from "@/api/api";
import Topic from "@/components/topic";
import Comment from "@/components/ztcomment";
export default {
  name: "cateDetail",
  components: { Comment, TopicItem: Topic },
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
      data: {},
      recommended: [],
      comment: [],
    };
  },
  methods: {
    getData() {
      http.getTopicDetail({ id:this.id }).then((r) => {
        this.data = r;
      });
      http.getTopicDetailRelated({ id:this.id }).then((r) => {
        this.recommended = r;
      });
    },
    onTopic(id) {
      this.$router.push({ query: { id } });
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.cateDatail {
  .content {
    &/deep/ img {
      width: 100%;
    }
  }
  .title {
    text-align: center;
    margin: 10px 0;
    .tag {
      padding: 10px;
      font-size: 16px;
    }
  }
  .avatar {
    padding: 10px;
    display: flex;
    align-items: center;
    .avat {
      width: 40px;
      border-radius: 50%;
    }
    .subtitle {
      position: relative;
      font-size: 14px;
      margin-left: 10px;
      padding: 5px;
      background-color: #d2d6d9;
      border-radius: 10px;
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
