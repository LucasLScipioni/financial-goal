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
import { UserModule } from "./store/user/UserModule";
import { LanguageModule } from "./store/language/LanguageModule";
Vue.use(VueSimpleSVG);

const Application = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export const VueStoreModules = {
  user: UserModule,
  language: LanguageModule
}

export default Application;
