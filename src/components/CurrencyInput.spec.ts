import { shallowMount } from "@vue/test-utils";

import CurrencyInput from "@/components/CurrencyInput.vue";

// @ts-ignore-line
import { Money } from "v-money";

describe("CurrencyInput.vue", () => {
  describe("Functionality: ", () => {
    it("CurrencyInput's `input` method is wired with `Money`, returning a masked currency value when it's value changes", async () => {
      const inputReturn = jest.fn();

      const resultZero = '0.00';
      const resultDecimals = '10.00';
      const resultThousands = '2,000.00';
      const resultMillions = '2,000,000.00';

      const wrapper = shallowMount(CurrencyInput, {
        stubs: {
          Money
        },
        listeners: {
          input: inputReturn
        },
        propsData: {
          value: resultZero.replace('.', '')
        }
      });

      expect(wrapper.find('input').emitted().input![0][0]).toBe(resultZero);

      wrapper.setProps({
        value: resultDecimals.replace('.', '')
      });
      wrapper.vm.$forceUpdate();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('input').emitted().input![2][0]).toBe(resultDecimals);

      wrapper.setProps({
        value: resultThousands.replace('.', '').replace(',', '')
      })
      wrapper.vm.$forceUpdate();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('input').emitted().input![4][0]).toBe(resultThousands);

      wrapper.setProps({
        value: resultMillions.replace('.', '').replace(',', '')
      })
      wrapper.vm.$forceUpdate();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('input').emitted().input![6][0]).toBe(resultMillions);
    });
  });
});