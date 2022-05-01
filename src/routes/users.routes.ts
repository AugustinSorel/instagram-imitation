import express from "express";
import {
  getUser,
  invalidateTokens,
  userLogin,
  userSignUp,
} from "../controllers/users.controllers";
import requireUser from "../middlewares/requireUser";
import validateRessource from "../middlewares/validateRessource.middleware";
import { userLoginSchema, userSignUpSchema } from "../schemas/user.schema";

const usersRouter = express.Router();

usersRouter.post("/sign-up", validateRessource(userSignUpSchema), userSignUp);
usersRouter.post("/login", validateRessource(userLoginSchema), userLogin);

usersRouter.get("/", requireUser, getUser);
usersRouter.get("/invalidateTokens", requireUser, invalidateTokens);

export default usersRouter;
