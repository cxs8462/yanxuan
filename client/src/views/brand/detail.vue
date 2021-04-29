<template>
  <div class="brandDetail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
        :title="data.name"
      ></van-nav-bar>
      <van-notice-bar
        left-icon="volume-o"
        scrollable
        :text="`${data.name}，${data.simple_desc}全场${data.floor_price}起`"
      />
    </van-sticky>
    <div class="content">
      <img v-lazy="data.pic_url" />
      <p class="text">{{ data.simple_desc }}</p>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="box">
        <div class="item" v-for="item in list" :key="item.id">
          <goods :data="item" @click.native="onGoods(item.id)" />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import http from "@/api/api";
import Goods from "@/components/goods";
export default {
  name: "brandDetail",
  components: { Goods },
  data() {
    return {
      id: this.$route.query.id,
      data: {},
      page: {
        page: 1,
        size: 10,
      },
      loading: false,
      finished: false,
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      http.getBrandDetail({ id: this.id }).then((r) => {
        this.data = r.brand;
      });
    },
    onLoad() {
      this.loading = true;
      http.getGoodsData({ brandId: this.id, ...this.page }).then((r) => {
        if (this.page.page >= r.totalPages) {
          this.list.push(...r.data);
          this.finished = true;
        } else {
          this.list.push(...r.data);
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
.brandDetail {
  .content {
    margin: 10px;
    background: white;
    img {
      width: 100%;
    }
    .text {
      padding: 5px;
      font-size: 14px;
      color: #828e95;
    }
  }
  .box {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
  }
}
</style>
