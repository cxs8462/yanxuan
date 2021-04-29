<template>
  <div class="cart">
    <van-sticky :offset-top="0">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        title="购物车"
      >
      </van-nav-bar>
    </van-sticky>
    <div class="cartBox">
      <div class="carList" v-for="item in list" :key="item.id">
        <div class="left">
          <van-checkbox
            @change="() => checked(item)"
            v-model="item.checked"
          ></van-checkbox>
        </div>
        <div class="right">
          <van-card
            :num="item.number"
            :price="item.retail_price"
            desc="描述信息"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
            @click-thumb="() => toShop(item.goods_id)"
          >
            <template #tags>
              <van-tag plain type="danger">同城送</van-tag>
              <van-tag plain type="danger">隔日达</van-tag>
            </template>
            <template #footer>
              <div class="btn">
                <van-stepper
                  :min="1"
                  v-model="item.number"
                  @change="() => numChange(item)"
                />
                <van-button
                  size="mini"
                  type="warning"
                  @click.stop="() => del(item)"
                  plain
                  >删除</van-button
                >
              </div>
            </template>
          </van-card>
        </div>
      </div>
    </div>
    <van-submit-bar
      tip="你的收货地址支持同城送, 我们已为你准备好快递"
      :price="total.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
      :decimal-length="2"
      :loading="subLoading"
    >
      <van-checkbox :value="allCheack" @input="allSelect">全选</van-checkbox>
    </van-submit-bar>
    <van-popup v-model="passShow" style="height: 40vh" position="bottom" round>
      <van-password-input
        style="margin-top: 10px"
        :value="password"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        v-model="password"
        :show="true"
        @blur="showKeyboard = false"
      />
    </van-popup>
    <van-popup
      v-model="adressShow"
      :close-on-click-overlay="false"
      closeable
      style="height: 40vh; width: 90vw"
      round
    >
      <div class="adressSelect">
        <div class="top">
          <van-radio-group v-model="adressId">
            <van-radio
              style="margin-top: 10px"
              v-for="item in adressList"
              :name="item.id"
              :key="item.id"
              >{{ item.name }}-{{ item.tel }}<br />{{ item.address }}</van-radio
            >
          </van-radio-group>
        </div>
        <div class="bottom">
          <van-button block type="primary" @click="selectAddress" round
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";

export default {
  name: "cart",
  data() {
    return {
      subLoading: false,
      password: "",
      showKeyboard: false,
      passShow: false,
      adressShow: false,
      adressId: "",
    };
  },
  created() {
    this.$store.dispatch("getCar");
  },
  watch: {
    password: {
      handler(val) {
        if (val.length === 6 && val !== "123456") {
          this.$toast.fail("密码错误！");
          this.password = "";
          this.passShow = false;
          this.adressShow = false;
          return;
        } else if (val.length === 6 && val === "123456") {
          this.$toast.success("支付成功！");
          this.password = "";
          this.passShow = false;
          this.subLoading = true;
          this.adressShow = false;
          const rulset = this.list.map((r) => {
            r.addressid = this.adressId;
            return r;
          });
          http.postPushOrder({ list: rulset }).then((r) => {
            console.log(r);
            if (r.errno === 0) {
              this.$store.dispatch("getCar");
              this.$toast.success("购买成功！");
              this.subLoading = false;
            }
          });
        }
      },
    },
  },
  computed: {
    list() {
      return this.$store.state.cartList;
    },
    total() {
      return this.$store.state.cartTotal;
    },
    adressList() {
      return this.$store.state.address;
    },
    allCheack() {
      return (
        this.list.filter((r) => r.checked === 1).length === this.list.length
      );
    },
  },
  methods: {
    allSelect(i) {
      if (i) {
        this.$toast.loading({ message: "操作中..." });
        http
          .postCartCheck({
            productIds: this.list.map((r) => r.product_id).join(","),
            isChecked: 1,
          })
          .then((r) => {
            if (r.errno === 0) {
              this.$store.commit("setCar", r.data);
              this.$toast.clear();
            }
          });
      } else {
        http
          .postCartCheck({
            productIds: this.list.map((r) => r.product_id).join(","),
            isChecked: 0,
          })
          .then((r) => {
            if (r.errno === 0) {
              this.$store.commit("setCar", r.data);
              this.$toast.clear();
            }
          });
      }
    },
    numChange(item) {
      this.$toast.loading({ message: "操作中..." });
      http
        .postCartUpdate({
          id: item.id,
          goodsId: item.goods_id,
          productId: item.product_id,
          number: item.number,
        })
        .then((r) => {
          if (r.errno === 0) {
            this.$store.commit("setCar", r.data);
            this.$toast.clear();
          }
        });
    },
    checked(item) {
      this.$toast.loading({ message: "操作中..." });
      http
        .postCartCheck({
          productIds: item.product_id,
          isChecked: item.checked ? 1 : 0,
        })
        .then((r) => {
          if (r.errno === 0) {
            this.$store.commit("setCar", r.data);
            this.$toast.clear();
          }
        });
    },
    del(item) {
      this.$toast.loading({ message: "删除中..." });
      http.postCartDelete({ productIds: item.product_id + "" }).then((r) => {
        if (r.errno === 0) {
          this.$store.commit("setCar", r.data);
          this.$toast.clear();
        }
      });
    },
    toShop(id) {
      this.$router.push({ name: "商品详情", query: { id } });
    },
    onSubmit() {
      if(!this.list.length){
        this.$toast.fail("购物车无商品！");
        return;
      }
      this.adressId = "";
      this.adressShow = true;
    },
    selectAddress() {
      if (!this.adressId) {
        this.$toast.fail("请选择地址！");
        return;
      }
      this.passShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  min-height: 90vh;
  .cartBox {
    .carList {
      margin-top: 5px;
      display: flex;
      background: white;
      .left {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
      }
      .right {
        flex: 1;
        margin-left: -10px;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  .adressSelect {
    padding: 10px;
    height: 35vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      height: 30vh;
      font-size: 15px;
      overflow-y: scroll;
    }
    .bottom {
      margin-top: 10px;
      flex: 1;
    }
  }
}
</style>
