import AuthenticationFieldsType from "../types/AuthenticationFields.type";

class UserError {
  public code: number;
  public message: string;
  public field: AuthenticationFieldsType;

  constructor(code: number, message: string, field: AuthenticationFieldsType) {
    this.code = code;
    this.message = message;
    this.field = field;
  }

  public static duplicationError(field: AuthenticationFieldsType): UserError {
    return new UserError(400, `${field} already exists`, field);
  }

  public static invalidPasswordError(): UserError {
    return new UserError(400, "Invalid password", "password");
  }

  public static invalidEmailError(): UserError {
    return new UserError(400, "Invalid email", "email");
  }
}

export default UserError;
