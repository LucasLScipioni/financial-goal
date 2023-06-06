import { Schema, ValidationError } from "yup";

export interface YupValidationErrors {
  [key: string]: string[];
}

export default class YupValidation<T> {
  private schema: Schema<T>;
  private errors: YupValidationErrors;

  constructor(schema: Schema<T>) {
    this.schema = schema;
    this.errors = {};
  }

  public async validate(
    data: any,
    abortOnFirstError?: boolean
  ): Promise<boolean | YupValidationErrors> {
    this.errors = {};

    try {
      await this.schema.validate(data, { abortEarly: abortOnFirstError });

      return true;
    } catch (err: any) {
      this.errors = this.getErrors(err);

      throw this.errors;
    }
  }

  public getAllErrors() {
    return this.errors;
  }

  public getError(path: string): string | null {
    const errors = this.errors[path] || [];
    const error = errors[0];

    return error || null;
  }

  public isValid() {
    return Object.keys(this.errors).length === 0;
  }

  private getErrors(errors: ValidationError): YupValidationErrors {
    const { inner } = errors;

    return inner.reduce((acc: YupValidationErrors, err) => {
      const { path, errors: validationErrors } = err;

      acc[path] = validationErrors;

      return acc;
    }, {});
  }
}
