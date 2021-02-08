export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
