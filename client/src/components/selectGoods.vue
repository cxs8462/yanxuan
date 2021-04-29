<template>
  <div class="selectGoods">
    <van-popup
      round
      :value="show"
      :close-on-click-overlay="false"
      position="bottom"
      @click-close-icon="close"
      style="height: 30%"
      closeable
    >
      <div class="content">
        <div class="box">
          <div class="head">
            <div class="imgBox">
              <img v-lazy="data.primary_pic_url" />
            </div>
            <div class="priceBox">
              <p class="retailBox">
                ￥<span class="retail">{{ data.retail_price }}</span>
              </p>
              <p>
                <van-tag class="tag" color="#f39c12" plain>{{
                  data.promotion_desc
                }}</van-tag>
                <van-tag class="tag" v-if="data.is_new" color="#f39c12" plain
                  >新品</van-tag
                >
              </p>
              <p class="desc">{{ data.name }}</p>
            </div>
          </div>
          <div class="num">
            <span class="text">数量：</span>
            <van-stepper v-model="number" />
          </div>
        </div>
        <div class="btn">
          <van-button block type="warning" @click="addCar" round
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "selectGoods",
  data() {
    return {
      number: 1,
    };
  },
  props: {
    show: {
      default: false,
    },
    data: {
      default: {},
    },
  },
  methods: {
    close() {
      this.$emit("update:show", false);
    },
    addCar() {
      this.$emit("addCar", {
        goodsId: this.data.id,
        number: this.number,
        productId: this.data.productId
      });
    },
  },
};
</script>

<style lang="less" scoped>
.selectGoods {
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .btn {
      padding: 10px;
    }
    .box {
      .head {
        padding: 10px;
        height: 90px;
        display: flex;
      }
      .num {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 15px;
          color: #454c50;
        }
      }
      .imgBox {
        padding: 5px;
        background: #a7a7a7;
        height: 75px;
        width: 80px;
        border-radius: 5px;
        img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }
      }
      .priceBox {
        padding: 5px;
        font-size: 15px;
        .retailBox {
          font-size: 17px;
          color: #d5880c;
          .retail {
            font-size: 23px;
          }
        }
        p {
          margin: 5px 0;
        }
        .desc {
          color: #828e95;
        }
      }
    }
  }
  .tag {
    margin: 0 5px;
  }
}
</style>
