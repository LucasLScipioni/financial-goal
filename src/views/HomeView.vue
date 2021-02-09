<template>
  <div class="home">
    <p class="home__title">
      {{
        getVariableString(languageModule.getStrings["home-title"], [
          getUsername,
        ])
      }}
    </p>
    <div class="home__savings-wrapper">
      <SavingInfoCard
        v-for="(saving, key) in savings"
        :key="key"
        :saving="saving"
      ></SavingInfoCard>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getVariableString } from "@/assets/internationalization/lib";
import { Saving } from "@/models/saving";

import SavingInfoCard from "@/components/display/SavingInfoCard.vue";

import { LanguageModule } from "@/store/language/LanguageModule";
import { UserModule } from "@/store/user/UserModule";
import userAPI from "@/services/user";

@Component({
  components: {
    SavingInfoCard,
  },
})
export default class HomeView extends Vue {
  @Prop() private msg!: string;

  private savings: Saving[] = [];

  private languageModule = LanguageModule;
  private userModule = UserModule;
  private getVariableString = getVariableString;
  private userAPI = userAPI;

  private created() {
    if (localStorage.getItem("savings")) {
      this.savings = JSON.parse(localStorage.getItem("savings")!) as Saving[];
    }
  }

  private get getUsername() {
    return this.userModule.getUser!.name;
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1135px;
  margin: 0 auto;

  &__title {
    width: 100%;
    margin: 57px 0px 32px;
    text-align: left;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  &__savings-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 271px));
    gap: 24px 16px;
    width: 100%;

    @media @mobile {
      grid-template-columns: 1fr 1fr;
      max-width: initial;
    }
  }
}
</style>
