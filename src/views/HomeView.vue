<template>
  <div class="home">
    Home! :)
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { LanguageModule } from "@/store/language/LanguageModule";

@Component({
  components: {},
})
export default class HomeView extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";

.home {
}
</style>
