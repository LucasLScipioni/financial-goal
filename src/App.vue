<template>
  <div class="app">
    <div class="app__navbar">
      <img src="./assets/logo/origin.svg" />
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
@import "./assets/theme/index.less";
@mobile: ~"only screen and (max-width: 560px)";

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
    align-items: flex-start;
    align-items: center;
    height: 79px;
    padding: 0 var(--spacing-l);
    background-color: var(--theme-element-background);
    transition: all 0.15s ease-in;

    @media @mobile {
      height: 59px;

      img {
        width: 65px;
      }
    }
  }
}

input {
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
}
</style>
