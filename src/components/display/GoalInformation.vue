<template>
  <div class="goal">
    <div class="goal__mothly-cost">
      <p class="goal__mothly-cost-title">
        {{ languageModule.getStrings["financial-goal-cost-title"] }}
      </p>
      <p class="goal__mothly-cost-title-mobile">
        {{ languageModule.getStrings["financial-goal-cost-title-mobile"] }}
      </p>
      <p class="goal__mothly-cost-value">
        {{ monthlyCost | currency }}
      </p>
    </div>
    <p
      class="goal__information"
      v-html="
        getVariableString(
          languageModule.getStrings['financial-goal-cost-info'],
          [getMonthlyDepositsAmount(), goalAmount, getChoosenMonth]
        )
      "
    ></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

import { getVariableString } from "@/lib/internationalization";
import { LanguageModule } from "@/store/language/LanguageModule";

@Component({})
export default class GoalInformation extends Vue {
  @Prop({ type: String, required: false })
  private goalAmount?: string;

  @Prop({ type: Object, required: true })
  private goalDate!: moment.Moment;

  private languageModule = LanguageModule;
  private getVariableString = getVariableString;

  private getMonthlyDepositsAmount() {
    const today = moment();

    return this.goalDate.startOf("day").diff(today.startOf("day"), "month");
  }

  private get monthlyCost() {
    if (!this.goalAmount) {
      return 0;
    }
    const monthsAmount = this.getMonthlyDepositsAmount();

    // eslint-disable-next-line
    const goalAmountToNumber = +this.goalAmount!.replace(/[^0-9]/g, "");
    const cantDivideByZero = monthsAmount === 0;

    if (cantDivideByZero) {
      return (goalAmountToNumber / 100).toFixed(2);
    }

    const monthlyCostCalculated = goalAmountToNumber / monthsAmount / 100;
    return monthlyCostCalculated.toFixed(2);
  }

  private get getChoosenMonth() {
    return this.goalDate
      .locale(this.languageModule.getCurrentLanguage)
      .format("MMMM YYYY");
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";

.goal {
  border: 1px solid var(--theme-element-border);
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(150, 164, 176, 0.1);

  &__mothly-cost {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xl) var(--spacing-l);

    @media @mobile {
      padding: 20px 24px;
    }

    &-title {
      font-weight: 500;
      font-size: 18px;

      @media @mobile {
        display: none;
      }
    }

    &-title-mobile {
      display: none;
      font-weight: 500;
      font-size: 18px;

      @media @mobile {
        display: block;
      }
    }

    &-value {
      max-width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: var(--theme-feedback-positive);
      font-weight: 500;
      font-size: 40px;
      line-height: 32px;

      @media @mobile {
        font-size: 26px;
      }
    }
  }

  &__information {
    font-size: 12px;
    text-align: left;
    padding: var(--spacing-n) var(--spacing-l);
    background-color: var(--theme-main-background);

    @media @mobile {
      padding: 20px 24px;
    }
  }
}
</style>
