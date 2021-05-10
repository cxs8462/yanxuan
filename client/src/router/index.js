import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("@/views/home/index"),
        meta: { needLogin: false, isKeep: true },
      },
      {
        path: "category",
        name: "分类",
        component: () => import("@/views/category/index"),
        meta: { needLogin: false, isKeep: false },
      },
      {
        path: "brand",
        name: "品牌",
        component: () => import("@/views/brand/index"),
        meta: { needLogin: false, isKeep: true },
      },
      {
        path: "topic",
        name: "专题",
        component: () => import("@/views/topic/index"),
        meta: { needLogin: false, isKeep: true },
      },
      {
        path: "my",
        name: "我的",
        component: () => import("@/views/my/index"),
        meta: { needLogin: true, isKeep: false },
      },
    ],
  },
  {
    path: "cart",
    name: "购物车",
    component: () => import("@/views/cart/index"),
    meta: { needLogin: true, isKeep: false },
  },
  {
    path: "/topicdetail",
    name: "专题详情",
    component: () => import("@/views/topic/detail"),
    meta: { needLogin: true },
  },
  {
    path: "/catedetail",
    name: "分类详情",
    component: () => import("@/views/category/detail"),
    meta: { needLogin: false },
  },
  {
    path: "/branddetail",
    name: "品牌详情",
    component: () => import("@/views/brand/detail"),
    meta: { needLogin: false },
  },
  {
    path: "/goodsdetail",
    name: "商品详情",
    component: () => import("@/views/goods/index"),
    meta: { needLogin: false },
  },
  {
    path: "/address",
    name: "地址中心",
    component: () => import("@/views/address/index"),
    meta: { needLogin: true },
  },
  {
    path: "/goodssc",
    name: "我的收藏",
    component: () => import("@/views/goods/gooodsSc"),
    meta: { needLogin: true },
  },
  {
    path: "/record",
    name: "浏览记录",
    component: () => import("@/views/goods/record"),
    meta: { needLogin: true },
  },
  {
    path: "/order",
    name: "我的订单",
    component: () => import("@/views/order/index"),
    meta: { needLogin: true },
  },
  {
    path: "/search",
    name: "搜索",
    component: () => import("@/views/search/index"),
    meta: { needLogin: false },
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0);
  if (to.meta.needLogin) {
    if (!store.state.userInfo) {
      store.commit("setLoginShow", true);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
