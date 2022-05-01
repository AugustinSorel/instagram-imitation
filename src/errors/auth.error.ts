class AuthError {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static notAuthenticatedError(): AuthError {
    return new AuthError(401, "Not authenticated");
  }
}

export default AuthError;
