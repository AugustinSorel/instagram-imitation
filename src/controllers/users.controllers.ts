import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import UserError from "../errors/user.errors";
import { UserLoginSchema, UserSignUpSchema } from "../schemas/user.schema";
import { createUser, findByEmail } from "../services/user.services";
import AuthenticationFieldsType from "../types/AuthenticationFields.type";

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
      const type = Object.keys(error.keyPattern)[0] as AuthenticationFieldsType;
      return next(UserError.duplicationError(type));
    }

    console.log("ERROR in createUser", error);
    res.sendStatus(500);
  }
};

export const userLogin = async (
  req: Request<{}, {}, UserLoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findByEmail(req.body.email);

    if (!user) {
      return next(UserError.invalidEmailError());
    }

    const isPasswordValid = await user.validatePassword(req.body.password);

    if (!isPasswordValid) {
      return next(UserError.invalidPasswordError());
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR in userLogin", error);
    res.sendStatus(500);
  }
};
