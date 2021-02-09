import { Saving } from "./saving";
export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  savings: Saving[];
}

export interface ILoginRequest {
  email: string;
  password: string;
}
