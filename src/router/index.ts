import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Application from "@/main";
import FinancialGoal from "@/views/SavingView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: HomeView,
  },
  {
    path: "/saving",
    name: "Saving",
    meta: { requiresAuth: true },
    component: FinancialGoal,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      !Application ||
      (Application && !Application.$store.state.UserModule.user)
    ) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
