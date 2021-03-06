import { NextFunction, Request, Response } from "express";
import AuthError from "../errors/auth.error";
import PostError from "../errors/post.error";
import UserError from "../errors/user.errors";
import ZodError from "../errors/zod.errors";

const apiError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ERROR in apiError", err);

  if (err instanceof ZodError) {
    return res
      .status(err.code)
      .json({ message: err.message, field: err.field });
  }

  if (err instanceof UserError) {
    console.log({ message: err.message, field: err.field });

    return res
      .status(err.code)
      .json({ message: err.message, field: err.field });
  }

  if (err instanceof AuthError) {
    return res.status(err.code).json({ message: err.message });
  }

  if (err instanceof PostError) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).send("Internal server error");
};

export default apiError;
