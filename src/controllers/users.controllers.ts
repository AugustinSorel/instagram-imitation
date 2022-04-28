import { NextFunction, Request, Response } from "express";
import UserError from "../errors/user.errors";
import { UserSignUpSchema } from "../schemas/user.schema";
import { createUser } from "../services/user.services";

export const userSignUp = async (
  req: Request<{}, {}, UserSignUpSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCreated = await createUser(req.body);

    res.status(200).json(userCreated);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(UserError.duplicationError(Object.keys(error.keyPattern)[0]));
    }

    console.log("ERROR in createUser", error);
    res.sendStatus(500);
  }
};
