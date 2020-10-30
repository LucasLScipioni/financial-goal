import store from "@/store";
import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";

import * as ptBr from "@/assets/internationalization/pt-br.json";
import * as en from "@/assets/internationalization/en.json";

import ILanguage from "./model";

@Module({
  dynamic: true,
  namespaced: true,
  name: "LanguageModule",
  store
})
export class LanguageState extends VuexModule {
  //@ts-ignore
  public strings?: ILanguage = en.default;
  public currentLanguage = "en";

  @Mutation
  public setLanguage(value: string) {
    this.currentLanguage = value;
    switch (value) {
      case "pt-br":
        //@ts-ignore
        this.strings = ptBr.default;
        break;
      case "en":
        //@ts-ignore
        this.strings = en.default;
        break;
    }
  }

  public get getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  public get getStrings(): ILanguage | undefined {
    return this.strings;
  }
}

export const LanguageModule = getModule(LanguageState);
