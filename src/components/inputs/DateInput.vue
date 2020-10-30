<template>
  <div @click="focusInput" class="input">
    <p class="input__label">{{ label }}</p>
    <div class="input__wrapper">
      <div class="input__wrapper-left-arrow" @click="previousMonth">
        <img src="@/assets/icons/ic_arrow.svg" />
      </div>

      <div class="input__wrapper-content">
        <p class="input__wrapper-month">{{ choosenDate | month }}</p>
        <p class="input__wrapper-year">{{ choosenDate | year }}</p>
      </div>
      <input
        ref="input"
        @keydown.left="previousMonth"
        @keydown.right="nextMonth"
      />

      <div class="input__wrapper-right-arrow" @click="nextMonth">
        <img src="@/assets/icons/ic_arrow.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Emit } from "vue-property-decorator";
import moment from "moment";

@Component({
  filters: {
    month: (value: moment.Moment) => {
      return value.format("MMMM");
    },
    year: (value: moment.Moment) => {
      return value.format("YYYY");
    },
  },
})
export default class DateInput extends Vue {
  @Prop({ type: String, required: false })
  private label?: string;

  @Ref()
  private readonly input!: HTMLInputElement;

  private choosenDate = moment();
  private today = moment();

  private focusInput() {
    this.input.focus();
  }

  private previousMonth() {
    const isLessThanThisMonth =
      this.choosenDate
        .startOf("day")
        .diff(this.today.startOf("day"), "month") <= 0;

    if (isLessThanThisMonth) {
      return;
    }

    this.choosenDate = this.choosenDate.subtract("1", "month");
    this.date();
  }

  private nextMonth() {
    this.choosenDate = this.choosenDate.add("1", "month");
    this.date();
  }

  @Emit()
  private date(): moment.Moment {
    this.$forceUpdate();
    return moment(this.choosenDate);
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";

.input {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  &__label {
    font-weight: 500;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    border: 1px solid var(--theme-element-border);
    border-radius: 4px;
    margin-top: var(--spacing-xs);
    transition: border 0.2s ease-in;

    @media @mobile {
      width: 100%;
    }

    &:focus-within {
      border: 1px solid var(--theme-text-main);
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 136px;

      @media @mobile {
        width: 100%;
      }
    }

    &-month {
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }

    &-year {
      font-size: 16px;
      line-height: 20px;
    }

    &-left-arrow,
    &-right-arrow {
      cursor: pointer;
      padding: 11px 8px 10px;
      background-color: var(--theme-element-border);
    }

    &-right-arrow {
      img {
        transform: rotate(180deg);
      }
    }
  }

  input {
    position: absolute;
    width: 0;
    opacity: 0;
  }
}
</style>
