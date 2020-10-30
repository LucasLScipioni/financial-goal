import { Vue } from "vue-property-decorator";
import { shallowMount } from "@vue/test-utils";

import { GoalInformation } from "@/components/display";
import moment from "moment";
import { currency, momentFilter } from '@/assets/filters';

Vue.filter('currency', currency);
Vue.filter('moment', momentFilter);

describe("<GoalInformation>", () => {
  describe("Functionality: ", () => {
    it("Display information", async () => {
      const momentFourMonthsFromNow = moment().add('4', 'months');

      const wrapper = shallowMount(GoalInformation, {
        propsData: {
          goalAmount: '2000.00',
          goalDate: momentFourMonthsFromNow
        }
      });

      expect(wrapper.find('.goal__information').element.innerHTML).toContain('4 monthly');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain('$2000.00');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain(momentFourMonthsFromNow.format('MMMM YYYY'));
      expect(wrapper.find('.goal__mothly-cost-value').element.innerHTML).toContain('$500.00');

      wrapper.setProps({
        goalAmount: '5000.00'
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.goal__information').element.innerHTML).toContain('4 monthly');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain('$5000.00');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain(momentFourMonthsFromNow.format('MMMM YYYY'));
      expect(wrapper.find('.goal__mothly-cost-value').element.innerHTML).toContain('$1250.00');

      const momentFiveMonthsFromNow = moment().add('5', 'months');
      wrapper.setProps({
        goalDate: momentFiveMonthsFromNow
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.goal__information').element.innerHTML).toContain('5 monthly');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain('$5000.00');
      expect(wrapper.find('.goal__information').element.innerHTML).toContain(momentFiveMonthsFromNow.format('MMMM YYYY'));
      expect(wrapper.find('.goal__mothly-cost-value').element.innerHTML).toContain('$1000.00');
    });
  });
});