import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import ZodError from "../errors/zod.errors";

const validateRessource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      const message = error.errors[0].message;
      const path = error.errors[0].path[1];

      return next(ZodError.invalidInputError(message, path));
    }
  };

export default validateRessource;
