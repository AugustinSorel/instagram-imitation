import express from "express";
import {
  getUser,
  userLogin,
  userSignUp,
} from "../controllers/users.controllers";
import validateRessource from "../middlewares/validateRessource.middleware";
import { userLoginSchema, userSignUpSchema } from "../schemas/user.schema";

const usersRouter = express.Router();

usersRouter.post("/sign-up", validateRessource(userSignUpSchema), userSignUp);
usersRouter.post("/login", validateRessource(userLoginSchema), userLogin);

usersRouter.get("/", getUser);

export default usersRouter;
