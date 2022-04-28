class UserError {
  public code: number;
  public message: string;
  public field: string;

  constructor(code: number, message: string, field: string) {
    this.code = code;
    this.message = message;
    this.field = field;
  }

  public static duplicationError(field: string): UserError {
    return new UserError(400, `${field} already exists`, field);
  }
}

export default UserError;
