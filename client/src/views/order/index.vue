<template>
  <div class="order">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
        title="订单详情"
      >
      </van-nav-bar>
    </van-sticky>
    <van-tabs v-model="active">
      <van-tab title="全部" :name="0">
        <van-card
          style="margin-top: 10px"
          v-for="item in list"
          :key="item.Id"
          :num="item.number"
          :price="item.price"
          :desc="item.shop.name"
          :title="'订单编号:' + item.bh"
          :thumb="item.shop.list_pic_url"
          @click-thumb="() => toShop(item.shopid)"
        >
          <template #footer>
            <div class="footer">
              <div class="dsh" v-if="item.typeid === 1">
                <van-button disabled>待发货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 2">
                <van-button @click="() => open(item)">查看物流</van-button>
                <van-button @click="() => sh(item.Id)">收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 3">
                <van-button v-if="!item.comment" @click="()=>pl(item)">评论</van-button>
                <van-button v-else @click="()=>read(item)">查看评论</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待发货" :name="1">
        <van-card
          style="margin-top: 10px"
          v-for="item in list1"
          :key="item.Id"
          :num="item.number"
          :price="item.price"
          :desc="item.shop.name"
          :title="'订单编号:' + item.bh"
          :thumb="item.shop.list_pic_url"
          @click-thumb="() => toShop(item.goods_id)"
        >
          <template #footer>
            <div class="footer">
              <div class="dsh" v-if="item.typeid === 1">
                <van-button disabled>待收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 2">
                <van-button @click="() => open(item)">查看物流</van-button>
                <van-button @click="() => sh(item.Id)">收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 3">
                <van-button v-if="!item.comment" @click="()=>pl(item)">评论</van-button>
                <van-button v-else  @click="()=>read(item)">查看评论</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待收货" :name="2">
        <van-card
          style="margin-top: 10px"
          v-for="item in list2"
          :key="item.Id"
          :num="item.number"
          :price="item.price"
          :desc="item.shop.name"
          :title="'订单编号:' + item.bh"
          :thumb="item.shop.list_pic_url"
          @click-thumb="() => toShop(item.goods_id)"
        >
          <template #footer>
            <div class="footer">
              <div class="dsh" v-if="item.typeid === 1">
                <van-button disabled>待收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 2">
                <van-button @click="() => open(item)">查看物流</van-button>
                <van-button @click="() => sh(item.Id)">收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 3">
                <van-button v-if="!item.comment" @click="()=>pl(item)">评论</van-button>
                <van-button v-else  @click="()=>read(item)">查看评论</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待评论" :name="3">
        <van-card
          style="margin-top: 10px"
          v-for="item in list3"
          :key="item.Id"
          :num="item.number"
          :price="item.price"
          :desc="item.shop.name"
          :title="'订单编号:' + item.bh"
          :thumb="item.shop.list_pic_url"
          @click-thumb="() => toShop(item.goods_id)"
        >
          <template #footer>
            <div class="footer">
              <div class="dsh" v-if="item.typeid === 1">
                <van-button disabled>待收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 2">
                <van-button @click="() => open(item)">查看物流</van-button>
                <van-button @click="() => sh(item.Id)">收货</van-button>
              </div>
              <div class="dsh" v-if="item.typeid === 3">
                <van-button v-if="!item.comment" @click="()=>pl(item)">评论</van-button>
                <van-button v-else  @click="()=>read(item)">查看评论</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="wlShow"
      round
      closeable
      style="height: 40vh; width: 90vw"
    >
      <div class="wl">
        <van-steps style="margin-top: 25px" :active="wl.wl">
          <van-step>买家下单</van-step>
          <van-step>商家发货</van-step>
          <van-step>运输中</van-step>
          <van-step>交易完成</van-step>
        </van-steps>
        <van-steps class="detail" direction="vertical" :active="wl.wl">
          <van-step>
            <p>买家下单</p>
            <p>{{ wl.time }}</p>
          </van-step>
          <van-step v-if="wl.wl >= 1">
            <p>包裹正在等待揽收</p>
            <p>{{ wl.time }}</p>
          </van-step>
          <van-step v-if="wl.wl === 2">
            <h3>快件已装车</h3>
            <p>{{ wl.time }}</p>
          </van-step>
        </van-steps>
      </div>
    </van-popup>
    <van-popup v-model="commentShow" position="bottom" style="height: 30vh">
      <van-nav-bar
        left-text="取消"
        @click-left="commentShow = false"
        right-text="发送"
        @click-right="send"
        title="评论"
      >
      </van-nav-bar>
      <van-field
        type="textarea"
        v-model="comment"
        maxlength="50"
        placeholder="请输入评论"
        rows="5"
        show-word-limit
      ></van-field>
    </van-popup>
    <van-popup v-model="commentRead" position="bottom" style="height: 30vh">
      <van-nav-bar
        right-text="完成"
        @click-right="commentRead = false"
        :title="wl.name"
      >
      </van-nav-bar>
      <van-field
        type="textarea"
        :value="wl.comment"
        readonly
        maxlength="50"
        rows="5"
        show-word-limit
      ></van-field>
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";
export default {
  name: "order",
  created() {
    this.getData();
    this.active = this.$route.query.typeId || 0;
  },
  data() {
    return {
      list: [],
      active: 0,
      wlShow: false,
      wl: {},
      commentShow: false,
      comment: "",
      commentRead:false
    };
  },
  computed: {
    list1() {
      return this.list.filter((r) => r.typeid === 1);
    },
    list2() {
      return this.list.filter((r) => r.typeid === 2);
    },
    list3() {
      return this.list.filter((r) => r.typeid === 3);
    },
  },
  methods: {
    getData() {
      http.postOrderList().then((r) => {
        this.list = r.data.list;
      });
    },
    toShop(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
    open(type) {
      this.wl = type;
      this.wlShow = true;
    },
    sh(id) {
      this.$toast.loading({ message: "操作中..." });
      http.postOrderSh({ id }).then((r) => {
        if (r.errno === 0) {
          this.getData();
          this.$toast.success({ message: "收货成功！" });
        }
      });
    },
    pl(item){
      this.wl = item;
      this.comment = '';
      this.commentShow = true;
    },
    send(){
      if(!this.comment){
        this.$toast.fail('评论内容不能为空！');
        return;
      }
      this.$toast.loading({ message: "操作中..." });
      http.postComment({id:this.wl.Id,comment:this.comment}).then(r=>{
        if (r.errno === 0) {
          this.getData();
          this.commentShow = false;
          this.$toast.success({ message: "发表成功！" });
        }
      })
    },
    read(item){
      this.wl = item;
      this.commentRead = true;
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  .footer {
  }
  .wl {
    height: 35vh;
    overflow-y: scroll;
    padding: 10px;
    .detail {
      font-size: 15px;
    }
  }
}
</style>
