<template>
  <div class="cateDetail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
        :title="parentCategory.name"
      ></van-nav-bar>
      <van-notice-bar
        left-icon="volume-o"
        scrollable
        :text="`${currentCategory.name}，${currentCategory.front_desc}`"
      />
      <van-tabs v-model="selected" @change="changeSelect">
        <van-tab
          v-for="item in brotherCategory"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        ></van-tab>
      </van-tabs>
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
  name: "cateDetail",
  components: { Goods },
  created() {
    this.init(this.$route.query.id);
  },
  data() {
    return {
      currentCategory: {},
      brotherCategory: [],
      parentCategory: {},
      page: {
        page: 1,
        size: 10,
      },
      loading: false,
      finished: false,
      data: [],
      selected: this.$route.query.id,
    };
  },
  methods: {
    init(id) {
      http.getCategoryNavData({ id }).then((r) => {
        this.currentCategory = r.currentCategory;
        this.brotherCategory = r.brotherCategory;
        this.parentCategory = r.parentCategory;
      });
    },
    changeSelect() {
      this.page.page = 1;
      this.data = [];
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      this.loading = true;
      this.init(this.selected);
      http
        .getGoodsData({ categoryId: this.selected, ...this.page })
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
.cateDetail {
  .box {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
  }
}
</style>
