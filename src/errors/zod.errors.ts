class ZodError {
  public code: number;
  public message: string;
  public field: string;

  constructor(code: number, message: string, path: string) {
    this.code = code;
    this.message = message;
    this.field = path;
  }

  public static invalidInputError(message: string, path: string): ZodError {
    return new ZodError(400, message, path);
  }
}

export default ZodError;
