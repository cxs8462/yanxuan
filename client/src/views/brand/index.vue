<template>
  <div class="brand">
    <van-sticky :offset-top="0">
      <van-nav-bar @click-left="$router.back()" title="品牌"></van-nav-bar>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <brand-item
        :data="item"
        v-for="item in list"
        :key="item.id"
        @click.native="onBrand(item.id)"
      />
    </van-list>
  </div>
</template>

<script>
import http from "@/api/api";
import BrandItem from "@/components/brandItem";
export default {
  name: "brand",
  components: { BrandItem },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 5,
      },
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      http.getBrandList({ ...this.page }).then((r) => {
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
    onBrand(id) {
      this.$router.push({ name: "品牌详情", query: { id } });
    },
  },
};
</script>

<style scoped></style>
