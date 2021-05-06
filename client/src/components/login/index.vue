<template>
  <div class="login">
    <van-popup
      :value="$store.state.loginShow"
      position="bottom"
      :style="{ height: '100%' }"
      class="bg"
      @open="open"
    >
      <van-nav-bar
        :title="isDl ? '登录' : '注册'"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="head">
        <img :src="head" alt="" />
      </div>
      <div class="dl" v-if="isDl">
        <van-form ref="dl" @submit="dlSubmit">
          <van-field
            v-model="dl.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[
              { required: true, validator: phone, message: '请填写手机号' },
            ]"
          />
          <van-field
            v-model="dl.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button
              round
              block
              type="info"
              :loading="dlLoading"
              native-type="submit"
              >登录</van-button
            >
            <van-button
              style="margin-top: 10px"
              round
              block
              native-type="button"
              @click="gozc"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
      <div class="zc" v-else>
        <van-form ref="zc" @submit="zcSubmit">
          <van-field
            v-model="zc.nickname"
            name="nickname"
            placeholder="昵称"
            label="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="zc.password"
            name="password"
            placeholder="密码"
            label="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="zc.mobile"
            name="mobile"
            placeholder="手机号"
            label="手机号"
            :rules="[
              {
                required: true,
                validator: phone,
                message: '请输入正确的手机号',
              },
            ]"
          />
          <div style="margin: 16px">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              :loading="zcLoading"
              >注册</van-button
            >
            <van-button
              style="margin-top: 10px"
              round
              block
              native-type="button"
              @click="godl"
              >返回</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import http from "@/api/api";
import { setToken } from "@/utils/token";
import head from "@/assets/login.png";
export default {
  name: "login",
  props: {
    show: {
      default: false,
    },
  },
  data() {
    return {
      isDl: true,
      dl: {
        mobile: "",
        password: "",
      },
      zc: {
        nickname: "",
        password: "",
        mobile: "",
      },
      dlLoading: false,
      zcLoading: false,
      head,
    };
  },
  methods: {
    onClickLeft() {
      this.$store.commit("setLoginShow", false);
    },
    dlSubmit(value) {
      this.dlLoading = true;
      http.postLogin(value).then((r) => {
        if (r.errno === 0) {
          this.$toast.success("登录成功!");
          setToken(r.data.sessionKey);
          this.$store.dispatch("getLogin");
        }
        this.dlLoading = false;
      });
    },
    zcSubmit(value) {
      this.zcLoading = true;
      http.postCreateUser(value).then((r) => {
        if (r.data.success) {
          this.$toast.success("注册成功!");
        } else {
          this.$toast.fail(r.data.msg);
        }
        this.zcLoading = false;
      });
    },
    phone(val) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(val);
    },
    dlRest() {
      this.dl = {
        mobile: "",
        password: "",
      };
    },
    zcRest() {
      this.zc = {
        nickname: "",
        password: "",
        mobile: "",
      };
    },
    gozc() {
      this.dlRest();
      this.isDl = false;
    },
    godl() {
      this.zcRest();
      this.isDl = true;
    },
    open() {
      this.dlRest();
      this.zcRest();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .bg {
    background: #f7f8fa;
  }
  .head{
    width: 100%;
    margin-top: 10vh;
    margin-bottom: 30vh;
    img{
      width: 100%;
    }
  }
}
</style>
