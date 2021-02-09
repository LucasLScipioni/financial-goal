import { LanguageState } from "./language/LanguageModule";
import { UserState } from "./user/UserModule";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface RootState {
  UserModule: UserState;
  LanguageModule: LanguageState;
}

export default new Vuex.Store<RootState>({});
