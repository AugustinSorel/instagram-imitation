import { NextFunction, Request, Response } from "express";
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
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("ERROR in createUser", error);
    res.sendStatus(500);
  }
};
