<template>
  <div class="app">
    <div class="app__navbar">
      <img
        class="app__navbar-logo"
        @click="goToHome"
        src="./assets/icons/ic_buy_a_house.svg"
      />
      <div>
        <img
          src="./assets/icons/ic_us.svg"
          width="50"
          height="40"
          class="app__navbar-flag"
          :class="{ active: languageModule.getCurrentLanguage === 'en' }"
          @click="changeLanguage('en')"
        />
        <img
          src="./assets/icons/ic_pt.svg"
          width="50"
          height="40"
          class="app__navbar-flag"
          :class="{ active: languageModule.getCurrentLanguage === 'pt-br' }"
          @click="changeLanguage('pt-br')"
        />
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import moment from "moment";

import { Savings } from "@/models/saving";
import { LanguageModule } from "@/store/language/LanguageModule";
import { UserModule } from "@/store/user/UserModule";

@Component({})
export default class App extends Vue {
  private languageModule = LanguageModule;
  private userModule = UserModule;

  private changeLanguage(value: string) {
    this.languageModule.setLanguage(value);
  }

  private goToHome() {
    if (this.userModule.getUser) {
      this.$router.push({ path: "/" });
    } else {
      this.$router.push({ path: "/login" });
    }
  }
}
</script>

<style lang="less">
@import "./assets/theme/index.less";
@mobile: ~"only screen and (max-width: 560px)";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.app {
  height: 100vh;
  font-family: "Work Sans", sans-serif;
  text-align: center;
  background-color: var(--theme-main-background);
  font-size: 16px;
  font-weight: 400;
  color: var(--theme-text-main);

  &__navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 79px;
    padding: 0 var(--spacing-l);
    background-color: var(--theme-element-background);
    transition: all 0.15s ease-in;

    .app__navbar-logo {
      cursor: pointer;
    }

    @media @mobile {
      height: 59px;
    }

    &-flag {
      cursor: pointer;
      transition: opacity 0.15s ease-in;
      opacity: 0.3;

      &.active {
        opacity: 1;
      }
    }
  }
}

input {
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
}
</style>
