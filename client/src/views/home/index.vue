<template>
  <div class="home">
    <img class="bg" v-if="banner.length" :src="banner[bgIndex].image_url" />
    <van-sticky :offset-top="0">
      <van-search
        show-action
        label="商品"
        placeholder="请输入搜索关键词"
        @focus="$router.push({ name: '搜索' })"
      >
        <template #action>
          <div @click="$router.push({ name: '搜索' })">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <van-swipe
      class="bannerBox"
      @change="(i) => (bgIndex = i)"
      :autoplay="3000"
    >
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img
          @click="() => bannerClick(image)"
          class="banner"
          v-lazy="image.image_url"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="menu">
      <div
        class="item"
        @click="channelClick(item.id)"
        v-for="item in channel"
        :key="item.id"
      >
        <div class="channelIcon">
          <van-image :src="item.icon_url" />
        </div>
        <p class="channelTitle">
          <span>{{ item.name }}</span>
        </p>
      </div>
    </div>
    <div class="brand box">
      <div
        class="item"
        @click="onBrand(item.id)"
        v-for="item in brandList"
        :key="item.id"
      >
        <img class="pic" :src="item.app_list_pic_url" />
        <span class="title">{{ item.name }}</span>
      </div>
    </div>
    <topic
      v-for="item in topicList"
      @click.native="onTopic(item.id)"
      :key="item.id"
      :data="item"
    />
    <div class="category" v-for="item in categoryList" :key="item.id">
      <p class="fl">{{ item.name }}</p>
      <div class="flList">
        <div class="flItem" v-for="data in item.goodsList" :key="data.id">
          <goods @click.native="onGoods(data.id)" :data="data" />
        </div>
        <div class="flItem">
          <more @click.native="onMore(item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/api";
import Topic from "@/components/topic";
import Goods from "@/components/goods";
import More from "@/components/more";
export default {
  name: "home",
  components: { More, Goods, Topic },
  created() {
    this.getData();
  },
  data() {
    return {
      banner: [],
      channel: [],
      newGoodsList: [],
      hotGoodsList: [],
      brandList: [],
      topicList: [],
      categoryList: [],
      bgIndex: 1,
    };
  },
  methods: {
    getData() {
      http.getHomeData({}).then((r) => {
        this.banner = r.banner;
        this.channel = r.channel;
        this.newGoodsList = r.newGoodsList;
        this.hotGoodsList = r.hotGoodsList;
        this.brandList = r.brandList;
        this.topicList = r.topicList;
        this.categoryList = r.categoryList;
      });
    },
    bannerClick(item) {
      console.log(item);
    },
    channelClick(id) {
      this.$router.push({ name: "分类", query: { id } });
    },
    onBrand(id) {
      this.$router.push({ name: "品牌详情", query: { id } });
    },
    onMore(id) {
      this.$router.push({ name: "分类详情", query: { id } });
    },
    onGoods(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
    onTopic(id) {
      this.$router.push({ name: "专题详情", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
}
.banner {
  width: 100%;
}
.bannerBox {
  height: 200px;
  margin: 10px;
  border-radius: 10px;
}
.bg {
  position: absolute;
  width: 100%;
  height: 300px;
  top: 70px;
  left: 0;
  filter: blur(30px);
  z-index: 0;
}
.channelIcon {
  padding: 0 10px;
}
.channelTitle {
  text-align: center;
  font-size: 14px;
}
.box {
  background: white;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.brand {
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 0px 1px 1px #a7a7a7;
  .item {
    position: relative;
    width: 50%;
    height: 90px;
    .pic {
      width: 100%;
    }
    .title {
      position: absolute;
      font-size: 13px;
      bottom: 10px;
      right: 10px;
      color: #f1f2f6;
      font-weight: bold;
    }
  }
}
.menu {
  display: flex;
  flex: 1;
  padding: 10px;
  .item {
    width: 20%;
  }
}
.category {
  .fl {
    font-size: 15px;
    font-weight: bolder;
    color: #828e95;
    margin-left: 10px;
  }
  .flList {
    display: flex;
    flex-wrap: wrap;
    .flItem {
      width: 50%;
    }
  }
}
</style>
