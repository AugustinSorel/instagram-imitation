import { NextFunction, Request, Response } from "express";
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
    return res.status(err.code).json({ message: err.message, path: err.field });
  }

  if (err instanceof UserError) {
    return res.status(err.code).json({ message: err.message, path: err.field });
  }

  return res.status(500).send("Internal server error");
};

export default apiError;
