import { shallowMount } from "@vue/test-utils";

import { DateInput } from "@/components/inputs";
import moment from "moment";

describe("HelloWorld.vue", () => {
  describe("Functionality: ", () => {
    it("When clicking on any part of DateInput, it's input should be focused", async () => {
      const wrapper = shallowMount(DateInput, {
        attachTo: document.body
      });

      expect(document.activeElement).not.toBe(wrapper.find('input').element);

      wrapper.find('.input').trigger('click');

      expect(document.activeElement).toBe(wrapper.find('input').element);
    });

    it("Emit `date` when the user clicks on any Arrow Button or keypresses when input is focused", () => {
      const wrapper = shallowMount(DateInput);

      wrapper.find('.input__wrapper-right-arrow').trigger('click');
      expect(returnMonthDiffFromToday(wrapper.emitted().date![0][0])).toBe(1);

      wrapper.find('.input__wrapper-left-arrow').trigger('click');
      expect(returnMonthDiffFromToday(wrapper.emitted().date![1][0])).toBe(0);

      wrapper.find('input').trigger('keydown.right');
      expect(returnMonthDiffFromToday(wrapper.emitted().date![2][0])).toBe(1);

      wrapper.find('input').trigger('keydown.left');
      expect(returnMonthDiffFromToday(wrapper.emitted().date![3][0])).toBe(0);
    });
  });

  describe("Business Rules: ", () => {
    it("When trying to reduce the current month, does not emit `date` event.", () => {
      const wrapper = shallowMount(DateInput);

      wrapper.find('.input__wrapper-left-arrow').trigger('click');
      expect(wrapper.emitted().date).toBeFalsy();

      wrapper.find('input').trigger('keydown.left');
      expect(wrapper.emitted().date).toBeFalsy();
    });
  });
});

function returnMonthDiffFromToday(dateString: string): number {
  const today = moment();

    return moment(dateString).startOf("day").diff(today.startOf("day"), "month");
  }
