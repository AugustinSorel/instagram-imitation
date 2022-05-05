class PostError {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static postIsMissingError(): PostError {
    return new PostError(400, "Post is missing");
  }
}

export default PostError;
