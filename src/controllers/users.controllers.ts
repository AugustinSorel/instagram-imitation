import { NextFunction, Request, Response } from "express";
import UserError from "../errors/user.errors";
import { UserLoginSchema, UserSignUpSchema } from "../schemas/user.schema";
import {
  createUser,
  findByEmail,
  findById,
  incrementTheRefreshTokenCount,
} from "../services/user.services";
import AuthenticationFieldsType from "../types/AuthenticationFields.type";
import {
  createTokens,
  getAccessTokenExpiresDate,
  getRefreshTokenExpiresDate,
} from "../utils/jwt.utils";

export const userSignUp = async (
  req: Request<{}, {}, UserSignUpSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCreated = await createUser(req.body);

    const { accessToken, refreshToken } = createTokens(userCreated);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: getRefreshTokenExpiresDate(),
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: getAccessTokenExpiresDate(),
    });

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

    const { accessToken, refreshToken } = createTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: getRefreshTokenExpiresDate(),
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: getAccessTokenExpiresDate(),
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
    const user = await findById(res.locals.userId);

    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR in getUser", error);
    res.sendStatus(500);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await incrementTheRefreshTokenCount(res.locals.userId);

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in logout", error);
    res.sendStatus(500);
  }
};
