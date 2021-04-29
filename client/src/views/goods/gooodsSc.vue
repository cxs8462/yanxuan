<template>
  <div class="gooodsSc">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        title="收藏"
      >
      </van-nav-bar>
    </van-sticky>
    <div class="listBox">
      <div class="box">
        <div class="item" v-for="item in list" :key="item.id">
          <goods :data="item" @click.native="onGoods(item.value_id)">
            <p class="sc"><van-icon color="#f39c12" plain name="star" @click.stop="() => sc(0,item.value_id)" /></p>
          </goods>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Goods from "@/components/goods";
import http from "@/api/api";

export default {
  name: "gooodsSc",
  components: { Goods },
  created() {
    this.$store.dispatch("getGoodsSc");
  },
  computed: {
    list() {
      return this.$store.state.goodsSc;
    },
  },
  methods: {
    onGoods(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
    sc(i,id) {
      this.$toast.loading({ message: "操作中..." });
      http.postDoLikes({ typeId: i, valueId: id }).then((r) => {
        if (!r.errno) {
          this.$store.dispatch("getGoodsSc");
          this.$toast.clear();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.gooodsSc {
  height: 100vh;
  overflow-y: scroll;
  .box {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
  }
  .sc{
    font-size: 17px;
    padding: 5px;
  }
}
</style>
