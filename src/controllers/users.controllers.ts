import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
};
