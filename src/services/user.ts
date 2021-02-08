import { Api } from "@/services";
import { IUser, ILoginRequest } from "@/models/user";

export class UserAPI extends Api {
  public async userLogin(userData: ILoginRequest) {
    const response = await this.get<IUser[]>(`/users?email=${userData.email}`);

    if (response.length !== 0) {
      if (response[0].password === userData.password) {
        return response[0];
      } else {
        throw { error: "wrong_password" };
      }
    } else {
      throw { error: "no_user" };
    }
  }
}

const userSingleton = new UserAPI();
export default userSingleton;
