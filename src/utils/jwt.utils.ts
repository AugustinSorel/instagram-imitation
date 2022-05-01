import { sign } from "jsonwebtoken";

export const createTokens = (user: any) => {
  const refreshToken = sign(
    { userId: user._id, refreshTokenCount: user.refreshTokenCount },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );

  const accessToken = sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "5s",
    }
  );

  return { refreshToken, accessToken };
};

export const getRefreshTokenExpiresDate = () => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
};

export const getAccessTokenExpiresDate = () => {
  return new Date(Date.now() + 1000 * 5);
};
