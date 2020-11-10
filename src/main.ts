import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { currency, momentFilter } from "@/assets/filters";

Vue.config.productionTip = false;
Vue.filter("currency", currency);
Vue.filter("moment", momentFilter);

// @ts-ignore
import VueSimpleSVG from "vue-simple-svg";
Vue.use(VueSimpleSVG);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
