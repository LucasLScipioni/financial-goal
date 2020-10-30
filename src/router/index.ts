import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FinancialGoal from "../views/FinancialGoal.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: FinancialGoal
  }
];

const router = new VueRouter({
  routes
});

export default router;
