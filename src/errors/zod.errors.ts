class ZodError {
  public code: number;
  public message: string;
  public field: string;

  constructor(code: number, message: string, field: string) {
    this.code = code;
    this.message = message;
    this.field = field;
  }

  public static invalidInputError(message: string, field: string): ZodError {
    return new ZodError(400, message, field);
  }
}

export default ZodError;
