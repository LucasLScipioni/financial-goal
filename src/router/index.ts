import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FinancialGoal from "../views/SavingView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/login/LoginView.vue";

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
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const router = new VueRouter({
  routes,
});

/*router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});*/

export default router;
