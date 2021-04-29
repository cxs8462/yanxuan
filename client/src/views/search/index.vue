<template>
  <div class="search">
    <van-sticky :offset-top="0">
      <van-search
        v-model="searchValue"
        show-action
        label="商品"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="$router.back()">返回</div>
        </template>
      </van-search>
    </van-sticky>
    <div class="listBox">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="box">
          <div class="item" v-for="item in data" :key="item.id">
            <goods :data="item" @click.native="onGoods(item.id)" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import http from "@/api/api";
import Goods from "@/components/goods";
export default {
  name: "search",
  components: { Goods },
  data() {
    return {
      searchValue: "",
      loading: false,
      finished: true,
      data: [],
      page: {
        page: 1,
        size: 10,
      },
    };
  },
  methods: {
    onSearch() {
      if (!this.searchValue) this.$toast.fail("请输入搜索内容！");
      this.data = [];
      this.finished = false;
    },
    onLoad() {
      this.loading = true;
      http
        .getGoodsSearch({ keyword: this.searchValue, ...this.page })
        .then((r) => {
          if (this.page.page >= r.totalPages) {
            this.data.push(...r.data);
            this.finished = true;
          } else {
            this.data.push(...r.data);
            this.page.page++;
          }
          this.loading = false;
        });
    },
    onGoods(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  height: 100vh;
  overflow-y: scroll;
  .box {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
  }
}
</style>
