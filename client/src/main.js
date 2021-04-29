import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "amfe-flexible";
import { Lazyload } from 'vant';

Vue.use(Lazyload);

Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
