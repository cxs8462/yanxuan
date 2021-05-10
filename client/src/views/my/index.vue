<template>
  <div class="my">
    <div class="head">
      <div class="set">
        <van-icon @click="openSet" name="setting-o" />
      </div>
      <div class="avatar">
        <img :src="userInfo.avatar" />
        <div class="nickname">
          <p>{{ userInfo.nickname }}</p>
          <p class="lastTime">{{ userInfo.birthday }}</p>
        </div>
      </div>
      <van-grid class="menu">
        <van-grid-item
          icon="star-o"
          @click="$router.push({ name: '我的收藏' })"
          text="我的收藏"
        />
        <van-grid-item
          icon="todo-list-o"
          @click="$router.push({ name: '浏览记录' })"
          text="浏览记录"
        />
        <van-grid-item
          icon="cart-o"
          @click="$router.push({ name: '购物车' })"
          text="购物车"
        />
        <van-grid-item
          icon="records"
          @click="$router.push({ name: '地址中心' })"
          text="地址中心"
        />
      </van-grid>
    </div>
    <div class="content">
      <div class="order">
        <div class="he">
          <p class="title">我的订单</p>
          <p class="all" @@click="$router.push({ name: '我的订单' })">
            全部订单<van-icon name="arrow" />
          </p>
        </div>
        <van-grid>
          <van-grid-item
            icon="bulb-o"
            :badge="list1.length||''"
            @click="$router.push({ name: '我的订单', query: { typeId: 1 } })"
            text="待发货"
          />
          <van-grid-item
            icon="logistics"
            :badge="list2.length||''"
            @click="$router.push({ name: '我的订单', query: { typeId: 2 } })"
            text="待收货"
          />
          <van-grid-item
            icon="edit"
            :badge="list3.length||''"
            @click="$router.push({ name: '我的订单', query: { typeId: 3 } })"
            text="待评价"
          />
          <van-grid-item
            icon="qr"
            @click="$router.push({ name: '我的订单' })"
            text="全部"
          />
        </van-grid>
      </div>
    </div>
    <div class="out">
      <van-button block round @click="$store.commit('out')"
        >退出登录</van-button
      >
    </div>
    <van-popup
      position="right"
      style="height: 100%; width: 100%"
      v-model="setShow"
    >
      <div class="setting">
        <van-nav-bar
          title="个人信息修改"
          left-text="返回"
          left-arrow
          @click-left="setShow = false"
        />
        <van-form class="form" @submit="onSubmit">
          <van-field name="avatar" label="头像">
            <template #input>
              <van-uploader v-model="pic" :after-read="upPic" :max-count="1" />
            </template>
          </van-field>
          <van-field
            v-model="form.nickname"
            name="nickname"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="form.mobile"
            name="mobile"
            label="手机号码"
            placeholder="手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <van-field name="gender" label="性别">
            <template #input>
              <van-radio-group v-model="form.gender" direction="horizontal">
                <van-radio :name="0">保密</van-radio>
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="birthday"
            :value="form.birthday"
            label="生日"
            placeholder="日期"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              type="date"
              @confirm="onDate"
              @cancel="showPicker = false"
              :min-date="new Date(1970, 1, 1)"
            />
          </van-popup>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >保存</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";
import moment from "moment";
export default {
  name: "my",
  created() {
    this.$store.dispatch("getState");
    this.userInfo&&this.getData();
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
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
  data() {
    return {
      setShow: false,
      form: {},
      showPicker: false,
      pic: [],
      list:[]
    };
  },
  methods: {
    onSubmit() {
      this.$toast.loading({ message: "保存中..." });
      const { avatar, gender, mobile, nickname, birthday } = this.form;
      http
        .postUserInfo({
          info: {
            avatar,
            gender,
            mobile,
            nickname,
            birthday,
            id: this.userInfo.id,
          },
        })
        .then((r) => {
          if (r.errno === 0) {
            this.$toast.success("保存成功！");
            this.$store.dispatch("getLogin");
            this.setShow = false;
          }
        });
    },
    openSet() {
      this.form = { ...this.userInfo };
      this.pic = [];
      this.setShow = true;
    },
    onDate(item) {
      const date = moment(item).format("YYYY-MM-DD");
      this.form.birthday = date;
      this.showPicker = false;
    },
    upPic(file) {
      const data = new FormData();
      data.append("file", file.file);
      http.postPic(data).then((r) => {
        if (r.errno === 0) {
          this.form.avatar = r.data.fileUrl;
        }
      });
    },
    getData() {
      http.postOrderList().then((r) => {
        this.list = r.data.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  height: 90vh;
  .head {
    height: 200px;
    background: #ffae1c;
    font-size: 20px;
    padding: 0 10px;
    overflow: hidden;
    .set {
      text-align: right;
      padding: 5px 0;
      font-size: 24px;
    }
    .avatar {
      display: flex;
      align-items: center;
      height: 60px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .nickname {
        margin-left: 10px;
        color: #383e42;
        .lastTime {
          font-size: 13px;
          color: rgba(87, 86, 86, 0.71);
        }
      }
    }
    .menu {
      margin-top: 25px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .content {
    padding: 10px;
    .order {
      font-size: 20px;
      border-radius: 10px;
      overflow: hidden;
      background: white;
      .he {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        align-items: center;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
        .all {
          font-size: 13px;
          color: #828e95;
        }
      }
    }
  }
  .setting {
    height: 100%;
    background: #f3f3f3;
  }
  .out {
    padding: 10px;
  }
}
</style>
