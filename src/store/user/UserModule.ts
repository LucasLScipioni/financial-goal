import { IUser } from "@/models/user";
import store from "@/store";
import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";

@Module({
  dynamic: true,
  namespaced: true,
  name: "UserModule",
  store,
})
export class UserState extends VuexModule {
  public user: IUser = {} as IUser;

  @Mutation
  public setUser(user: IUser) {
    this.user = user;
  }

  public get getUser(): IUser | undefined {
    return this.user;
  }
}

export const UserModule = getModule(UserState);
