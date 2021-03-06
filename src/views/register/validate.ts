import { object, string } from "yup";
import YupValidation from "@/lib/yup/YupValidation";

export enum NameErrors {
  Required = "Informe seu nome",
}

export enum EmailErrors {
  Required = "Informe o e-mail",
  Invalid = "Ops! E-mail inválido",
  NotFound = "E-mail não cadastrado",
}

export enum PasswordErrors {
  Required = "Informe a senha",
  Wrong = "A senha deve conter no mínimo 6 caracteres",
}

const emailStepSchema = object().shape({
  name: string().required(NameErrors.Required),
  email: string()
    .required(EmailErrors.Required)
    .email(EmailErrors.Invalid),
  password: string()
    .required(PasswordErrors.Required)
    .min(6, PasswordErrors.Wrong),
});

export function registerUserValidation() {
  return new YupValidation(emailStepSchema);
}

export default registerUserValidation();
