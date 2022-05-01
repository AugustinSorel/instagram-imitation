import { Request, Response } from "express";
import express, { Express } from "express";
import path from "path";

const deployToProduction = (app: Express) => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
  }
};

export default deployToProduction;
