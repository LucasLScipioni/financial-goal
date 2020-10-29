import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import { currency, momentFilter } from '@/assets/filters';

Vue.config.productionTip = false;

Vue.filter('currency', currency);

Vue.filter('moment', momentFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
