import { NextFunction, Request, Response } from "express";
import UserError from "../errors/user.errors";
import { UserLoginSchema, UserSignUpSchema } from "../schemas/user.schema";
import { createUser, findByEmail } from "../services/user.services";
import AuthenticationFieldsType from "../types/AuthenticationFields.type";
import { sign } from "jsonwebtoken";
import User from "../models/User";

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

    const refreshToken = sign(
      { userId: user._id, refreshTokenCount: user.refreshTokenCount },
      "aebe937b0448eca2213dcdffd4130f22f58fb9d77ac1caa8a4def512e9e3bd9d",
      { expiresIn: "7d" }
    );

    const accessToken = sign(
      { userId: user._id },
      "60c011f29ac46ed8195c2ef4afc44ee8c34fdba9d576846e2a631e6ea4376817",
      {
        expiresIn: "15min",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR in userLogin", error);
    res.sendStatus(500);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!(req as any).userId) {
      return res.status(401).send("NO USER ID");
    }

    const user = await User.findById((req as any).userId);

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR in getUser", error);
    res.sendStatus(500);
  }
};
