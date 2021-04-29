<template>
  <div class="layout">
    <keep-alive>
      <router-view v-if="$route.meta.isKeep" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeep" />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="orders-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/topic" icon="smile-comment-o"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/brand" icon="shop-o"
      >品牌</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "layout",
  created() {
    if(!this.$store.state.userInfo) this.$store.dispatch("getLogin");
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.layout {
  padding-bottom: 30px;
}
</style>
