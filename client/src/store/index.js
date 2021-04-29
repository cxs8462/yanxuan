import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/api";
import { Toast } from "vant";
import { removeToken } from "@/utils/token";
import router from "@/router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginShow: false,
    userInfo: null,
    cartList: [],
    cartTotal: null,
    goodsSc: [],
    address: [],
  },
  mutations: {
    setLoginShow(state, is) {
      state.loginShow = is;
    },
    setUser(state, info) {
      state.userInfo = info;
      state.loginShow = false;
    },
    setCar(state, data) {
      state.cartList = data.cartList;
      state.cartTotal = data.cartTotal;
    },
    setGoodsSc(state, data) {
      state.goodsSc = data;
    },
    setAddress(state, data) {
      state.address = data.map((r) => {
        r.isDefault = r.is_default;
        r.tel = r.mobile;
        r.province_id += "";
        return r;
      });
    },
    out(state){
      state.userInfo = null;
      removeToken();
      router.push({name:'首页'});
      Toast.success('退出账号成功！');
    }
  },
  actions: {
    getLogin({ commit, dispatch }) {
      http.getUserInfo().then((r) => {
        if (!r.errno) {
          commit("setUser", r);
          Toast({
            message: "欢迎你" + r.nickname + "!",
            icon: "flower-o",
          });
          dispatch("getCar");
          dispatch("getGoodsSc");
          dispatch("getAdress");
        }
      });
    },
    getState({ commit, dispatch }) {
      http.getUserInfo().then((r) => {
        if (!r.errno) {
          commit("setUser", r);
          dispatch("getCar");
          dispatch("getGoodsSc");
          dispatch("getAdress");
        }
      });
    },
    getCar({ commit }) {
      http.getCartData().then((r) => {
        commit("setCar", r);
      });
    },
    getGoodsSc({ commit }) {
      http.getLikes({ typeId: 0 }).then((r) => {
        commit("setGoodsSc", r);
      });
    },
    getAdress({ commit }) {
      http.getAddressList().then((r) => {
        commit("setAddress", r);
      });
    },
  },
  modules: {},
});
