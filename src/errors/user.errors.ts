class UserError {
  public code: number;
  public message: string;
  public field: string;

  constructor(code: number, message: string, path: string) {
    this.code = code;
    this.message = message;
    this.field = path;
  }

  public static duplicationError(field: string): UserError {
    return new UserError(400, `${field} already exists`, field);
  }
}

export default UserError;
