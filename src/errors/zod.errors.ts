import AuthenticationFieldsType from "../types/AuthenticationFields.type";

class ZodError {
  public code: number;
  public message: string;
  public field: AuthenticationFieldsType;

  constructor(code: number, message: string, field: AuthenticationFieldsType) {
    this.code = code;
    this.message = message;
    this.field = field;
  }

  public static invalidInputError(
    message: string,
    field: AuthenticationFieldsType
  ): ZodError {
    return new ZodError(400, message, field);
  }
}

export default ZodError;
