<template>
  <div class="gooodsSc">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        title="足迹"
      >
      </van-nav-bar>
    </van-sticky>
    <div class="listBox">
      <div class="box">
        <div class="item" v-for="item in list" :key="item.id">
          <goods :data="item" @click.native="onGoods(item.value_id)">
            <p class="sc">
              <span>{{ item.add_time }}</span>
              <van-icon
                color="#f39c12"
                plain
                name="delete"
                @click.stop="() => del(item.id)"
              />
            </p>
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
  name: "record",
  components: { Goods },
  created() {
    this.getData();
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onGoods(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
    getData() {
      http.getFoot().then((r) => {
        this.list = r.data.reduce((total, r) => {
          total.push(...r);
          return total;
        }, []);
      });
    },
    del(id) {
      this.$toast.loading({ message: "删除中..." });
      http.postDelFoot({ footprintId: id }).then((r) => {
        if (!r.errno) {
          this.getData();
          this.$toast.success({ message: "删除成功！" });
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
  .sc {
    span {
      margin-right: 10px;
    }
    font-size: 15px;
    padding: 10px 0;
    color: #f39c12;
    display: flex;
    align-items: center;
  }
}
</style>
