import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FinancialGoal from "../views/SavingView.vue";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/saving",
    name: "Saving",
    component: FinancialGoal,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
