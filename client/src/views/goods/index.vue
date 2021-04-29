<template>
  <div class="goodsDetail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
        :title="info.name"
      >
        <template #right>
          <van-icon @click="showShare = true" name="share-o" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img class="banner" v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="detail">
      <div class="price">
        <div class="left">
          ￥<span class="retail">{{ info.retail_price }}</span>
          <van-tag color="#f39c12" plain>{{ info.promotion_desc }}</van-tag>
          <span class="ago">￥{{ info.retail_price + 100 }}</span>
        </div>
        <div class="right">
          <van-icon name="star-o" v-if="isSc" @click="() => sc(0)" />
          <van-icon name="star" v-else @click="() => sc(0)" />
        </div>
      </div>
      <div class="info">
        <p class="title">
          <van-tag v-if="info.is_new" color="#f39c12" plain>新品</van-tag
          >{{ info.name }}
        </p>
        <p class="desc">{{ info.goods_brief }}</p>
      </div>
    </div>
    <div class="attribute">
      <van-collapse v-model="attributeClub">
        <van-collapse-item
          v-for="item in attribute"
          :key="item.name"
          :title="item.name"
          :name="item.name"
          >{{ item.value }}</van-collapse-item
        >
      </van-collapse>
    </div>
    <goodscomment />
    <hot-comment :data="comment" />
    <van-collapse v-model="issueClub">
      <van-collapse-item
        v-for="item in issue"
        :key="item.goods_id"
        :title="item.question"
        :name="item.id"
        >{{ item.answer }}</van-collapse-item
      >
    </van-collapse>
    <div class="infoTitle">
      <van-divider>产品介绍</van-divider>
    </div>
    <div class="desc" v-html="info.goods_desc"></div>
    <van-goods-action>
      <van-goods-action-icon
        @click="() => sc(0)"
        color="#ff5000"
        icon="star-o"
        text="收藏"
        v-if="isSc"
      />
      <van-goods-action-icon
        @click="() => sc(0)"
        color="#ff5000"
        icon="star"
        text="收藏"
        v-else
      />
      <van-goods-action-icon
        color="#ee0a24"
        icon="shopping-cart"
        :badge="carSize"
        text="购物车"
        @click="gotoCar"
      />
      <van-goods-action-button
        @click="skuShow = true"
        type="warning"
        text="加入购物车"
      />
    </van-goods-action>
    <select-goods
      v-if="productList.length"
      :show.sync="skuShow"
      :data="{ ...info, productId: productList[0].id }"
      @addCar="addCar"
    />
  </div>
</template>

<script>
import http from "@/api/api";
import goodscomment from "@/components/goodscomment";
import hotComment from "@/components/hotComment";
import SelectGoods from "@/components/selectGoods";
export default {
  name: "goodsDetail",
  components: { SelectGoods, goodscomment, hotComment },
  created() {
    this.getData();
    this.$store.state.userInfo ? this.getCarSize() : "";
  },
  data() {
    return {
      id: this.$route.query.id,
      showShare: false,
      skuShow: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      info: {},
      productList: [],
      issue: {},
      gallery: [],
      attribute: [],
      attributeClub: [],
      comment: {},
      issueClub: [],
      carSize: 0,
    };
  },
  computed: {
    isSc() {
      console.log(
        this.$store.state.goodsSc.filter((r) => r.value_id === this.info.id)
      );
      return !this.$store.state.goodsSc.filter(
        (r) => r.value_id === this.info.id
      ).length;
    },
  },
  methods: {
    getData() {
      http.getGoodsDetail({ id: this.id }).then((r) => {
        this.info = r.info;
        this.productList = r.productList;
        this.issue = r.issue;
        this.issueClub = this.issue.map((s) => s.id);
        this.gallery = r.gallery;
        this.attribute = r.attribute;
        this.attributeClub = this.attribute.length
          ? this.attribute.map((s) => s.name)
          : [];
        this.comment = r.comment.data;
      });
    },
    addCar(data) {
      http.postAddCart(data).then((r) => {
        if (!r.errno) {
          this.$toast.success("已加入购物车");
          this.skuShow = false;
          this.getCarSize();
        }
      });
    },
    getCarSize() {
      http.getCartNum().then((r) => {
        this.carSize = r.cartTotal.goodsCount;
      });
    },
    gotoCar() {
      this.$router.push({ name: "购物车" });
    },
    sc(i) {
      this.$toast.loading({ message: "操作中..." });
      http.postDoLikes({ typeId: i, valueId: this.info.id }).then((r) => {
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
.goodsDetail {
  img {
    width: 100%;
  }
  .banner {
    height: 300px;
  }
  .detail {
    background: white;
    padding: 5px;
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 21px;
      color: #f39c12;
      .left {
        font-size: 17px;
        .retail {
          font-size: 23px;
          margin-right: 10px;
        }
        .ago {
          font-size: 23px;
          margin-left: 10px;
          color: #d5880c;
          text-decoration: line-through;
        }
      }
    }
    .info {
      padding: 10px;
      .title {
        font-size: 17px;
      }
      .desc {
        margin-top: 5px;
        font-size: 16px;
        color: #828e95;
      }
    }
  }
  padding-bottom: 50px;
  .desc {
    &/deep/img {
      width: 100%;
    }
  }
  .infoTitle {
    background: white;
    padding: 20px 0;
  }
}
</style>
