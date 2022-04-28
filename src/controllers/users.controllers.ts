import { NextFunction, Request, Response } from "express";
import UserError from "../errors/user.errors";
import User from "../models/User";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, age } = req.body;

    const userCreated = await User.create({
      username,
      email,
      password,
      age,
    });

    res.status(200).json(userCreated);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(UserError.duplicationError(Object.keys(error.keyPattern)[0]));
    }
    console.log("ERROR in createUser", error);
    res.sendStatus(500);
  }
};
