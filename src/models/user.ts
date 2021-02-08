export interface IUser {
  name: string;
  password: string;
  birthDate: string;
  email: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
