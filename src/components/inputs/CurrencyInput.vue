<template>
  <div class="input">
    <p class="input__label">{{ label }}</p>
    <div class="input__wrapper">
      <div class="input__icon-wrapper">
        <img src="@/assets/icons/ic_money.svg" />
      </div>

      <Money
        type="tel"
        v-on="$listeners"
        v-bind="{
          ...$attrs,
          decimal: '.',
          thousands: ',',
          precision: 2,
          masked: true,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// @ts-ignore-line
import { Money } from "v-money";

@Component({
  components: { Money },
})
export default class CurrencyInput extends Vue {
  @Prop({ type: String, required: false })
  private label?: string;
}
</script>

<style scoped lang="less">
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
    width: 100%;
    border: 1px solid var(--theme-element-border);
    border-radius: 4px;
    margin-top: var(--spacing-xs);
    transition: border 0.2s ease-in;

    &:focus-within {
      border: 1px solid var(--theme-text-description);
    }
  }

  &__icon-wrapper {
    padding: 18px 22px 15px;
    background-color: var(--theme-main-background);
  }

  input {
    font-weight: bold;
    width: 100%;
    border: none;
    padding: var(--spacing-n);
    border-left: 1px solid var(--theme-element-border);
  }
}
</style>
