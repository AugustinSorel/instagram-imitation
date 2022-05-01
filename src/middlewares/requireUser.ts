import { NextFunction, Request, Response } from "express";
import AuthError from "../errors/auth.error";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId;

  if (!userId) {
    return next(AuthError.notAuthenticatedError());
  }

  return next();
};

export default requireUser;
