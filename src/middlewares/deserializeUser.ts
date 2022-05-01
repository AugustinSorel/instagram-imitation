import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import { createTokens } from "../utils/jwt.utils";

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
      "60c011f29ac46ed8195c2ef4afc44ee8c34fdba9d576846e2a631e6ea4376817"
    ) as any;

    res.locals.userId = data.userId;
    return next();
  } catch {}

  console.log(accessToken, refreshToken);

  if (!refreshToken) {
    console.log("refreshToken is missing");
    return next();
  }

  let data;

  try {
    data = verify(
      refreshToken,
      "aebe937b0448eca2213dcdffd4130f22f58fb9d77ac1caa8a4def512e9e3bd9d"
    ) as any;
  } catch {
    console.log("Refresh token is invalid");
    return next();
  }

  const user = await User.findOne({ _id: data.userId });

  // token has been invalidated
  if (!user || user.refreshTokenCount !== data.refreshTokenCount) {
    console.log("Count of refresh token is invalid");

    return next();
  }

  const tokens = createTokens(user);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
  });

  res.locals.userId = user._id;
  next();
};

export default deserializeUser;
