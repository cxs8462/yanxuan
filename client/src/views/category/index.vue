<template>
  <div class="category">
    <van-nav-bar title="分类" @click-right="search">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="box">
      <div class="nav">
        <van-sidebar v-model="cateIndex" @change="cateChange">
          <van-sidebar-item
            :title="item.name"
            v-for="item in categoryList"
            :key="item.id"
          />
        </van-sidebar>
      </div>
      <div class="content">
        <img class="img" :src="currentCategory.banner_url" />
        <div class="itemBox">
          <p class="title">{{ currentCategory.front_desc }}</p>
          <div class="cate">
            <div
              class="cateItem"
              v-for="item in currentCategory.subCategoryList"
              :key="item.id"
            >
              <cate-item :data="item" @click.native="onCate(item.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/api";
import CateItem from "@/components/cateItemMini";
export default {
  name: "category",
  components: { CateItem },
  created() {
    this.queryId = this.$route.query.id;
    this.init(this.queryId);
  },
  data() {
    return {
      categoryList: [],
      currentCategory: {},
      cateIndex: 0,
      loading: false,
      queryId: undefined,
    };
  },
  methods: {
    getData(id) {
      const obj = id ? { id } : {};
      this.$toast.loading({ message: "加载中..." });
      http.getCatalogInitData(obj).then((r) => {
        this.categoryList = r.categoryList;
        this.currentCategory = r.currentCategory;
        this.$toast.clear();
      });
    },
    init(id) {
      const obj = id ? { id } : {};
      this.$toast.loading({ message: "加载中..." });
      http.getCatalogInitData(obj).then((r) => {
        this.categoryList = r.categoryList;
        this.currentCategory = r.currentCategory;
        if (id) {
          this.categoryList.forEach((item, i) => {
            item.id === id ? (this.cateIndex = i) : "";
          });
          this.queryId = 0;
        }
        this.$toast.clear();
      });
    },
    search() {},
    cateChange(index) {
      this.getData(this.categoryList[index].id);
    },
    onCate(id) {
      this.$router.push({name:'分类详情',query:{id}})
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  height: 95vh;
  overflow-y: scroll;
  .box {
    display: flex;
    flex: 1;
    .nav {
      width: 80px;
      height: 88vh;
      background: white;
    }
    .content {
      flex: 1;
      padding: 10px;
      height: 85vh;
      overflow-y: scroll;
      .img {
        width: 100%;
        border-radius: 7px;
      }
    }
  }
  .itemBox {
    background: white;
    border-radius: 7px;
    overflow: hidden;
    .title {
      text-align: center;
      font-size: 15px;
      margin: 10px 0;
    }
    .cate {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .cateItem {
        width: 33%;
      }
    }
  }
}
</style>
