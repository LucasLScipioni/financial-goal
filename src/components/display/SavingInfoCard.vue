<template>
  <div class="saving-info" @click="redirectToSaving">
    <div class="saving-info__icon-wrapper">
      <simple-svg v-if="icon" :src="icon"></simple-svg>
    </div>
    <p class="saving-info__title">{{ saving.name }}</p>
    <div class="saving-info__button-wrapper" v-if="!savingIsSet">
      <button class="saving-info__button">
        Start Setup
      </button>
    </div>
    <div class="saving-info__completed" v-else>
      <p class="saving-info__total-amount">{{ `$ ${saving.totalAmount}` }}</p>
      <p class="saving-info__reach-goal-by">
        {{ languageModule.getStrings["reach-goal-by"] }}
      </p>
      <p class="saving-info__reach-goal">{{ saving.reachGoal | getDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

import { Saving } from "@/models/saving";
import { LanguageModule } from "@/store/language/LanguageModule";

@Component({
  filters: {
    getDate: (value: string) => {
      return moment(value)
        .locale(LanguageModule.getCurrentLanguage)
        .format("MMMM YYYY");
    },
  },
})
export default class SavingInfoCard extends Vue {
  @Prop(Object)
  private saving?: Saving;

  private languageModule = LanguageModule;

  icon = '';

  mounted() {
    this.icon = require(`@/assets/icons/${this.saving!.icon!}`);
  }

  private redirectToSaving() {
    localStorage.setItem("current-saving", JSON.stringify(this.saving));
    this.$router.push({ path: "saving" });
  }

  private get savingIsSet() {
    return !!this.saving!.totalAmount;
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";
@tablet: ~"only screen and (max-width: 1135px)";

.saving-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 32px 22px;
  width: 272px;
  height: 208px;
  box-sizing: border-box;
  background: var(--theme-element-background);
  border: 1px solid var(--theme-element-border);
  border-radius: 12px;

  * {
    cursor: pointer;
  }

  @media @mobile {
    width: 100%;
  }

  @media @tablet {
    width: 100%;
  }

  &__icon-wrapper {
    width: 40px;
    height: 40px;
  }

  &__title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-top: 8px;
  }

  &__button-wrapper {
    width: 100%;
  }

  &__button {
    width: 100%;
    border: none;
    align-self: center;
    border-radius: 32px;
    font-weight: 500;
    font-size: 16px;
    padding: 12px 0;
    background: var(--theme-main-color);
    color: var(--theme-text-overMain);
    margin-top: var(--spacing-l);
  }

  &__completed {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__total-amount {
    color: var(--theme-main-color);
    font-size: 24px;
    line-height: 22px;
    font-weight: 600;
    margin-top: 4px;
  }
  &__reach-goal-by {
    color: var(--theme-text-description);
    font-size: 10px;
    line-height: 17px;
    font-weight: 300;
    margin-top: 8px;
  }
  &__reach-goal {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  }
}
</style>
