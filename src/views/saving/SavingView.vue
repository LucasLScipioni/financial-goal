<template>
  <div class="saving">
    <p
      class="saving__title"
      v-html="languageModule.getStrings['financial-goal-title']"
    />
    <div class="saving__wrapper">
      <simple-svg :src="saving.icon"></simple-svg>
      <p class="saving__wrapper-title">
        {{ saving.name }}
      </p>
      <p class="saving__wrapper-description">
        {{ languageModule.getStrings["financial-goal-description"] }}
      </p>

      <div class="saving__wrapper-inputs">
        <CurrencyInput
          :value="totalAmount"
          v-on:input="setTotalAmount"
          :label="languageModule.getStrings['total-amount']"
        ></CurrencyInput>
        <DateInput
          class="saving__wrapper-date"
          :label="languageModule.getStrings['reach-goal-by']"
          :currentSelectedDate="goalDate"
          @date="setDate"
        ></DateInput>
      </div>

      <GoalInformation
        class="saving__wrapper-cost"
        :goalAmount="totalAmount"
        :goalDate="goalDate"
      ></GoalInformation>

      <button class="saving__wrapper-button" @click="saveSavingInfo">
        {{ languageModule.getStrings["confirm"] }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

import { Saving } from "@/models/saving";
import { CurrencyInput, DateInput } from "@/components/inputs";
import { GoalInformation } from "@/components/display";

import { LanguageModule } from "@/store/language/LanguageModule";
import { UserModule } from "@/store/user/UserModule";

@Component({
  components: {
    CurrencyInput,
    GoalInformation,
    DateInput,
  },
})
export default class SavingView extends Vue {
  @Prop() private msg!: string;

  private saving?: Saving;

  private totalAmount!: string;
  private goalDate = moment();
  private monthlyDeposits = 0;

  private languageModule = LanguageModule;
  private userModule = UserModule;

  private created() {
    if (localStorage.getItem("current-saving")) {
      this.setSavingVariables(
        JSON.parse(localStorage.getItem("current-saving")!) as Saving
      );
    } else {
      this.$router.push({ path: "/" });
    }
  }

  private setSavingVariables(value: Saving) {
    this.saving = value;

    this.totalAmount = this.saving!.totalAmount
      ? this.saving!.totalAmount
      : "0";

    this.goalDate = this.saving!.reachGoal
      ? moment(this.saving!.reachGoal)
      : moment();
  }

  private setTotalAmount(value: string) {
    this.totalAmount = value;
    this.$forceUpdate();
  }

  private setDate(choosenDate: moment.Moment) {
    this.goalDate = choosenDate;
    this.$forceUpdate();
  }

  private saveSavingInfo() {
    this.saving = {
      ...this.saving!,
      totalAmount: this.totalAmount,
      reachGoal: this.goalDate.toISOString(),
    };

    let user = this.userModule.getUser!;
    const savings = user.savings;

    const savingIndex = savings.findIndex(
      (element) => element.id === this.saving!.id
    );

    savings[savingIndex] = this.saving!;
    user = { ...user, savings };

    localStorage.setItem("current-saving", JSON.stringify(this.saving));
    this.userModule.setUser(user);
    this.$router.push({ path: "/" });
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";

.saving {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__title {
    font-size: 24px;
    line-height: 32px;
    color: var(--theme-main-color);
    margin-top: var(--spacing-xxl);
    transition: all 0.15s ease-in;

    @media @mobile {
      margin-top: 23px;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--theme-element-background);
    width: calc(560px - var(--spacing-xl) - var(--spacing-xl));
    padding: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    border: 1px solid var(--theme-element-border);
    border-radius: 8px;
    box-shadow: 0px 1px 4px rgba(150, 164, 176, 0.1);
    transition: all 0.15s ease-in;

    @media @mobile {
      width: calc(100% - var(--spacing-xl) - var(--spacing-xl));
      margin-top: 24px;
    }

    &-title {
      font-size: 32px;
      font-weight: 600;
      line-height: 40px;
      margin-top: var(--spacing-xs);
    }

    &-description {
      font-size: 16px;
      line-height: 20px;
      color: var(--theme-text-description);
      margin-top: var(--spacing-xxs);
    }

    &-inputs {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-top: var(--spacing-xl);

      @media @mobile {
        flex-direction: column;
      }
    }

    &-date {
      margin-left: 17px;

      @media @mobile {
        margin-top: var(--spacing-n);
        margin-left: 0;
      }
    }

    &-cost {
      margin-top: var(--spacing-l);
      width: 100%;
    }

    &-button {
      width: 400px;
      cursor: pointer;
      border: none;
      align-self: center;
      border-radius: 32px;
      font-weight: bold;
      font-size: 18px;
      padding: var(--spacing-n);
      background: var(--theme-main-color);
      color: var(--theme-text-overMain);
      margin-top: var(--spacing-l);

      @media @mobile {
        width: 100%;
      }
    }
  }
}
</style>
