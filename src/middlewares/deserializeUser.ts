import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { findOne } from "../services/user.service";
import {
  createTokens,
  getAccessTokenExpiresDate,
  getRefreshTokenExpiresDate,
} from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const data = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any;

    res.locals.userId = data.userId;
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let refreshTokenPayload;

  try {
    refreshTokenPayload = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as any;
  } catch {
    return next();
  }

  const user = await findOne({ _id: refreshTokenPayload.userId });

  if (
    !user ||
    user.refreshTokenCount !== refreshTokenPayload.refreshTokenCount
  ) {
    return next();
  }

  const tokens = createTokens(user);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    expires: getRefreshTokenExpiresDate(),
  });

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    expires: getAccessTokenExpiresDate(),
  });

  res.locals.userId = user._id;
  next();
};

export default deserializeUser;
